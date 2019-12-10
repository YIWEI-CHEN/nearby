from django.contrib import admin

# Register your models here.
from profiles.models import Payment, Address, GeneralProfile, MedicalProfile, ProvidedCareService, Language

# class CareServiceAdmin(admin.ModelAdmin):
#     list_display = (
#         'user',
#         "blood_pressure",
#         "blood_sugar",
#         "temperature",
#         'shower',
#         "hair_washing",
#         "teeth_brushing",
#         "bed_bathing",
#         "food_feeding",
#         "medicine_feeding",
#         "upper_limb_moving",
#         'lower_limb_moving',
#         'turn_over',
#     )
#     fieldsets = (
#         (None, {'fields': ('user',)}),
#         ('Measurement', {
#             'fields': ('blood_pressure', 'blood_sugar', 'temperature')}),
#         ('Cleanliness', {
#             'fields': ('shower', 'hair_washing', 'teeth_brushing', 'bed_bathing')}),
#         ('Feed', {
#             'fields': ('food_feeding', 'medicine_feeding')}),
#         ('Exercise', {
#             'fields': ('upper_limb_moving', 'lower_limb_moving', 'turn_over')}),
#     )


admin.site.register(GeneralProfile)
admin.site.register(MedicalProfile)
admin.site.register(Address)
admin.site.register(Payment)
admin.site.register(ProvidedCareService)
admin.site.register(Language)