from profiles import views
from django.urls import path, include
from profiles.views import update_profiles

urlpatterns = [
    ##ahxt
    path('update_profiles/', update_profiles)

]