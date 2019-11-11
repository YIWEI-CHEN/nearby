from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser, Address, Payment


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
        'card_number',
        'card_expiry',
        'card_code',
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Payment, PaymentAdmin)
