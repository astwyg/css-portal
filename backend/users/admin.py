from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.contrib.auth.models import Group

from .models import Users

# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class UsersInline(admin.StackedInline):
    model = Users
    can_delete = False
    verbose_name_plural = '用户'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (UsersInline,)

    actions = ['make_MSS']

    def make_MSS(self, request, queryset):
        group_MSS = Group.objects.get(name='MSS')
        for user in queryset:
            user.groups.add(group_MSS)
            user.is_staff = True
            user.save()
        self.message_user(request, "{}个用户已被置为MSS权限".format(len(queryset)))
    make_MSS.short_description = "设置为MSS职位(市场,销售,支持), 可以批量发邀请码"

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)