from django.db import models
from django.forms import ModelForm

from .models import Resource


class ResourceForm(ModelForm):
    class Meta:
        model = Resource
        fields = [
            "project_name",
            "project_description",
            "product",
            "domain",
            "business",
            "region",
            "location",
            "machine_type",
            "cpu_type",
            "machine_number",
            "machine_config",
            "machine_env",
            "start_time",
            "end_time",
            "remark"
        ]
