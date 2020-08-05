from django.contrib import admin
from .models import InviteCode
from django.template.response import TemplateResponse
from django.urls import path
from django import forms
from django.http import HttpResponseRedirect


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


admin.site.register(InviteCode, InviteCodeAdmin)