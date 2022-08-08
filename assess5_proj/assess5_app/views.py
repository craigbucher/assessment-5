from django.shortcuts import render
from django.http import HttpResponse
from dotenv import load_dotenv
import os

               
def send_the_homepage(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)