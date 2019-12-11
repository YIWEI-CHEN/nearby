import json

from django.core import serializers
from django.http import HttpResponse
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response

from carecases.models import CaseStatus
from .models import GeneralProfile
from profiles.serializers import UserDetailSerializer, UserModel, ProviderDetailSerializer


class UserDetailView(viewsets.ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = UserModel.objects.all()


class IsReservedView(generics.GenericAPIView):
    serializer_class = UserDetailSerializer
    queryset = UserModel.objects.all()

    def get(self, request, *args, **kwargs):
        reserved = True
        instance = self.get_object()
        taker_cases = instance.taker_cases.all()
        if len(taker_cases) == 0:
            reserved = False
        else:
            latest_one = taker_cases.order_by('-id')[0]
            if latest_one.status == CaseStatus.DONE.value:
                reserved = False
        is_taker = instance.generalprofile.is_taker
        reserved = reserved and is_taker
        return Response({"reserved": reserved})


class ProviderListView(generics.ListAPIView):
    serializer_class = ProviderDetailSerializer

    def get_queryset(self):
        language = self.request.query_params.get('language', None)
        providers = UserModel.objects.filter(generalprofile__is_provider=True)
        if language is not None:
            providers = providers.filter(language__language=language)
        return providers


def update_profiles( request ):
    print( "come in!!" )
    data = json.loads( request.body )["values"]
    data["user_id"] = request.user.id
    data["user"]  = request.user
    print( data )
    GeneralProfile.objects.create( **data )
    res = {
        "success":True
    }
    return HttpResponse( json.dumps(res), content_type="application/json"  )



def create_profiles( request ):
    print( "come in!!" )
    data = json.loads( request.body )["values"]
    data["user_id"] = request.user.id
    data["user"]  = request.user
    print( data )
    GeneralProfile.objects.create( **data )
    res = {
        "success":True
    }
    return HttpResponse( json.dumps(res), content_type="application/json"  )


def read_profiles( request ):
    print( "read_profiles!!" )
    print( request.user.id )
    print(request.user)
    data = { "data":"test" }

    a = GeneralProfile.objects.filter(user=request.user)
    print( a )
    data['result'] = json.loads(serializers.serialize("json", a))
    return HttpResponse( json.dumps(data), content_type="application/json"  )