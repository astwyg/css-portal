# Generated by Django 3.0.8 on 2021-02-22 08:43

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('labManagement', '0002_auto_20210222_1642'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='business',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('应用软件', '应用软件'), ('操作系统', '操作系统'), ('大数据', '大数据'), ('分布式存储', '分布式存储'), ('数据库', '数据库'), ('中间件', '中间件'), ('云平台', '云平台'), ('虚拟化', '虚拟化'), ('高性能计算', '高性能计算'), ('ARM原生', 'ARM原生'), ('AI', 'AI'), ('其他', '其他')], max_length=53, verbose_name='业务范围'),
        ),
        migrations.AlterField(
            model_name='resource',
            name='region',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('全球', '全球'), ('中日韩东南亚', '中日韩东南亚'), ('欧美地区', '欧美地区'), ('全国', '全国'), ('粤港澳及华南', '粤港澳及华南'), ('江浙沪及华东', '江浙沪及华东'), ('华北', '华北'), ('东北', '东北'), ('西北', '西北'), ('西南', '西南')], max_length=43, verbose_name='项目所在区域'),
        ),
    ]
