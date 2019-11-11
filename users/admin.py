from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser, Address, Payment


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = (
        'username', 'email', 'is_active', 'last_login',
        'gender',  'phone_number',
        'is_taker', 'is_provider', 'is_guardian',
        'date_of_birth',
    )
    list_filter = ('email', 'is_active', 'gender', )
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
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
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('user', 'address', 'city', 'state', 'zip_code', 'country')}
         ),
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
