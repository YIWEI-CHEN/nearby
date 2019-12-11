from rest_framework import viewsets

from .models import CareCase
from .serializers import CareCaseSerializer


class CareCaseView(viewsets.ModelViewSet):
    serializer_class = CareCaseSerializer
    queryset = CareCase.objects.all()
