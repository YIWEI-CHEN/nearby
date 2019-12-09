from django.contrib import admin

from carecases.models import CareCase, CareService


admin.site.register(CareCase)
admin.site.register(CareService)
