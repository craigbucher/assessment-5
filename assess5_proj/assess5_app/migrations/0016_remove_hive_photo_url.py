# Generated by Django 4.0.6 on 2022-08-15 16:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('assess5_app', '0015_rename_hive_inspection_curr_hive'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hive',
            name='photo_url',
        ),
    ]
