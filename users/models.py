from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from django_localflavor_us.models import USStateField
from languages.fields import LanguageField
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
    CUSTOM_LANGUAGE_CHOICES = (
        ("zh", _(u"Chinese")),
        ("en", _(u"English")),
        ("es", _(u"Spanish")),
    )
    language = LanguageField(_('preferred language'), default="en", choices=CUSTOM_LANGUAGE_CHOICES)
    MEDICARE_CHOICES = (
        ("A", _("A")),
        ("B", _("B")),
        ("C", _("C")),
        ("D", _("D")),
    )

    medicare = models.CharField(_('medicare'), max_length=1, choices=MEDICARE_CHOICES, default='A')
    TRUE_FALSE_CHOICES = (
        ("Y", 'Yes'),
        ("N", 'No')
    )
    medicaid = models.CharField(_('medicaid'), max_length=1, choices=TRUE_FALSE_CHOICES, default='Y')
    disable = models.CharField(_('disable in action'), max_length=1, choices=TRUE_FALSE_CHOICES, default='N')
    chronic = models.CharField(_('chronic disease'), max_length=1, choices=TRUE_FALSE_CHOICES, default='N')
    at_home_member = models.CharField(_('family member at home'), max_length=1, choices=TRUE_FALSE_CHOICES, default='N')

    def __str__(self):
        return self.email


class Address(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    address = models.CharField(_("address"), max_length=128)

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

    card_number = CardNumberField(_("card number"))
    card_expiry = CardExpiryField(_("expiration date"))
    card_code = SecurityCodeField(_("security code"))

    def __str__(self):
        return '{}'.format(self.id)


class CareService(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    ROLE_CHOICES = (
        ('T', 'Taker'),
        ('P', 'Provider'),
    )
    role = models.CharField(_('which role registers services'), max_length=1, choices=ROLE_CHOICES, default='T')

    blood_pressure = models.BooleanField(_('measure blood pressure'), default=False)
    blood_test = models.BooleanField(_('draw blood for testing'), default=False)
    blood_sugar = models.BooleanField(_('measure blood sugar'), default=False)
    temperature = models.BooleanField(_('measure body temperature'), default=False)
    medicine_deliver = models.BooleanField(_('pick medicine and deliver'), default=False)
    meal_deliver = models.BooleanField(_('deliver nutritious meals'), default=False)
    feeding = models.BooleanField(_('help feeding'), default=False)
    washing = models.BooleanField(_('help washing body'), default=False)
    accompany_clinic = models.BooleanField(_('accompany people to clinic visit'), default=False)
    limb_exercise = models.BooleanField(_('help limbs exercise'), default=False)
