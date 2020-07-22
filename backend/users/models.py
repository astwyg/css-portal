from django.db import models


class Users(models.Model):

    inviteCode = models.CharField('邀请码', max_length=10, blank=True)
    company = models.CharField('公司', max_length=128, blank=True)
    name = models.CharField('姓名', max_length=50)
    phone = models.CharField('手机号', max_length=20)
    email = models.CharField('邮箱', max_length=100, blank=True)
    passwd = models.CharField('服务密码', max_length=100)

    class Meta:
        verbose_name = '平台用户'

    def __str__(self):
        return str(self.name)

