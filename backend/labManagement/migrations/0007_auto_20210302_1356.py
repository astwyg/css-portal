# Generated by Django 3.0.8 on 2021-03-02 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('labManagement', '0006_auto_20210302_1353'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='machine_type',
            field=models.CharField(choices=[('虚拟机', '虚拟机'), ('物理机', '物理机'), ('终端', '终端')], max_length=10, verbose_name='设备类型'),
        ),
    ]
