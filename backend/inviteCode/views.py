import json, random, string
from django.http import JsonResponse

from .models import InviteCode
from backend.config import BATCH_INVITE_SECRET

# Create your views here.
def check(req):
    if req.method == 'POST':
        data = json.loads(req.body)
        code = data.get("code")

        if len(code) != 7:
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


def batchCreate(req):
    if req.method == 'POST':
        data = json.loads(req.body)
        if data.get("secret") != BATCH_INVITE_SECRET:
            return JsonResponse({
                            "status": 1,
                            "message": "邀请码生成口令错误"
                        })
        number = data.get("number")
        if number < 5 or number > 200:
            return JsonResponse({
                "status": 2,
                "message": "数量应在5-200"
            })
        try:
            codes = []
            inviteCodes = []
            start = InviteCode.objects.all().count()
            for _ in range(number):
                code = ''.join(random.choice(string.ascii_uppercase) for _ in range(3)) + str(start).zfill(4)
                start += 1
                codes.append(code)
                inviteCodes.append(InviteCode(
                    company = data.get("company"),
                    code = code
                ))
            InviteCode.objects.bulk_create(inviteCodes)
            return JsonResponse({
                "status": 0,
                "codes": codes
            })
        except Exception as e:
            return JsonResponse({
                "status": 3,
                "message": "{}".format(e)
            })

