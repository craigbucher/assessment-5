# Generated by Django 4.0.6 on 2022-08-12 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assess5_app', '0005_alter_inspection_pollen_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hive',
            name='nickname',
            field=models.CharField(max_length=32, verbose_name='Nickname'),
        ),
    ]
