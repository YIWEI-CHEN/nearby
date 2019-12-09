from django.contrib import admin

# Register your models here.
from profiles.models import CareService, Payment, Address, GeneralProfile, MedicalProfile


class GeneralProfileAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'phone_number',
        'gender',
        'date_of_birth',
        'language',
        'is_taker',
        'is_provider',
    )


class MedicalProfileAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'medicare',
        'medicaid',
        'disabled',
        'chronic',
        'at_home_member',
    )

class AddressAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
    )


class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'card_number',
        'card_expiry',
        'card_code',
    )


class CareServiceAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        "blood_pressure",
        "blood_sugar",
        "temperature",
        'shower',
        "hair_washing",
        "teeth_brushing",
        "bed_bathing",
        "food_feeding",
        "medicine_feeding",
        "upper_limb_moving",
        'lower_limb_moving',
        'turn_over',
    )
    fieldsets = (
        (None, {'fields': ('user',)}),
        ('Measurement', {
            'fields': ('blood_pressure', 'blood_sugar', 'temperature')}),
        ('Cleanliness', {
            'fields': ('shower', 'hair_washing', 'teeth_brushing', 'bed_bathing')}),
        ('Feed', {
            'fields': ('food_feeding', 'medicine_feeding')}),
        ('Exercise', {
            'fields': ('upper_limb_moving', 'lower_limb_moving', 'turn_over')}),
    )

admin.site.register(GeneralProfile, GeneralProfileAdmin)
admin.site.register(MedicalProfile, MedicalProfileAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(CareService, CareServiceAdmin)
