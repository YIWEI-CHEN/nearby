from rest_framework import viewsets

from profiles.serializers import UserDetailSerializer, UserModel


class UserDetailView(viewsets.ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = UserModel.objects.all()
