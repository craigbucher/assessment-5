from django.urls import path
from . import views
          
urlpatterns = [
    
    # serves index.html which will load our react app
    path('', views.index),
    # API endpoints - return JSON data
    path('test/', views.test, name = 'test'),
    path('weather/', views.weather, name = 'weather'),
    path('location/', views.location, name = 'location'),
    path('pollen/', views.pollen, name = 'pollen'),
    # handles requests from React
    path('signup/', views.sign_up),
    path('login/', views.log_in),
    path('logout/', views.log_out),
    path('whoami/', views.who_am_i),
    path('hives/', views.hives, name = 'hives'),
    path('hives/<int:hive_id>', views.hives, name = 'hives_delete'),
    path('inspections/', views.inspections, name = 'inspections'),
]