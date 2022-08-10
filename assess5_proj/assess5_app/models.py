from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import datetime

# Inheriting from 'AbstractUser' lets us use all the fields of the default User,
# and overwrite the fields we need to change
# This is different from 'AbstractBaseUser', which only gets the password management features from the default User,
# and needs the developer to define other relevant fields.
class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    first_name=models.CharField(max_length=16, verbose_name="First name")
    last_name=models.CharField(max_length=16, verbose_name="Last name")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email and password are required by default

    def __str__(self):
        return f"ID: {self.id}, Name: {self.first_name} {self.last_name}, email: {self.email}"

class Hive(models.Model):
    nickname = models.CharField(max_length=32, blank=False, verbose_name="Hive frames")
    location_name = models.CharField(max_length=32, blank=True, verbose_name="Hive location") 
    loc_lat=models.DecimalField(max_digits=8, decimal_places=6, blank=True)
    loc_long=models.DecimalField(max_digits=8, decimal_places=6, blank=True)
    # install_date=models.DateField(default=date.today, blank=True)
    install_date=models.DateField(blank=True, verbose_name="Date bees installed")
    frames=models.IntegerField(default=10, verbose_name="Hive frames")
    depth=models.CharField(max_length = 7, verbose_name="Hive depth")
    active=models.BooleanField(default=True, verbose_name="Hive is active")
    breed=models.CharField(max_length = 9, verbose_name="Bee breed") #choices?
    removal_date=models.DateField(blank=True, verbose_name="Date removed")
    photo_url=models.CharField(max_length = 256, blank=True, verbose_name="Photo URL")
    notes=models.TextField(blank=True) #efault form widget for this field is TextArea

    def __str__(self):
        return f"ID: {self.id} and Title: {self.nickname}"

class Inspection(models.Model):
    AppUser=models.ForeignKey(AppUser, on_delete = models.CASCADE)
    hive=models.ForeignKey(Hive, on_delete=models.CASCADE)
    # inspection_date=models.DateField(default=date.today, blank=True)
    inspection_date=models.DateField()
    temperature=models.DecimalField(max_digits=4, decimal_places=1, blank=True)
    humidity=models.DecimalField(max_digits=3, decimal_places=1, blank=True)
    pollen_type=models.CharField(max_length = 32, blank=True, verbose_name="Pollen types")
    pollen_count=models.IntegerField(blank=True, verbose_name="Pollen count")
    queen_sight=models.BooleanField(blank=True, verbose_name="Queen sighted")
    brood=models.BooleanField(blank=True, verbose_name="Capped brood or eggs")
    queen_cells=models.BooleanField(blank=True, verbose_name="Queen cells")
    has_swarmed=models.BooleanField(blank=True, verbose_name="Evidence of swarm")
    supers=models.BooleanField(blank=True, verbose_name="Honey supers on")
    feeding=models.CharField(max_length=18, blank=True)
    disease=models.CharField(max_length=64, blank=True)
    meds=models.CharField(max_length=32, blank=True)
    notes=models.TextField(blank=True) #efault form widget for this field is TextArea
    
    def __str__(self):
        return f"ID: {self.id} and Title: {self.inspection_date}"