"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
# from django.contrib import admin
# from django.urls import path
#
# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views as todo_views
from carecases import views as care_case_views
from profiles import views as profile_views

from .views import index
from nearby.views import index, login, db, FacebookLogin, GoogleLogin
from profiles.views import update_profiles, read_profiles

router = routers.DefaultRouter()
router.register(r'todos', todo_views.TodoView, 'todo')
router.register('cares', care_case_views.CareCaseView, 'care')
router.register('users', profile_views.UserDetailView, 'user')
# router.register('providers', profile_views.ProviderListView, 'provider')

urlpatterns = [
    # path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('rest-auth/', include('rest_auth.urls')),
    path('accounts/', include('allauth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),

    ## ahxt
    path('redirect_to_account/', index),
    path("", index, name="index"),
    path("index", index, name="index"),
    path("login/", login, name="login"),
    path("db/", db, name="db"),
    path(r'accounts/',include('allauth.urls')),
    path(r'rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path(r'rest-auth/google/', GoogleLogin.as_view(), name='gl_login'),

    path('update_profiles/', update_profiles),
    path('read_profiles/', read_profiles),

    path('api/users/<pk>/reserve/', profile_views.IsReservedView.as_view(), name='is_reserved'),
    path('api/providers/', profile_views.ProviderListView.as_view(), name='provider_list')

]
