import json
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

from .models import Users
from inviteCode.models import InviteCode
from udeskApi.utils import postApi, getApi, putApi
from backend.configEnv import BACKDOOR_INVITE_CODE
from udeskApi.utils import webImSignature


def addUserToUdesk(customer):
    r = postApi("open_api_v1/customers", customer)
    assert r.get("code") == 1000


def api(req):
    if req.method == 'GET':
        return HttpResponse("no GET method")
    elif req.method == 'POST': # 新建用户
        data = req.POST
        if data.get("inviteCode").startswith(BACKDOOR_INVITE_CODE): # 后门邀请码
            # 查重
            user_check = User.objects.filter(username=data.get("phone"))
            if len(user_check):
                messages.add_message(req, messages.ERROR, "手机号{}已注册, 如有问题请致电400咨询.".format(data.get("phone")))
                return redirect(req.META.get('HTTP_REFERER', '/'))
            user_check = User.objects.filter(username=data.get("email"))
            if len(user_check):
                messages.add_message(req, messages.ERROR, "邮箱{}已注册, 如有问题请致电400咨询.".format(data.get("email")))
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
            login(req, user)
            messages.add_message(req, messages.SUCCESS, "欢迎"+user.last_name)
            return redirect("/")
        else:
            # check invite code
            try:
                inviteCode = InviteCode.objects.get(code=data.get("inviteCode"))
            except InviteCode.DoesNotExist:
                messages.add_message(req, messages.ERROR, "激活码不存在")
                return redirect(req.META.get('HTTP_REFERER','/'))
            if not inviteCode.active:
                messages.add_message(req, messages.ERROR, "激活码无效")
                return redirect(req.META.get('HTTP_REFERER','/'))
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
                login(req, user)
                messages.add_message(req, messages.SUCCESS, "欢迎" + user.last_name)
                return redirect("/")


def do_login(req):
    if req.method == "POST":
        data = req.POST
        user = authenticate(username=data['phone'], password=data['passwd'])
        if user is not None:
            login(req, user)
            messages.add_message(req, messages.SUCCESS, "欢迎"+user.last_name)
            return redirect(req.META.get("HTTP_REFERER","/"))
        else:
            messages.add_message(req, messages.ERROR, "手机号和/或密码不正确")
            return redirect(req.META.get("HTTP_REFERER", "/"))

def do_logout(req):
    logout(req)
    messages.add_message(req, messages.SUCCESS, "已退出, 感谢您对飞腾的大力支持!")
    return redirect("/")


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


def register_page(req):
    if req.user.is_authenticated:
        return redirect("/")
    return render(req, 'users/register.html', locals())


def login_page(req):
    if req.user.is_authenticated:
        return redirect("/")
    return render(req, 'users/login.html', locals())


def user_info_page(req):
    if not req.user.is_authenticated:
        messages.add_message(req, messages.WARNING, "请先登录")
        return redirect("/")
    return render(req, 'users/info.html', locals())
