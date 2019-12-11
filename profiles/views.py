from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import generics

from profiles.serializers import UserDetailSerializer, UserModel, ProviderDetailSerializer


class UserDetailView(viewsets.ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = UserModel.objects.all()


class IsReservedView(generics.GenericAPIView):
    serializer_class = UserDetailSerializer
    queryset = UserModel.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        num_of_taker_cases = len(instance.taker_cases.all())
        is_taker = instance.generalprofile.is_taker
        reserved = num_of_taker_cases > 0 and is_taker
        return Response({"reserved": reserved})


class ProviderListView(generics.ListAPIView):
    serializer_class = ProviderDetailSerializer

    def get_queryset(self):
        language = self.request.query_params.get('language', None)
        providers = UserModel.objects.filter(generalprofile__is_provider=True)
        if language is not None:
            providers = providers.filter(language__language=language)
        return providers

