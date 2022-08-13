from django.contrib import admin

# Register your models here.
from assess5_app.models import AppUser, Hive, Inspection

admin.site.register(AppUser)
admin.site.register(Hive)
admin.site.register(Inspection)