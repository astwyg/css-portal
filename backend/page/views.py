from django.shortcuts import render
from udeskApi.utils import webImSignature
from django.contrib import messages


def index(req):
    if req.user.is_authenticated:
        webim_sign = "&" + webImSignature(req.user.username)
    else:
        webim_sign = ""
    messages.add_message(req, messages.INFO, "内测期间, 一切问题或者建议请反馈给王永刚 17710432234. 感谢!")
    return render(req, 'page/index.html', locals())
