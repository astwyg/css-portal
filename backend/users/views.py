from django.shortcuts import render
from django.http import HttpResponse


def api(req):
    if req.method == 'GET':
        return HttpResponse("no GET method")
    elif req.method == 'POST':
        print(req)
        return HttpResponse("POST method")
