import json
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout

from .models import Users
from inviteCode.models import InviteCode
from udeskApi.utils import postApi, getApi, putApi
from backend.config import BACKDOOR_INVITE_CODE


def addUserToUdesk(customer):
    r = postApi("open_api_v1/customers", customer)
    assert r.get("code") == 1000


def api(req):
    if req.method == 'GET':
        return HttpResponse("no GET method")
    elif req.method == 'POST': # 新建用户
        data = json.loads(req.body)
        if data.get("inviteCode").startswith(BACKDOOR_INVITE_CODE): # 后门邀请码
            # 查重
            user_check = User.objects.filter(username=data.get("phone"))
            if len(user_check):
                return JsonResponse({
                    "status": 1,
                    "message": "手机号{}已注册, 如有问题请致电400咨询.".format(data.get("phone"))
                })
            user_check = User.objects.filter(username=data.get("email"))
            if len(user_check):
                return JsonResponse({
                    "status": 2,
                    "message": "邮箱{}已注册, 如有问题请致电400咨询.".format(data.get("email"))
                })
            user = User.objects.create_user(
                username = data.get("phone"),
                last_name = data.get("name"),
                email = data.get("email"),
                password=data.get("passwd"),
            )
            user.save()
            users = Users(
                user = user,
                inviteCode = 'backdoor',
                company = data.get("inviteCode")[8:],
                title = data.get("title"),
            )
            users.save()
            addUserToUdesk({
                "customer": {
                    "email": data.get("email"),
                    "nick_name": data.get("name"),
                    "cellphones": [
                        [None, data.get("phone")]
                    ],
                    "description": data.get("inviteCode")[8:]+"/"+data.get("title")
                }
            })
            return JsonResponse({
                "status":0,
                "message":"注册成功"
            })
        else:
            # check invite code
            try:
                inviteCode = InviteCode.objects.get(code=data.get("inviteCode"))
            except InviteCode.DoesNotExist:
                return JsonResponse({
                    "status": 1,
                    "message": '激活码{}不存在'.format(data.get("inviteCode"))
                })
            if not inviteCode.active:
                return JsonResponse({
                    "status": 2,
                    "message": '激活码{}无效'.format(data.get("inviteCode"))
                })
            else:
                # todo 使用事务
                # 查重
                user_check = User.objects.filter(username=data.get("phone"))
                if len(user_check):
                    return JsonResponse({
                        "status": 1,
                        "message": "手机号{}已注册, 如有问题请致电400咨询.".format(data.get("phone"))
                    })
                user_check = User.objects.filter(username=data.get("email"))
                if len(user_check):
                    return JsonResponse({
                        "status": 2,
                        "message": "邮箱{}已注册, 如有问题请致电400咨询.".format(data.get("email"))
                    })
                user = User.objects.create_user(
                    username=data.get("phone"),
                    last_name=data.get("name"),
                    email=data.get("email"),
                    password=data.get("passwd")
                )
                user.save()
                users = Users(
                    user=user,
                    inviteCode=inviteCode.code,
                    company=inviteCode.company,
                    title = data.get("title"),
                )
                users.save()
                inviteCode.active = False
                inviteCode.users = users
                inviteCode.save()
                addUserToUdesk({
                    "customer": {
                        "email": data.get("email"),
                        "nick_name": data.get("name"),
                        "cellphones": [
                            [None, data.get("phone")]
                        ],
                        "description": inviteCode.company+"/"+data.get("title")
                    }
                })
                return JsonResponse({
                    "status": 0,
                    "message": "注册成功"
                })


def do_login(req):
    if req.method == "POST":
        data = json.loads(req.body)
        user = authenticate(username=data['phone'], password=data['passwd'])
        if user is not None:
            login(req, user)
            return JsonResponse({
                "status": 0
            })
        else:
            return JsonResponse({
                "status": 1,
                "message": "手机号和/或密码不正确"
            })


def do_logout(req):
    logout(req)
    return JsonResponse({
        "status": 0
    })


def updateUserInfo(req):
    if req.method == "POST":
        data = json.loads(req.body)
        user = req.user

        # 查重
        user_check = User.objects.filter(username = data.get("phone"))
        if len(user_check) and user_check[0].id != user.id:
            return JsonResponse({
                "status": 1,
                "message": "手机号{}已注册, 如有问题请致电咨询.".format(user_check.phone)
            })
        user_check = User.objects.filter(username=data.get("email"))
        if len(user_check) and user_check[0].id != user.id:
            return JsonResponse({
                "status": 2,
                "message": "邮箱{}已注册, 如有问题请致电咨询.".format(user_check.email)
            })
        else:
            users = Users.objects.get(user=req.user)
            # 同步udesk
            info = {"customer": {}}
            if user.username != data.get("phone"):
                info["customer"]["cellphones"] = [None, data.get("phone")]
            if user.last_name != data.get("name"):
                info["customer"]["nick_name"] = data.get("name")
            if user.email != data.get("email"):
                info["customer"]["email"] = data.get("email")
            if users.title != data.get("title"):
                info["customer"]["description"] = users.company + "/" + data.get("title")
                users.title = data.get("title")
                users.save()
            if info["customer"]:
                r = putApi("open_api_v1/customers/update_customer", params={
                    "type": "cellphone",
                    "content": user.username
                }, data=info)
                assert r.get("code") == 1000

            user.username = data.get("phone") # 这三行加到上面去会导致user.username过早更新, putApi就没法弄了.
            user.last_name = data.get("name")
            user.email = data.get("email")
            if data.get("passwd"):
                user.set_password(data.get("passwd"))
            user.save()
            return JsonResponse({
                "status": 0,
                "message": ""
            })
