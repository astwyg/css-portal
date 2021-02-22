import datetime
from django.db import models
from users.models import Users
from multiselectfield import MultiSelectField

def get_default_user():
    return Users.objects.get(id=1)

class Resource(models.Model):
    DOMAIN_CHOICES = (
        ("能源","能源"),
        ("金融","金融"),
        ("交通","交通"),
        ("电信","电信"),
        ("传媒","传媒"),
        ("制造","制造"),
        ("医疗","医疗"),
        ("政务","政务"),
        ("科教","科教"),
        ("其他","其他"),
    )
    BUSINESS_CHOICES = (
        ("应用软件","应用软件"),
        ("操作系统","操作系统"),
        ("大数据","大数据"),
        ("分布式存储","分布式存储"),
        ("数据库","数据库"),
        ("中间件","中间件"),
        ("云平台","云平台"),
        ("虚拟化","虚拟化"),
        ("高性能计算","高性能计算"),
        ("ARM原生","ARM原生"),
        ("AI","AI"),
        ("其他","其他")
    )
    REGION_CHOICES = (
        ("全球","全球"),
        ("中日韩东南亚","中日韩东南亚"),
        ("欧美地区","欧美地区"),
        ("全国","全国"),
        ("粤港澳及华南","粤港澳及华南"),
        ("江浙沪及华东","江浙沪及华东"),
        ("华北","华北"),
        ("东北","东北"),
        ("西北","西北"),
        ("西南","西南"),
    )
    MACHINE_CHOICES = (
        ("虚拟机","虚拟机"),
        ("物理机","物理机"),
        ("终端","终端"),
    )
    STATUS_CHOICES = (
        ("等待审批","等待审批"),
        ("已开通","已开通"),
        ("已回收","已回收"),
    )

    project_name = models.CharField("项目名称", max_length=255)
    project_description = models.CharField("项目简介", max_length=1000)
    user = models.ForeignKey(Users, on_delete=get_default_user)
    domain = MultiSelectField("领域", choices=DOMAIN_CHOICES)
    business = MultiSelectField("业务范围", choices=BUSINESS_CHOICES)
    region = MultiSelectField("项目所在区域", choices=REGION_CHOICES)
    location = models.CharField("项目所在地", max_length=1000)
    machine_type = models.CharField("资源类型", max_length=10, choices=MACHINE_CHOICES)
    machine_number = models.IntegerField("资源数量")
    machine_config = models.CharField("硬件配置", max_length=255)
    machine_env = models.CharField("软件要求", max_length=255)
    remark = models.CharField("备注", max_length=255)
    start_time = models.DateField("开始日期", default=datetime.date.today)
    end_time = models.DateField("结束日期")
    status = models.CharField("资源状态", choices=STATUS_CHOICES, max_length=20)
    admin = models.ForeignKey(Users, on_delete=get_default_user, related_name="admin")
    admin_note = models.CharField("管理员备注", max_length=1000, blank=True, null=True)

    def __str__(self):
        return str(self.project_name)


