from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    # 主要頁面
    path('', views.home_view, name='home'),
    path('team/', views.team_view, name='team'),
    path('achievements/', views.achievements_view, name='achievements'),
    path('partners/', views.partners_view, name='partners'),
    path('contact/', views.contact_view, name='contact'),
    
    # 詳細頁面
    path('achievements/<int:achievement_id>/', views.achievement_detail_view, name='achievement_detail'),
    path('news/', views.news_list_view, name='news_list'),
    path('news/<int:news_id>/', views.news_detail_view, name='news_detail'),
    
    # API 端點
    path('api/achievements/', views.api_achievements_json, name='api_achievements'),
    path('api/team-members/', views.api_team_members_json, name='api_team_members'),
]
