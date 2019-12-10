from rest_framework import serializers

from .models import CareCase, CareService


class CareServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareService
        fields = ['id', 'name', 'price', 'checked']


class CareCaseSerializer(serializers.ModelSerializer):
    services = CareServiceSerializer(many=True)

    class Meta:
        model = CareCase
        fields = [
            'id', 'time', 'note', 'provider_feedback',
            'taker_feedback', 'star', 'status', 'provider', 'taker',
            'services'
        ]

    def create(self, validated_data):
        services_data = validated_data.pop('services')
        case = CareCase.objects.create(**validated_data)
        for service_data in services_data:
            CareService.objects.create(case=case, **service_data)
        return case
