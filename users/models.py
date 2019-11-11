from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from django_localflavor_us.models import USStateField
from phonenumber_field.modelfields import PhoneNumberField


class CustomUser(AbstractUser):
    phone_number = PhoneNumberField(_('phone number'), blank=True, null=True)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(_('gender'), max_length=1, choices=GENDER_CHOICES, default='F')
    date_of_birth = models.DateField(_('date of birth'),  blank=True, null=True)
    is_taker = models.BooleanField(_('taker status'), default=False)
    is_provider = models.BooleanField(_('provider status'), default=False)
    is_guardian = models.BooleanField(_('guardian status'), default=False)

    def __str__(self):
        return self.email

class Address(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    address = models.CharField(_("address"), max_length=128, blank=True, null=True)

    city = models.CharField(_("city"), max_length=64, default="College Station")
    state = USStateField(_('state'), default="TX")
    zip_code = models.CharField(_('zip code'), max_length=5, default="77840")
    country = CountryField(_("country"), default='US')

    latitude = models.FloatField(_("latitude"), blank=True, null=True)
    longitude = models.FloatField(_("longitude"), blank=True, null=True)

    def __str__(self):
        return "{}, {}, {}, {}, {}".format(
                self.address,
                self.city,
                self.state,
                self.zip_code,
                self.country
            )


class Payment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    card_number = CardNumberField(_("card number"), blank=True, null=True)
    card_expiry = CardExpiryField(_("expiration date"), blank=True, null=True)
    card_code = SecurityCodeField(_("security code"), blank=True, null=True)

    def __str__(self):
        return self.id
