from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser, Address, Payment, CareService


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = (
        'email', 'is_active',
        'gender',
        'is_taker', 'is_provider', 'is_guardian',
    )
    list_filter = ('email', 'is_active', 'gender', )
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'gender', 'date_of_birth','language',)}),
        ('Roles', {'fields': ('is_taker', 'is_provider', 'is_guardian')}),
        ('Medical info', {'fields': ('medicare', 'medicaid', 'disable', 'chronic', 'at_home_member',)}),
        ('Contact info', {'fields': ('phone_number',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


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
        'role',
        "blood_pressure",
        "blood_test",
        "blood_sugar",
        "temperature",
        "medicine_deliver",
        "meal_deliver",
        "feeding",
        "washing",
        "accompany_clinic",
        "limb_exercise",
    )
    fieldsets = (
        (None, {'fields': ('user', 'role')}),
        ('Measurement', {
            'fields': ('blood_pressure', 'blood_test', 'blood_sugar', 'temperature')}),
        ('Delivery', {'fields': ('medicine_deliver', 'meal_deliver', 'accompany_clinic')}),
        ('Others', {'fields': ('feeding', 'washing', 'limb_exercise')}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(CareService, CareServiceAdmin)
