from django.db import models
from django.contrib.auth.models import User


class Users(models.Model):
    # username 为手机号
    # last_name 为姓名
    # email
    # password
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    inviteCode = models.CharField('邀请码', max_length=10, blank=True)
    company = models.CharField('公司', max_length=128, blank=True)
    title = models.CharField('职位', max_length=128, blank=True)

    class Meta:
        verbose_name = '平台用户'

    def __str__(self):
        return str(self.user.username)

