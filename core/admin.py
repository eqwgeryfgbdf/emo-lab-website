from django.contrib import admin
from .models import TeamMember, Achievement, News, Partner, LabInfo


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order', 'created_at')
    list_editable = ('order',)
    list_filter = ('role', 'created_at')
    search_fields = ('name', 'role', 'description')
    ordering = ('order', 'name')
    
    fieldsets = (
        ('基本資訊', {
            'fields': ('name', 'role', 'description')
        }),
        ('照片', {
            'fields': ('photo',)
        }),
        ('顯示設定', {
            'fields': ('order',)
        }),
    )


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'category', 'award', 'event_date', 'created_at')
    list_filter = ('category', 'event_date', 'created_at')
    search_fields = ('event_name', 'work_title', 'award')
    ordering = ('-event_date', 'category')
    date_hierarchy = 'event_date'
    
    fieldsets = (
        ('基本資訊', {
            'fields': ('category', 'event_name', 'work_title', 'award', 'event_date')
        }),
        ('詳細描述', {
            'fields': ('description',)
        }),
        ('證書圖片', {
            'fields': ('certificate_image',)
        }),
    )


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'is_published', 'created_at')
    list_filter = ('is_published', 'date', 'created_at')
    search_fields = ('title', 'content')
    ordering = ('-date', '-created_at')
    date_hierarchy = 'date'
    
    fieldsets = (
        ('基本資訊', {
            'fields': ('title', 'date', 'is_published')
        }),
        ('內容', {
            'fields': ('content',)
        }),
    )


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'partner_type', 'is_active', 'order', 'created_at')
    list_editable = ('is_active', 'order')
    list_filter = ('partner_type', 'is_active', 'created_at')
    search_fields = ('name', 'description')
    ordering = ('partner_type', 'order', 'name')
    
    fieldsets = (
        ('基本資訊', {
            'fields': ('name', 'partner_type', 'description')
        }),
        ('聯絡資訊', {
            'fields': ('website_url',)
        }),
        ('Logo', {
            'fields': ('logo',)
        }),
        ('顯示設定', {
            'fields': ('order', 'is_active')
        }),
    )


@admin.register(LabInfo)
class LabInfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'full_name', 'founded_date', 'email')
    search_fields = ('name', 'full_name', 'email')
    
    fieldsets = (
        ('基本資訊', {
            'fields': ('name', 'full_name', 'founded_date')
        }),
        ('描述', {
            'fields': ('slogan', 'mission')
        }),
        ('聯絡資訊', {
            'fields': ('email', 'github_url', 'website_url')
        }),
    )
    
    def has_add_permission(self, request):
        # 只允許有一個實驗室資訊記錄
        return not LabInfo.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # 不允許刪除實驗室資訊
        return False


# 自定義Admin站點標題
admin.site.site_header = "EMO Lab 管理後台"
admin.site.site_title = "EMO Lab Admin"
admin.site.index_title = "歡迎使用 EMO Lab 管理系統"