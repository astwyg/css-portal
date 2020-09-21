import json, random, string
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django import forms
from .models import InviteCode
from backend.config import BATCH_INVITE_SECRET
from django.contrib import messages

from users.models import Users

# Create your views here.
def check(req):
    if req.method == 'POST':
        data = json.loads(req.body)
        code = data.get("code")

        if len(code) != 8:
            return JsonResponse({
                "status": 1,
                "message": "邀请码位数不对"
            })
        else:
            try:
                inviteCode = InviteCode.objects.get(code=code)
            except InviteCode.DoesNotExist:
                return JsonResponse({
                    "status": 2,
                    "message": '激活码{}不存在'.format(code)
                })
            if not inviteCode.active:
                return JsonResponse({
                    "status": 3,
                    "message": '激活码{}无效'.format(code)
                })
            else:
                return JsonResponse({
                    "status": 0,
                    "message": inviteCode.company
                })


class BatchCreateForm(forms.Form):
    company = forms.CharField(label='公司', max_length=100)
    number = forms.IntegerField(label='数量(5-200)', max_value=201, min_value=4)
    secret = forms.CharField(label='口令', max_length=50)


def batchCreate(req):
    if req.method == 'GET':
        if req.user.has_perm("inviteCode.batch_create"):
            form = BatchCreateForm
            return render(req, "inviteCode/bulk_add.html", locals())
        else:
            messages.error(req, "未登录或者权限不足.")
            return HttpResponseRedirect("/admin/login/?next=/admin/inviteCode/bulk_add/")

    if req.method == 'POST':
        form = BatchCreateForm(req.POST)
        if form.is_valid():
            if form.cleaned_data["secret"] != BATCH_INVITE_SECRET:
                return JsonResponse({
                                "status": 1,
                                "message": "邀请码生成口令错误"
                            }, json_dumps_params={'ensure_ascii':False})
            number = form.cleaned_data["number"]
            if number < 5 or number > 200:
                return JsonResponse({
                    "status": 2,
                    "message": "数量应在5-200"
                }, json_dumps_params={'ensure_ascii':False})
            try:
                codes = []
                inviteCodes = []
                start = InviteCode.objects.all().count()
                for _ in range(number):
                    code = ''.join(random.choice(string.ascii_uppercase) for _ in range(2)) + str(start).zfill(6)
                    start += 1
                    codes.append(code)
                    inviteCodes.append(InviteCode(
                        company = form.cleaned_data["company"],
                        code = code,
                        creater = req.user,
                    ))
                InviteCode.objects.bulk_create(inviteCodes)
                resp = '激活码-{} \n'.format(form.cleaned_data["company"])
                i = 1
                for code in codes:
                    if i % 4:
                        i += 1
                        resp += (code + "\t\t")
                    else:
                        i = 1
                        resp += (code + "\n")
                resp = '<pre>{}</pre>'.format(resp)
                return HttpResponse(resp)
            except Exception as e:
                return JsonResponse({
                    "status": 3,
                    "message": "{}".format(e)
                }, json_dumps_params={'ensure_ascii':False})

