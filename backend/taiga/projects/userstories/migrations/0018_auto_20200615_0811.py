# Generated by Django 2.2.12 on 2020-06-15 08:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userstories', '0017_userstory_generated_from_task'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userstory',
            name='client_requirement',
            field=models.BooleanField(blank=True, default=False, verbose_name='is client requirement'),
        ),
        migrations.AlterField(
            model_name='userstory',
            name='is_blocked',
            field=models.BooleanField(blank=True, default=False, verbose_name='is blocked'),
        ),
        migrations.AlterField(
            model_name='userstory',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='owned_user_stories', to=settings.TAIGA_USER_MODEL, verbose_name='owner'),
        ),
        migrations.AlterField(
            model_name='userstory',
            name='team_requirement',
            field=models.BooleanField(blank=True, default=False, verbose_name='is team requirement'),
        ),
    ]
