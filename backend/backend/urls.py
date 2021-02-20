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

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', page_views.index),
    path("oauth2/", include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('admin/', admin.site.urls),

    path("user/register/", users_views.register_page),
    path('users/', users_views.api),
    path('login/', users_views.do_login),
    path('logout/', users_views.do_logout),
    path('updateUserInfo/', users_views.updateUserInfo),

    path('inviteCode/check/', inviteCode_views.check),
    path('inviteCode/batchCreate/', inviteCode_views.batchCreate),

    path('saasApi/getTickets/', udeskApi_views.getTickets),
    path('saasApi/getKnowledges/', udeskApi_views.getKnowledges),

    path('admin/inviteCode/bulk_add/', inviteCode_views.batchCreate),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

