from rest_framework import serializers
from profiles.models import GeneralProfile

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralProfile
        fields = ('gender', 'date of birth', 'preferred language', 'phone number')