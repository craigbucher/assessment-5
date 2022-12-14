from curses.ascii import HT
from logging import NullHandler
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.decorators import login_required
from dotenv import load_dotenv
import os
import json
import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import AppUser as User, Hive, Inspection

load_dotenv()

# load the homepage (of single-page site)
def index(request):
    print('Index / Login page')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

#########################################################
#################### CRUD Stuff #########################
#########################################################

@api_view(['GET', 'POST', 'DELETE'])
def hives(request, hive_id=None):
    # POST request - create a new Hive record
    if request.method == 'POST':
        try:
            print('received a POST request for Hives')
            # print(request.data)
            nickname = request.data['nickname']
            install_date = request.data['install_date']
            location_name = request.data['location_name']
            loc_lat = request.data['loc_lat']
            loc_long = request.data['loc_long']
            depth = request.data['depth']
            frames = request.data['frames']
            active = request.data['active']
            breed = request.data['breed']
            notes = request.data['notes']
            # newHive = Hive(nickname = request.data['nickname'], location_name=request.data['location_name'], loc_lat=request.data['loc_lat'], loc_long=request.data['loc_long'], install_date=request.data['install_date'], frames=request.data['frames'], depth=request.data['depth'], active=request.data['active'], breed=request.data['breed'], notes=request.data['notes'])
            # newHive = Hive(nickname = 'Test hive', location_name='Chicago, IL', loc_lat=41.5852, loc_long=-87.8059, install_date='2022-08-15', frames=8, depth='Shallow', active=True, breed='Russian', notes='Some notes for this hive')
            newHive = Hive(nickname = nickname, location_name=location_name, loc_lat=loc_lat, loc_long=loc_long, install_date=install_date, frames=frames, depth=depth, active=active, breed=breed, notes=notes)
            print(newHive)
            newHive.save()
            return JsonResponse({'status': 'complete'})
        except:
            return HttpResponse('Error: malformed request')

    # DELETE method deletes selected hive ID
    # elif request.method == "DELETE":
    #     try:
    #         print(f'Received a DELETE request for Hive {hive_id}')
    #         hive = Hive.objects.all().get(id = hive_id)
    #         print(hive)
    #         hive.delete()
    #         return JsonResponse({'status': f'record {hive_id} deleted'})
    #     except:
    #         return HttpResponse("Error: malformed request.")
        
    # default GET request - returns list of all hives in JSON format
    elif request.method == 'GET':
        print('received a GET request for Hives')
        hive_list = []
        hives = Hive.objects.all()
        for i in range(0, len(hives)):
            hive = {}
            hive['id'] = hives[i].id
            hive['nickname'] = hives[i].nickname
            hive['location_name'] = hives[i].location_name
            hive['loc_lat'] = hives[i].loc_lat
            hive['loc_long'] = hives[i].loc_long
            hive['install_date'] = hives[i].install_date
            hive['frames'] = hives[i].frames
            hive['depth'] = hives[i].depth
            hive['active'] = hives[i].active
            hive['breed'] = hives[i].breed
            hive['notes'] = hives[i].notes
            hive_list.append(hive)
        response = {}
        # print(hive_list)
        response['hives'] = hive_list
        return JsonResponse(response)

@api_view(['GET', 'POST'])
def inspections(request):
    # POST request - create a new Inspection record
    if request.method == 'POST':
        try:
            print('received a POST request for Inspections')
            print(request.user.id)
            # print(request.data)
            # # appuser = request.data['appuser']
            # print(appuser)
            curr_hive = request.data['curr_hive']
            inspection_date = request.data['inspection_date']
            temperature = request.data['temperature']
            humidity = request.data['humidity']
            pollen_type = request.data['pollen_type']
            queen_sight = request.data['queen_sight']
            queen_cells = request.data['queen_cells']
            has_swarmed = request.data['has_swarmed']
            feeding = request.data['feeding']
            supers = request.data['supers']
            disease = request.data['disease']
            meds = request.data['meds']
            notes = request.data['notes']
            # newInspection = Inspection(appuser_id = request.user, curr_hive_id=request.data['curr_hive'], inspection_date=request.data['inspection_date'], temperature=request.data['temperature'], humidity=request.data['humidity'], pollen_type=request.data['pollen_type'], pollen_count=request.data['pollen_count'], queen_sight=request.data['queen_sight'], brood=request.data['brood'], queen_cells=request.data['queen_cells'], has_swarmed=request.data['has_swarmed'], supers=request.data['supers'], feeding=request.data['feeding'], disease=request.data['disease'], meds=request.data['meds'], notes=request.data['notes'])
            newInspection = Inspection(appuser_id = request.user.id, curr_hive_id=curr_hive, inspection_date=inspection_date, temperature=temperature, humidity=humidity, pollen_type=pollen_type, queen_sight=queen_sight, queen_cells=queen_cells, has_swarmed=has_swarmed, supers=supers, feeding=feeding, disease=disease, meds=meds, notes=notes)
            # print(newInspection)
            newInspection.save()
            return JsonResponse({'status': 'complete'})
        except Exception as e: print(e)
        return HttpResponse("Error: malformed request.")
        # except:
        #     return HttpResponse("Error: malformed request.")
    
    # default GET request - returns list of all inspections in JSON format
    elif request.method == 'GET':
        print('received a GET request for Inspections')
        print(request.user)
        inspection_list = []
        inspections = Inspection.objects.all()
        # print(inspections[3].hive.id)
        for i in range(0, len(inspections)):
            category = {}
            category['id'] = inspections[i].id
            category['curr_hive'] = inspections[i].curr_hive.id
            category['userID'] = inspections[i].appuser.id
            category['inspection_date'] = inspections[i].inspection_date
            category['temperature'] = inspections[i].temperature
            category['humidity'] = inspections[i].humidity
            category['pollen_type'] = inspections[i].pollen_type
            # category['pollen_count'] = inspections[i].pollen_count
            category['queen_sight'] = inspections[i].queen_sight
            category['queen_cells'] = inspections[i].queen_cells
            category['has_swarmed'] = inspections[i].has_swarmed
            category['supers'] = inspections[i].supers
            category['feeding'] = inspections[i].feeding
            category['disease'] = inspections[i].disease
            category['meds'] = inspections[i].meds
            category['notes'] = inspections[i].notes
            inspection_list.append(category)
        response = {}
        response['inspections'] = inspection_list
        return JsonResponse(response)

################################################################

@api_view(['GET', 'PUT', 'DELETE'])
def hive_detail(request, hive_id):
    # PUT request - updates Hive record
    if request.method == 'PUT':
        try:
            print(f'received a PUT request for Hive ID: {hive_id}')
            # print(request.data)
            hive = Hive.objects.all().get(id = hive_id)
            # print(hive)
            hive.nickname = request.data['nickname']
            hive.install_date = request.data['install_date']
            hive.location_name = request.data['location_name']
            hive.loc_lat = request.data['loc_lat']
            hive.loc_long = request.data['loc_long']
            hive.depth = request.data['depth']
            hive.frames = request.data['frames']
            hive.active = request.data['active']
            hive.breed = request.data['breed']
            hive.notes = request.data['notes']
            # # newHive = Hive(nickname = request.data['nickname'], location_name=request.data['location_name'], loc_lat=request.data['loc_lat'], loc_long=request.data['loc_long'], install_date=request.data['install_date'], frames=request.data['frames'], depth=request.data['depth'], active=request.data['active'], breed=request.data['breed'], notes=request.data['notes'])
            # # newHive = Hive(nickname = 'Test hive', location_name='Chicago, IL', loc_lat=41.5852, loc_long=-87.8059, install_date='2022-08-15', frames=8, depth='Shallow', active=True, breed='Russian', notes='Some notes for this hive')
            # newHive = Hive(nickname = nickname, location_name=location_name, loc_lat=loc_lat, loc_long=loc_long, install_date=install_date, frames=frames, depth=depth, active=active, breed=breed, notes=notes)
            # print(hive.nickname)
            hive.save()
            return JsonResponse({'status': 'complete'})
        except:
            return HttpResponse('Error: malformed request')
        # return HttpResponse('PUT complete')
    
        # DELETE method deletes selected hive_id
    elif request.method == "DELETE":
        try:
            print(f'Received a DELETE request for Hive {hive_id}')
            hive = Hive.objects.all().get(id = hive_id)
            print(hive)
            hive.delete()
            # return JsonResponse({'status': f'record {hive_id} deleted'})
            return HttpResponse(f'record {hive_id} deleted')
        except:
            return HttpResponse("Error: malformed request.")

    # default GET request - returns info on hive specified by hive_id
    elif request.method == 'GET':
        print(f'received a GET request for Hive ID: {hive_id}')
        print(request.user.id)
        # hive_list = []
        hives = Hive.objects.all().get(id = hive_id)
        # for i in range(0, len(hives)):
        hive = {}
        hive['id'] = hives.id
        hive['nickname'] = hives.nickname
        hive['location_name'] = hives.location_name
        hive['loc_lat'] = hives.loc_lat
        hive['loc_long'] = hives.loc_long
        hive['install_date'] = hives.install_date
        hive['frames'] = hives.frames
        hive['depth'] = hives.depth
        hive['active'] = hives.active
        hive['breed'] = hives.breed
        hive['notes'] = hives.notes
        # hive_list.append(hive)
        # response = {}
        print(hive)
        # response['hives'] = hive_list
        return JsonResponse(hive)
        # return HttpResponse('hive detail completed')

@api_view(['GET'])
def inspection_detail(request, inspect_id):
    # default GET request - returns inspection by inspect_id
    print(f'received a GET request for Inspection ID: {inspect_id}')
    # print(request.user)
    inspection_list = []
    inspections = Inspection.objects.all().get(id = inspect_id)
    # print(inspections[3].hive.id)
    # for i in range(0, len(inspections)):
    inspection = {}
    inspection['id'] = inspections.id
    inspection['curr_hive'] = inspections.curr_hive.id
    inspection['userID'] = inspections.appuser.id
    inspection['inspection_date'] = inspections.inspection_date
    inspection['temperature'] = inspections.temperature
    inspection['humidity'] = inspections.humidity
    inspection['pollen_type'] = inspections.pollen_type
    # inspection['pollen_count'] = inspections.pollen_count
    inspection['queen_sight'] = inspections.queen_sight
    inspection['queen_cells'] = inspections.queen_cells
    inspection['has_swarmed'] = inspections.has_swarmed
    inspection['supers'] = inspections.supers
    inspection['feeding'] = inspections.feeding
    inspection['disease'] = inspections.disease
    inspection['meds'] = inspections.meds
    inspection['notes'] = inspections.notes
    inspection_list.append(inspection)
    response = {}
    response['inspections'] = inspection_list
    # print(inspection)
    return JsonResponse(inspection)
    # return HttpResponse('detail completed')

#########################################################
################### Authentication ######################
#########################################################

###### Sign-up #######
@api_view(['POST'])
def sign_up(request):
    try:
        User.objects.create_user(username=request.data['first_name'], password=request.data['password'], email=request.data['email'], first_name=request.data['first_name'], last_name=request.data['last_name'])
    except Exception as e:
        print(str(e))
    return HttpResponse('Accout creation successful')

###### Login #######
@api_view(['POST'])
def log_in(request):
    # print(dir(request))           # Django restframework replaces request object with similar one it thinks is more useful
    # print(dir(request._request))  # original 'plain' django request object

    # DRF assumes that the body is JSON, and automatically parses it into a dictionary at request.data
    email = request.data['email']
    password = request.data['password']
    print(email, password)
    # user = authenticate(username=email, password=password, email=email)
    user = authenticate(username=email, password=password)
    print('user?')
    # print(user.email)
    # print(user.password)
    if user is not None:
        if user.is_active:
            try:
                # access the base request, not the DRF request
                # this starts a login session for this user
                login(request._request, user)
            except Exception as e:
                print('except')
                print(str(e))
            return HttpResponse('Login success!')
            # Redirect to a success page.
        else:
            return HttpResponse('Account not active!')
            # Return a 'disabled account' error message
    else:
        return HttpResponse('Invalid login credentials')
        # Return an 'invalid login' error message.

###### Logout #######
@api_view(['POST'])
def log_out(request):
    logout(request)
    return JsonResponse({'Logout':True})

###### Who am I #######
@api_view(['GET'])
def who_am_i(request):
    print('received a WHO AM I request')
    # Make sure that you don't send sensitive information to the client, such as password hashes
    # raise Exception('oops')
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['email', 'username'])
        print('whoami data:' + data)
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
    # print(lat,long)
    APPID = os.environ['weather_APPID']
    url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&APPID={APPID}&units=imperial'
    response = requests.get(url)
    return HttpResponse(response)

# queries latitude/longitude api at https://ipgeolocation.abstractapi.com/v1/
def location(request):
    print('received a LOCATION request')
    api_key = os.environ['location_key']
    response = requests.get(f"https://ipgeolocation.abstractapi.com/v1/?api_key={api_key}")
    # print(response.content)
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