from django.db import models
from users.models import Users
from django.contrib.auth.models import User


class InviteCode(models.Model):

    code = models.CharField('邀请码', max_length=10, blank=True)
    company = models.CharField('公司', max_length=128, blank=True)
    active = models.BooleanField("可用", default=True)
    users = models.ForeignKey(Users, on_delete=models.SET_NULL, blank=True, null=True)
    creater = models.ForeignKey(User, related_name="%(class)s_creater", on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        verbose_name = '邀请码'

    def __str__(self):
        return str(self.code)


class InviteCodeBatch(models.Model):
    class Meta:
        permissions = (
            ("batch_create", "批量创建"),
        )
        verbose_name_plural = '邀请码批量生成器(点我, 不允许在上面单独添加邀请码)'

