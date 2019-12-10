from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView

from profiles.serializers import UserDetailSerializer, UserModel


class UserDetailView(viewsets.ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = UserModel.objects.all()


class IsReservedView(GenericAPIView):
    serializer_class = UserDetailSerializer
    queryset = UserModel.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        num_of_taker_cases = len(instance.taker_cases.all())
        is_taker = instance.generalprofile.is_taker
        reserved = num_of_taker_cases > 0 and is_taker
        return Response({"reserved": reserved})
