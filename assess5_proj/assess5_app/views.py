from django.shortcuts import render
from django.http import HttpResponse

               
def send_the_homepage(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)
