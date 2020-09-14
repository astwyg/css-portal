from django.contrib import admin
from .models import InviteCode, InviteCodeBatch
from django.template.response import TemplateResponse
from django.urls import path
from inviteCode.views import batchCreate


@admin.register(InviteCode)
class InviteCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'company', 'active', 'users',)
    search_fields = ['company']

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('bulk_add/', self.bulk_add),
        ]
        return my_urls + urls

    def bulk_add(self, request):
        context={}
        return TemplateResponse(request, "inviteCode/bulk_add.html", context)


@admin.register(InviteCodeBatch)
class InviteCodeBatchAdmin(admin.ModelAdmin):
    def changelist_view(self, request, extra_content=None):
        return batchCreate(request)
