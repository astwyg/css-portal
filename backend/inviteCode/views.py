import json
from django.http import JsonResponse

from .models import InviteCode

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