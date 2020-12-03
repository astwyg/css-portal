from django.shortcuts import render
from udeskApi.utils import webImSignature


def index(req):
    if req.user.is_authenticated:
        webim_sign = "&" + webImSignature(req.user.username)
    else:
        webim_sign = ""
    return render(req, 'page/index.html', locals())


def pm(req):
    return render(req, 'pm/index.html')