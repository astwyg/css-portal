import datetime
from django.db import models
from users.models import Users
from multiselectfield import MultiSelectField
from django.core.validators import MinValueValidator


def get_default_user():
    return Users.objects.get(id=1)


def next_month():
    return datetime.date.today()+datetime.timedelta(days=30)


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
    CPU_CHOICES = (
        ("ft1516", "FT-1500A/16"),
        ("ft2064", "FT-2000+/64"),
        ("s2500", "S2500"),
        ("ft1504", "FT-1500A/4"),
        ("ft2004", "FT-2000/4"),
        ("d2000", "D2000"),
        ("ft2004sec", "FT-2000/4网安版"),
        ("d2000sec", "D2000网安版"),
    )
    STATUS_CHOICES = (
        ("等待审批","等待审批"),
        ("已开通","已开通"),
        ("已回收","已回收"),
    )
    CERT_STATUS_CHOICES = (
        ("适配中","适配中"),
        ("已适配","已适配"),
        ("适配完成","适配完成")
    )

    project_name = models.CharField("项目名称", max_length=255)
    project_description = models.CharField("项目简介", max_length=1000)
    product = models.CharField("产品名称(如不申请互认证证书无需填写)", max_length=1000, blank=True, null=True)
    user = models.ForeignKey(Users, on_delete=get_default_user)
    domain = MultiSelectField("领域", choices=DOMAIN_CHOICES)
    business = MultiSelectField("业务范围", choices=BUSINESS_CHOICES)
    region = MultiSelectField("项目所在区域", choices=REGION_CHOICES)
    location = models.CharField("项目所在地", max_length=1000)
    machine_type = models.CharField("设备类型", max_length=10, choices=MACHINE_CHOICES)
    cpu_type = MultiSelectField("适配CPU", max_length=20, choices=CPU_CHOICES, blank=True, null=True)
    machine_number = models.IntegerField("设备数量(台)", default=1, validators=[MinValueValidator(1)])
    machine_config = models.CharField("硬件配置", max_length=255, default="(4)核, (8)G RAM, (200)G SSD存储.")
    machine_env = models.CharField("软件要求", max_length=255, default="麒麟V10 Server")
    remark = models.TextField("备注", max_length=255)
    start_time = models.DateField("开始日期", default=datetime.date.today)
    end_time = models.DateField("结束日期", default=next_month)
    status = models.CharField("资源状态", choices=STATUS_CHOICES, max_length=20)
    cert_status = models.CharField("适配认证状态", choices=CERT_STATUS_CHOICES, max_length=20, blank=True, null=True)
    cert_file = models.FileField("认证证书", upload_to='cert_file', blank=True, null=True)
    admin = models.ForeignKey(Users, on_delete=get_default_user, related_name="admin", blank=True, null=True)
    admin_note = models.TextField("管理员备注", max_length=1000, blank=True, null=True)

    def __str__(self):
        return str(self.project_name)


