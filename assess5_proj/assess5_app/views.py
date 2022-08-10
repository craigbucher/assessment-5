from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from dotenv import load_dotenv
import os
import requests
from django.views.decorators.csrf import csrf_exempt

def index(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@csrf_exempt
def test(request):
    if request.method == "POST":
        print('received a POST request')
        return HttpResponse('Received a POST request')
    print ('received a GET request')
    query = request.GET.get('query')
    print(query)
    # response = requests.get("https://ipgeolocation.abstractapi.com/v1/?api_key=9afb4abe27c741e0894f6af0d0705b20")
    # print(response.status_code)
    # print(response.content)
    ###########################################
    url = "https://api.ambeedata.com/weather/latest/by-lat-lng"
    querystring = {"lat":"41.885311","lng":"-87.6285002"}
    headers = {
        'x-api-key': "3e2eeb2abacb055983becb96c2c286fb5c9d360f46f97f6107d5b9abe9f7d5e5",
        'Content-type': "application/json"
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    print(response.text)
    return HttpResponse(response.text)