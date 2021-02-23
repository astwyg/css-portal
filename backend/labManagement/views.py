from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse

from .form import ResourceForm
from .models import Resource
from users.models import Users


def index(req):
    return render(req, "labManagement/index.html")


def add_page(req):
    if req.method == "GET":
        if not req.user.is_authenticated:
            messages.add_message(req, messages.WARNING, "请先登录")
            return redirect("/")
        form = ResourceForm()
        return render(req, "labManagement/add.html", locals())
    elif req.method == "POST":
        form = ResourceForm(req.POST)
        if form.is_valid():
            resource = form.save(commit=False)
            current_user = Users.objects.get(user=req.user)
            resource.user = current_user
            resource.status = "等待审批"
            resource.save()
            messages.add_message(req, messages.SUCCESS, "已提交, 我们正在加紧审批.")
            return redirect("/labManagement/")
        else:
            messages.add_message(req, messages.WARNING, "请修改表单中的错误")
            return render(req, "labManagement/add.html", locals())


def listApi(req):
    if req.method == "POST" and req.user.is_authenticated:
        resources = Resource.objects.filter(user = req.user.users)
        data = []
        for ins in resources:
            data.append({
                "project_name":ins.project_name,
                "end_time": ins.end_time,
                "status": ins.status,
            })
        return JsonResponse({"data":data})
