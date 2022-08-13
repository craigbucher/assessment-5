# Generated by Django 4.0.6 on 2022-08-11 02:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assess5_app', '0003_alter_hive_removal_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hive',
            name='install_date',
            field=models.DateField(blank=True, default=datetime.date.today, null=True, verbose_name='Date bees installed'),
        ),
        migrations.AlterField(
            model_name='hive',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='hive',
            name='photo_url',
            field=models.CharField(blank=True, max_length=256, null=True, verbose_name='Photo URL'),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='brood',
            field=models.BooleanField(blank=True, null=True, verbose_name='Capped brood or eggs'),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='disease',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='feeding',
            field=models.CharField(blank=True, max_length=18, null=True),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='has_swarmed',
            field=models.BooleanField(blank=True, null=True, verbose_name='Evidence of swarm'),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='humidity',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='meds',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='pollen_type',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='Pollen types'),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='queen_cells',
            field=models.BooleanField(blank=True, null=True, verbose_name='Queen cells'),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='queen_sight',
            field=models.BooleanField(blank=True, null=True, verbose_name='Queen sighted'),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='supers',
            field=models.BooleanField(blank=True, null=True, verbose_name='Honey supers on'),
        ),
        migrations.AlterField(
            model_name='inspection',
            name='temperature',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=4, null=True),
        ),
    ]
