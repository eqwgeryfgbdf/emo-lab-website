from django.db import models
from django.utils import timezone


class TeamMember(models.Model):
    """團隊成員模型"""
    name = models.CharField(max_length=100, verbose_name="姓名")
    role = models.CharField(max_length=100, verbose_name="職位")
    description = models.TextField(verbose_name="簡介")
    photo = models.ImageField(upload_to='team/', blank=True, null=True, verbose_name="照片")
    order = models.IntegerField(default=0, verbose_name="顯示順序")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新時間")

    class Meta:
        verbose_name = "團隊成員"
        verbose_name_plural = "團隊成員"
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} - {self.role}"


class Achievement(models.Model):
    """競賽/論文成果模型"""
    CATEGORY_CHOICES = [
        ('competition', '競賽'),
        ('paper', '論文發表'),
        ('award', '論文獲獎'),
    ]
    
    category = models.CharField(
        max_length=20, 
        choices=CATEGORY_CHOICES, 
        verbose_name="類別"
    )
    event_name = models.CharField(max_length=200, verbose_name="活動名稱")
    work_title = models.CharField(max_length=300, verbose_name="作品/論文標題")
    award = models.CharField(max_length=100, verbose_name="獲獎/名次")
    event_date = models.DateField(verbose_name="活動日期")
    certificate_image = models.ImageField(
        upload_to='certificates/', 
        blank=True, 
        null=True, 
        verbose_name="證書圖片"
    )
    description = models.TextField(blank=True, verbose_name="詳細描述")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新時間")

    class Meta:
        verbose_name = "成果記錄"
        verbose_name_plural = "成果記錄"
        ordering = ['-event_date', 'category']

    def __str__(self):
        return f"{self.event_name} - {self.work_title}"


class News(models.Model):
    """最新消息模型"""
    title = models.CharField(max_length=200, verbose_name="標題")
    date = models.DateField(verbose_name="日期")
    content = models.TextField(blank=True, verbose_name="內容")
    is_published = models.BooleanField(default=True, verbose_name="是否發布")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新時間")

    class Meta:
        verbose_name = "最新消息"
        verbose_name_plural = "最新消息"
        ordering = ['-date', '-created_at']

    def __str__(self):
        return self.title


class Partner(models.Model):
    """合作夥伴模型"""
    TYPE_CHOICES = [
        ('university', '大學院校'),
        ('school', '中小學'),
        ('company', '企業'),
    ]
    
    name = models.CharField(max_length=200, verbose_name="夥伴名稱")
    partner_type = models.CharField(
        max_length=20, 
        choices=TYPE_CHOICES, 
        verbose_name="夥伴類型"
    )
    description = models.TextField(blank=True, verbose_name="描述")
    website_url = models.URLField(blank=True, verbose_name="官方網站")
    logo = models.ImageField(upload_to='partners/', blank=True, null=True, verbose_name="Logo")
    order = models.IntegerField(default=0, verbose_name="顯示順序")
    is_active = models.BooleanField(default=True, verbose_name="是否啟用")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新時間")

    class Meta:
        verbose_name = "合作夥伴"
        verbose_name_plural = "合作夥伴"
        ordering = ['partner_type', 'order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_partner_type_display()})"


class LabInfo(models.Model):
    """實驗室基本資訊模型"""
    name = models.CharField(max_length=100, verbose_name="實驗室名稱")
    full_name = models.CharField(max_length=200, verbose_name="完整名稱")
    founded_date = models.DateField(verbose_name="成立日期")
    slogan = models.CharField(max_length=300, verbose_name="標語")
    mission = models.TextField(verbose_name="使命")
    email = models.EmailField(verbose_name="聯絡信箱")
    github_url = models.URLField(blank=True, verbose_name="GitHub組織")
    website_url = models.URLField(blank=True, verbose_name="官方網站")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新時間")

    class Meta:
        verbose_name = "實驗室資訊"
        verbose_name_plural = "實驗室資訊"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # 確保只有一個實驗室資訊記錄
        if not self.pk and LabInfo.objects.exists():
            # 如果已經有記錄，更新現有記錄而不是創建新的
            existing = LabInfo.objects.first()
            existing.name = self.name
            existing.full_name = self.full_name
            existing.founded_date = self.founded_date
            existing.slogan = self.slogan
            existing.mission = self.mission
            existing.email = self.email
            existing.github_url = self.github_url
            existing.website_url = self.website_url
            existing.save()
            return existing
        return super().save(*args, **kwargs)