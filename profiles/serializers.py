from django.contrib.auth import get_user_model
from rest_framework import serializers

from carecases.serializers import CareInfoSerializer
from .models import ProvidedCareService, Language, Address, GeneralProfile

UserModel = get_user_model()


class ProvidedServiceSerializer(serializers.ModelSerializer):
    care = CareInfoSerializer()

    class Meta:
        model = ProvidedCareService
        exclude = ['user', 'id']


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['language']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ['user', 'id']


class GeneralProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralProfile
        # fields = '__all__'
        exclude = ['user', 'id']


class UserDetailSerializer(serializers.ModelSerializer):
    language_set = LanguageSerializer(many=True)
    providedcareservice_set = ProvidedServiceSerializer(many=True)
    generalprofile = GeneralProfileSerializer()

    class Meta:
        model = UserModel
        fields = ('pk', 'first_name', 'last_name', 'language_set', 'generalprofile',
                  'providedcareservice_set')
