from django.http import JsonResponse
from udeskApi.utils import getApi, postApi, postApiV1
from django.shortcuts import render


def getTickets(req):
    if req.method == "POST":
        if not req.user.is_authenticated:
            return JsonResponse({
                "status": 1,
                "message": "you shall not pass!"
            })
        r = postApiV1("api/v1/tickets/get.json", {
            "email": req.user.email,
        })
        return JsonResponse(r)


def getKnowledges(req):
    if req.method == "POST":
        if not req.user.is_authenticated:
            return JsonResponse({
                "status": 1,
                "message": "you shall not pass!"
            })
        r = getApi("open_api_v1/knowledge_questions", {
            "catalog_id": 36901, # FIXME 这个id是由utils.py在通过API创建分类时得到的, 目前不知道还有什么其他方法可以查到, 目前做法非常不优雅, 但是可以对付.
            "agent_id": 0
        })
        return JsonResponse(r)


def getDetail(req):
    if req.GET.get("type") == "ticket":
        r = postApiV1("api/v1/tickets/get.json", {
            "id": int(req.GET.get("id")),
            "email":req.user.email,
        })
        data = r["contents"][0]
        return render(req, 'udeskApi/ticketDetail.html', locals())
    elif req.GET.get("type") == "knowledge":
        r = getApi("open_api_v1/knowledge_questions", {
            "catalog_id": 36901,  # FIXME 这个id是由utils.py在通过API创建分类时得到的, 目前不知道还有什么其他方法可以查到, 目前做法非常不优雅, 但是可以对付.
            "agent_id": 0,
            "id": int(req.GET.get("id")),
        })
        data = r["knowledge_questions"][0]
        return render(req, 'udeskApi/knowledgeDetail.html', locals())
