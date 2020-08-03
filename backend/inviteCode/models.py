from django.db import models
from users.models import Users


class InviteCode(models.Model):

    code = models.CharField('激活码', max_length=10, blank=True)
    company = models.CharField('公司', max_length=128, blank=True)
    active = models.BooleanField("可用", default=True)
    users = models.ForeignKey(Users, on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        verbose_name = '激活码'

    def __str__(self):
        return str(self.code)
