# Generated by Django 3.0.8 on 2021-03-03 09:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('labManagement', '0009_auto_20210303_1726'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='machine_number',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)], verbose_name='设备数量(台)'),
        ),
    ]
