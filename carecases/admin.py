from django.contrib import admin

from carecases.models import CareCase, CareService, CareInfo

admin.site.register(CareInfo)
admin.site.register(CareCase)
admin.site.register(CareService)
