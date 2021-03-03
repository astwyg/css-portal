import csv, codecs
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse, HttpResponse

from .form import ResourceForm
from .models import Resource
from users.models import Users


def index(req):
    return render(req, "labManagement/index.html")


def resourceDetail(req):
    ins = Resource.objects.get(id = req.GET.get("id"))
    messages.add_message(req, messages.WARNING, "如需修改资源/认证详情, 请联系对应管理员.")
    return render(req, "labManagement/detail.html", locals())


def add_page(req):
    if req.method == "GET":
        if not req.user.is_authenticated:
            messages.add_message(req, messages.WARNING, "请先登录")
            return redirect(req.META.get('HTTP_REFERER','/'))
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
            return redirect(req.META.get('HTTP_REFERER','/'))
        else:
            messages.add_message(req, messages.WARNING, "请修改表单中的错误")
            return render(req, "labManagement/add.html", locals())


def listApi(req):
    if req.method == "POST" and req.user.is_authenticated:
        resources = Resource.objects.filter(user = req.user.users)
        data = []
        for ins in resources:
            data.append({
                "id":ins.id,
                "project_name":ins.project_name,
                "end_time": ins.end_time,
                "status": ins.status,
            })
        return JsonResponse({"data":data})


def exportResources(req):
    if not req.user.is_superuser:
        messages.add_message(req, messages.ERROR, "你需要登录, 而且是管理员")
        return redirect(req.META.get('HTTP_REFERER', '/'))
    else:
        response = HttpResponse(content_type='text/csv')
        response.write(codecs.BOM_UTF8)
        response['Content-Disposition'] = 'attachment; filename="cert_report.csv"'

        writer = csv.writer(response)
        writer.writerow(['序号', '公司全称', '产品名称', '适配的CPU', '适配的操作系统', '主要行业领域', '产品分类', '适配认证状态', '证书文件', '负责人'])
        allResources = Resource.objects.all()
        for ins in allResources:
            try:
                file_path = ins.cert_file.path
            except ValueError:
                file_path = "未上传"
            writer.writerow([ins.id, ins.user.company, ins.product, ins.cpu_type, ins.machine_env, ins.domain, ins.business, ins.cert_status, file_path, ins.admin])
        return response


