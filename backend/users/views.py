import json
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.http import JsonResponse

from .models import Users
from inviteCode.models import InviteCode


def api(req):
    if req.method == 'GET':
        return HttpResponse("no GET method")
    elif req.method == 'POST':
        data = json.loads(req.body)
        if data.get("inviteCode").startswith("3330000"): # 后门邀请码
            user = User(
                username = data.get("phone"),
                last_name = data.get("name"),
                email = data.get("email"),
                password = data.get("passwd")
            )
            user.save()
            users = Users(
                user = user,
                inviteCode = 'backdoor',
                company = data.get("inviteCode")[7:]
            )
            users.save()
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
                user = User(
                    username=data.get("phone"),
                    last_name=data.get("name"),
                    email=data.get("email"),
                    password=data.get("passwd")
                )
                user.save()
                users = Users(
                    user=user,
                    inviteCode='backdoor',
                    company=inviteCode.company
                )
                users.save()
                inviteCode.active = False
                inviteCode.users = users
                inviteCode.save()
                return JsonResponse({
                    "status": 0,
                    "message": "注册成功"
                })

