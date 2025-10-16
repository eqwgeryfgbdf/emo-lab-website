from django.shortcuts import render
from django.http import JsonResponse
from .models import TeamMember, Achievement, News, Partner, LabInfo


def home_view(request):
    """首頁：實驗室介紹、slogan、最新消息"""
    try:
        lab_info = LabInfo.objects.first()
    except LabInfo.DoesNotExist:
        lab_info = None
    
    latest_news = News.objects.filter(is_published=True).order_by('-date')[:5]
    
    context = {
        'lab_info': lab_info,
        'news': latest_news,
    }
    return render(request, 'core/home.html', context)


def team_view(request):
    """團隊介紹頁面"""
    members = TeamMember.objects.all().order_by('order', 'name')
    
    context = {
        'members': members,
    }
    return render(request, 'core/team.html', context)


def achievements_view(request):
    """成果展示頁面：競賽、論文、獲獎"""
    # 獲取所有成果，按日期倒序排列
    achievements = Achievement.objects.all().order_by('-event_date')
    
    # 按類別分組
    competitions = achievements.filter(category='competition')
    papers = achievements.filter(category='paper')
    awards = achievements.filter(category='award')
    
    context = {
        'achievements': achievements,
        'competitions': competitions,
        'papers': papers,
        'awards': awards,
    }
    return render(request, 'core/achievements.html', context)


def partners_view(request):
    """合作夥伴頁面"""
    # 按類型分組獲取夥伴
    universities = Partner.objects.filter(partner_type='university', is_active=True).order_by('name')
    schools = Partner.objects.filter(partner_type='school', is_active=True).order_by('name')
    companies = Partner.objects.filter(partner_type='company', is_active=True).order_by('name')
    
    context = {
        'universities': universities,
        'schools': schools,
        'companies': companies,
    }
    return render(request, 'core/partners.html', context)


def contact_view(request):
    """聯絡頁面"""
    try:
        lab_info = LabInfo.objects.first()
    except LabInfo.DoesNotExist:
        lab_info = None
    
    context = {
        'lab_info': lab_info,
    }
    return render(request, 'core/contact.html', context)


def achievement_detail_view(request, achievement_id):
    """成果詳細頁面"""
    try:
        achievement = Achievement.objects.get(id=achievement_id)
    except Achievement.DoesNotExist:
        # 如果找不到成果，返回404頁面
        from django.http import Http404
        raise Http404("成果不存在")
    
    context = {
        'achievement': achievement,
    }
    return render(request, 'core/achievement_detail.html', context)


def news_list_view(request):
    """最新消息列表頁面"""
    news_list = News.objects.filter(is_published=True).order_by('-date')
    
    context = {
        'news_list': news_list,
    }
    return render(request, 'core/news_list.html', context)


def news_detail_view(request, news_id):
    """消息詳細頁面"""
    try:
        news = News.objects.get(id=news_id, is_published=True)
    except News.DoesNotExist:
        from django.http import Http404
        raise Http404("消息不存在")
    
    context = {
        'news': news,
    }
    return render(request, 'core/news_detail.html', context)


# API 視圖（用於AJAX請求）
def api_achievements_json(request):
    """API: 返回成果資料的JSON格式"""
    achievements = Achievement.objects.all().order_by('-event_date')
    
    data = []
    for achievement in achievements:
        data.append({
            'id': achievement.id,
            'category': achievement.get_category_display(),
            'event_name': achievement.event_name,
            'work_title': achievement.work_title,
            'award': achievement.award,
            'event_date': achievement.event_date.strftime('%Y-%m-%d'),
            'description': achievement.description,
        })
    
    return JsonResponse({'achievements': data})


def api_team_members_json(request):
    """API: 返回團隊成員資料的JSON格式"""
    members = TeamMember.objects.all().order_by('order', 'name')
    
    data = []
    for member in members:
        data.append({
            'id': member.id,
            'name': member.name,
            'role': member.role,
            'description': member.description,
            'order': member.order,
        })
    
    return JsonResponse({'members': data})