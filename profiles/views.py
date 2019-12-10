
import uuid
from profiles.models import GeneralProfile
# from rest_framework import serializers
from django.core import serializers
from django.http import HttpResponse
import json
from profiles import models
import uuid
# Create your views here.

def update_profiles( request ):
    print( "come in!!" )
    data = json.loads( request.body )["values"]
    data["user_id"] = request.user.id
    data["user"]  = request.user
    print( data )
    models.GeneralProfile.objects.create( **data )
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
    models.GeneralProfile.objects.create( **data )
    res = {
        "success":True
    }
    return HttpResponse( json.dumps(res), content_type="application/json"  )


def read_profiles( request ):
    print( "read_profiles!!" )
    print( request.user.id )
    print(request.user)
    data = { "data":"test" }

    a = models.GeneralProfile.objects.filter(user=request.user)
    print( a )
    data['result'] = json.loads(serializers.serialize("json", a))
    return HttpResponse( json.dumps(data), content_type="application/json"  )