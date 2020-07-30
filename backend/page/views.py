from django.shortcuts import render

def index(req):
    return render(req, 'page/index.html')
