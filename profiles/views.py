import json

from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response

from carecases.models import CaseStatus
from .models import GeneralProfile
from django.contrib.auth.models import User
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


def create_profiles(request):
    print("come in create_profiles!!")
    data = json.loads(request.body)["values"]
    data["user_id"] = request.user.id
    data["user"] = request.user
    print(data)
    # queryset = User.objects.filter(user=request.user)
    # print( queryset )
    GeneralProfile.objects.create(**data)
    res = {
        "success": True
    }
    return HttpResponse(json.dumps(res), content_type="application/json")


def update_profiles(request):
    print("come in update_profiles!!")
    print(request)
    data = json.loads(request.body)["values"]
    firstName = data["firstName"]
    lastName = data["lastName"]

    data["user"] = request.user
    print(data)
    queryset = User.objects.filter(username=request.user)
    print(queryset)
    queryset = json.loads(serializers.serialize("json", queryset))
    queryset = queryset[0]["fields"]
    print(queryset)

    # print( queryset[ "firstName"] )
    try:
        data["email"] = queryset["email"]
    except Exception as e:
        print("no email")

    try:
        data["firstName"] = queryset["first_name"]
    except Exception as e:
        print("no firstName")

    try:
        data["lastName"] = queryset["last_name"]
    except Exception as e:
        print("no lastName")


    data["firstName"] = firstName
    data["lastName"] = lastName
    print("data: ", data)

    # GeneralProfile.objects.filter(user_id=request.user.id)

    GeneralProfile.objects.filter(user_id=request.user.id).update(**data)

    # data["user_id"] = request.user.id
    # GeneralProfile.objects.create(**data)
    res = {
        "success": True
    }
    return HttpResponse(json.dumps(res), content_type="application/json")


def create_profiles_for_google(request):
    print("come in create_profiles_for_google!!")
    print(request)
    print(request.body)

    # data = json.loads(request.body)["values"]
    data = {}
    data["user_id"] = request.user.id
    data["user"] = request.user
    print(data)

    queryset = GeneralProfile.objects.filter(user=request.user)
    if queryset.exists():
        pass
    else:

        queryset = User.objects.filter(username=request.user)
        queryset = json.loads(serializers.serialize("json", queryset))
        print(queryset)
        queryset = queryset[0]["fields"]
        try:
            data["email"] = queryset["email"]
        except Exception as e:
            print("no email")

        try:
            data["firstName"] = queryset["first_name"]
        except Exception as e:
            print("no firstName")

        try:
            data["lastName"] = queryset["last_name"]
        except Exception as e:
            print("no lastName")

        print("data: ", data)
        # GeneralProfile.objects.filter(user_id=request.user.id).update(**data)

        GeneralProfile.objects.create(**data)
        #



    return HttpResponseRedirect("/redirect_to_account/")

    # data = json.loads( request.body )["values"]
    # data["user_id"] = request.user.id
    # data["user"]  = request.user
    # print( data )
    # GeneralProfile.objects.create( **data )
    # res = {
    #     "success":True
    # }
    # return HttpResponseRedirect("/redirect_to_account/")


def read_profiles(request):
    print("come in read_profiles!!")
    print(request.user.id)
    print(request.user)
    data = {"data": "test"}

    a = GeneralProfile.objects.filter(user=request.user)
    print(a)
    data['result'] = json.loads(serializers.serialize("json", a))
    return HttpResponse(json.dumps(data), content_type="application/json")
