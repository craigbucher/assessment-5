from django.urls import path
from . import views
          
urlpatterns = [
    # serves index.html which will load our react app
    path('', views.index),
    path('test/', views.test, name = 'test'),
    # API endpoints - return JSON data
    # path('signup', views.sign_up),
    # path('login', views.log_in),
    # path('logout', views.log_out),
    # path('whoami', views.who_am_i),
]