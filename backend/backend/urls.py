"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
import users.views as users_views
import page.views as page_views
import inviteCode.views as inviteCode_views
import udeskApi.views as udeskApi_views
import labManagement.views as labManagment_views

from django.conf import settings
from django.conf.urls.static import static

# for static_patch
from django.views.static import serve
from django.core.exceptions import ImproperlyConfigured
from django.urls import re_path
import re


def static_patch(prefix, view=serve, **kwargs):
    """
    生产环境中, 由于IT只给一个nginx通过端口做反向代理, 我们需要自己处理静态资源, 我不愿意在nginx和uwsgi中再插一层nginx, 因为:
    zen of python: (3.)Simple is better than complex.
    """
    if not prefix:
        raise ImproperlyConfigured("Empty static prefix not permitted")
    # elif not settings.DEBUG or urlsplit(prefix).netloc: # THE PATCH!
    #     # No-op if not in debug mode or a non-local prefix.
    #     return []
    return [
        re_path(r'^%s(?P<path>.*)$' % re.escape(prefix.lstrip('/')), view, kwargs=kwargs),
    ]


urlpatterns = [
    path('', page_views.index),
    path("oauth2/", include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('admin/', admin.site.urls),

    path("user/register/", users_views.register_page),
    path("user/login/", users_views.login_page),
    path("user/info/", users_views.user_info_page),
    path('users/', users_views.api),
    path('login/', users_views.do_login),
    path('logout/', users_views.do_logout),
    path('updateUserInfo/', users_views.updateUserInfo),

    path('inviteCode/check/', inviteCode_views.check),
    path('inviteCode/batchCreate/', inviteCode_views.batchCreate),

    path('saasApi/getTickets/', udeskApi_views.getTickets),
    path('saasApi/getKnowledges/', udeskApi_views.getKnowledges),
    path('saasApi/getDetail/', udeskApi_views.getDetail),

    path('admin/inviteCode/bulk_add/', inviteCode_views.batchCreate),

    path("labManagement/", labManagment_views.index),
    path("labManagement/detail/", labManagment_views.resourceDetail),
    path("labManagement/add/", labManagment_views.add_page),
    path("labManagement/listApi/", labManagment_views.listApi),
    path("labManagement/exportAll/", labManagment_views.exportResources),
]+ static_patch(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static_patch(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

