from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

# Create your models here.
from django_countries.fields import CountryField
from django_localflavor_us.models import USStateField
from languages.fields import LanguageField
from phonenumber_field.modelfields import PhoneNumberField

from carecases.models import CareInfo


class GeneralProfile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    firstName = models.CharField(_("firstName"), max_length=64, default="Your firstName")
    lastName = models.CharField(_("lastName"), max_length=64, default="Your lastName")
    email = models.CharField(_("email"), max_length=64, default="Your email")
    phone = models.CharField(_("phone"), max_length=64, default="Your Phone Number")
    state = models.CharField(_("state"), max_length=64, default="Your State")
    country = models.CharField(_("country"), max_length=64, default="Your Country")
    phone_number = PhoneNumberField(_('phone number'), blank=True, null=True)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(_('gender'), max_length=1, choices=GENDER_CHOICES, default='F')
    date_of_birth = models.DateField(_('date of birth'), blank=True, null=True)

    is_taker = models.BooleanField(_('taker status'), default=True)
    is_provider = models.BooleanField(_('provider status'), default=False)

    rate = models.FloatField(_('average rate'), default=2.5, blank=True)
    num_of_comments = models.IntegerField(_('number of comments'), default=100, blank=True)
    image_url = models.TextField(_('image url'),
                              default='/static/images/avatars/avatar_5.png',
                              blank=True)

    def __str__(self):
        return "{}'s general profile".format(self.user.username)


class MedicalProfile(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    MEDICARE_CHOICES = (
        ("A", _("A")),
        ("B", _("B")),
        ("C", _("C")),
        ("D", _("D")),
    )
    medicare = models.CharField(_('medicare'), max_length=1, choices=MEDICARE_CHOICES, default='A')
    medicaid = models.BooleanField(_('medicaid'), default=False)
    disabled = models.BooleanField(_('disabled in action'), default=False)
    chronic = models.BooleanField(_('chronic disease'), default=False)
    at_home_member = models.BooleanField(_('any family member at home'), default=False)

    def __str__(self):
        return "{}'s medical profile".format(self.user.username)


class Address(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    address = models.CharField(_("address"), max_length=128)

    city = models.CharField(_("city"), max_length=64, default="College Station")
    state = USStateField(_('state'), default="TX")
    zip_code = models.CharField(_('zip code'), max_length=5, default="77840")
    country = CountryField(_("country"), default='US')

    latitude = models.FloatField(_("latitude"), blank=True, null=True)
    longitude = models.FloatField(_("longitude"), blank=True, null=True)

    def __str__(self):
        return "{} lives in {}, {}, {}, {}, {}".format(
                self.user.username,
                self.address,
                self.city,
                self.state,
                self.zip_code,
                self.country
            )


class Payment(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    card_number = CardNumberField(_("card number"))
    card_expiry = CardExpiryField(_("expiration date"))
    card_code = SecurityCodeField(_("security code"))

    def __str__(self):
        return "{}'s payment({})".format(self.user.username, str(self.card_number)[-4:])


# class CareService(models.Model):
#     user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
#
#     # measurement
#     blood_pressure = models.BooleanField(_('measure blood pressure'), default=False)
#     blood_sugar = models.BooleanField(_('measure blood sugar'), default=False)
#     temperature = models.BooleanField(_('measure body temperature'), default=False)
#
#     # cleanliness
#     shower = models.BooleanField(_('help take a shower or tub bath'), default=False)
#     hair_washing = models.BooleanField(_('help washing hair'), default=False)
#     teeth_brushing = models.BooleanField(_('help brush teeth'), default=False)
#     bed_bathing = models.BooleanField('help clean whole body with wet towel')
#
#     # feed
#     food_feeding = models.BooleanField(_('help feed food'), default=False)
#     medicine_feeding = models.BooleanField(_('help feed medicine'), default=False)
#
#     # exercise
#     upper_limb_moving = models.BooleanField(_('help move upper limb'), default=False)
#     lower_limb_moving = models.BooleanField(_('help move lower limb'), default=False)
#     turn_over = models.BooleanField(_('help turn whole body over on bed'), default=False)


class ProvidedCareService(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    care = models.ForeignKey(CareInfo, on_delete=models.CASCADE)

    def __str__(self):
        return '{} provides {}'.format(self.user.username, self.care.name)


class Language(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    CUSTOM_LANGUAGE_CHOICES = (
        ("zh", _(u"Chinese")),
        ("en", _(u"English")),
        ("es", _(u"Spanish")),
    )
    language = LanguageField(_('language'), default="en", choices=CUSTOM_LANGUAGE_CHOICES)

    def __str__(self):
        mapping = dict(self.CUSTOM_LANGUAGE_CHOICES)
        return '{} can speak {}'.format(self.user.username, mapping[self.language])
