from django.contrib import admin
from .models import Resource


@admin.register(Resource)
class ResourceCodeAdmin(admin.ModelAdmin):
    list_display = ('project_name', 'user', 'admin', 'status', "end_time")
    search_fields = ['project_name']
