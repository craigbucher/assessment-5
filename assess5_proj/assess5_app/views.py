from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from dotenv import load_dotenv
import os
import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import AppUser as User

load_dotenv()

def index(request):
    print('Index / Login page')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

#########################################################
#################### CRUD Stuff #########################
#########################################################


#########################################################
################### Authentication ######################
#########################################################

###### Sign-up #######
@api_view(['POST'])
def sign_up(request):
    try:
        User.objects.create_user(username=request.data['email'], password=request.data['password'], email=request.data['email'])
    except Exception as e:
        print(str(e))
    return HttpResponse('hi')

###### Login #######
@api_view(['POST'])
def log_in(request):
    print(dir(request))           # Django restframework replaces request object with similar one it thinks is more useful
    print(dir(request._request))  # original 'plain' django request object

    # DRF assumes that the body is JSON, and automatically parses it into a dictionary at request.data
    email = request.data['email']
    password = request.data['password']
    print(email, password)
    # user = authenticate(username=email, password=password, email=email)
    user = authenticate(username=email, password=password)
    print('user?')
    # print(user.email)
    # print(user.password)
    # if user is not None:
    #     if user.is_active:
    #         try:
    #             # access the base request, not the DRF request
    #             # this starts a login session for this user
    #             login(request._request, user)
    #         except Exception as e:
    #             print('except')
    #             print(str(e))
    #         return HttpResponse('success!')
    #         # Redirect to a success page.
    #     else:
    #         return HttpResponse('not active!')
    #         # Return a 'disabled account' error message
    # else:
    #     return HttpResponse('no user!')
    #     # Return an 'invalid login' error message.
    return HttpResponse('end of view')

###### Login #######
@api_view(['POST'])
def log_out(request):
    logout(request)
    return JsonResponse({'success':True})

###### Who am I #######
@api_view(['GET'])
def who_am_i(request):
    # Make sure that you don't send sensitive information to the client, such as password hashes
    # raise Exception('oops')
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['email', 'username'])

        return HttpResponse(data)
    else:
        return JsonResponse({'user':None})

#########################################################
################## External API Queries #################
#########################################################

# queries weather api at https://api.openweathermap.org/data/2.5/weather
def weather(request):
    print('received a WEATHER request')
    lat = request.GET.get('latitude')
    long = request.GET.get('longitude')
    print(lat,long)
    APPID = os.environ['weather_APPID']
    url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&APPID={APPID}&units=imperial'
    response = requests.get(url)
    return HttpResponse(response)

# queries latitude/longitude api at https://ipgeolocation.abstractapi.com/v1/
def location(request):
    print('received a LOCATION request')
    api_key = os.environ['location_key']
    response = requests.get(f"https://ipgeolocation.abstractapi.com/v1/?api_key={api_key}")
    print(response.content)
    return HttpResponse(response.content)

# queries pollen count api at https://api.ambeedata.com/latest/pollen/by-lat-lng
def pollen(request):
    print('received a POLLEN request')
    lat = request.GET.get('latitude')
    long = request.GET.get('longitude')
    api_key = os.environ['pollen_key']
    # url = "https://api.ambeedata.com/weather/latest/by-lat-lng"
    url = "https://api.ambeedata.com/latest/pollen/by-lat-lng"
    querystring = {f"lat":{lat},"lng":{long}}
    headers = {
        'x-api-key': api_key,
        'Content-type': "application/json"
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    return HttpResponse(response)

@csrf_exempt
def test(request):
    if request.method == "POST":
        print('received a POST request')
        return HttpResponse('Received a POST request')
    print ('received a GET request')
    # query = request.GET.get('query')
    # print(query)
    # APPID = os.environ['weather_APPID']
    # print(APPID)
    # response = requests.request("GET", url, headers=headers, params=querystring)
    return HttpResponse('ping')