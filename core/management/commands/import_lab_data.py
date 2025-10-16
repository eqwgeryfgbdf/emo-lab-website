from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
import json
import os
from core.models import LabInfo, TeamMember, News, Partner, Achievement


class Command(BaseCommand):
    help = '從 emolabs-website.json 導入實驗室基本資料'

    def handle(self, *args, **options):
        # 讀取 JSON 檔案
        json_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), 'emolabs-website.json')
        
        try:
            with open(json_file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR('找不到 emolabs-website.json 檔案'))
            return

        lab_data = data.get('lab', {})
        
        # 導入實驗室基本資訊
        self.import_lab_info(lab_data)
        
        # 導入團隊成員
        self.import_team_members(lab_data.get('team', []))
        
        # 導入最新消息
        self.import_news(lab_data.get('news', []))
        
        # 導入合作夥伴
        self.import_partners(lab_data.get('partners', {}))
        
        self.stdout.write(self.style.SUCCESS('成功導入實驗室資料'))

    def import_lab_info(self, lab_data):
        """導入實驗室基本資訊"""
        lab_info, created = LabInfo.objects.get_or_create(
            name=lab_data.get('name', 'EMO Lab'),
            defaults={
                'full_name': lab_data.get('fullName', 'Eternal Matrix of Omniscience Laboratory'),
                'founded_date': parse_date(lab_data.get('founded', '2024-08-31')),
                'slogan': lab_data.get('slogan', ''),
                'mission': lab_data.get('mission', ''),
                'email': lab_data.get('contact', {}).get('email', 'emolab0831@gmail.com'),
                'github_url': 'https://github.com/EMO-Labs',
                'website_url': 'https://sites.google.com/view/emo-lab',
            }
        )
        
        if created:
            self.stdout.write(f'創建實驗室資訊: {lab_info.name}')
        else:
            self.stdout.write(f'更新實驗室資訊: {lab_info.name}')

    def import_team_members(self, team_data):
        """導入團隊成員"""
        for i, member_data in enumerate(team_data):
            member, created = TeamMember.objects.get_or_create(
                name=member_data.get('name', ''),
                defaults={
                    'role': member_data.get('role', ''),
                    'description': member_data.get('description', ''),
                    'order': i,
                }
            )
            
            if created:
                self.stdout.write(f'創建團隊成員: {member.name}')
            else:
                self.stdout.write(f'更新團隊成員: {member.name}')

    def import_news(self, news_data):
        """導入最新消息"""
        for news_item in news_data:
            news, created = News.objects.get_or_create(
                title=news_item.get('title', ''),
                date=parse_date(news_item.get('date', '2024-01-01')),
                defaults={
                    'content': '',
                    'is_published': True,
                }
            )
            
            if created:
                self.stdout.write(f'創建消息: {news.title}')
            else:
                self.stdout.write(f'更新消息: {news.title}')

    def import_partners(self, partners_data):
        """導入合作夥伴"""
        # 導入大學院校
        for university in partners_data.get('universities', []):
            partner, created = Partner.objects.get_or_create(
                name=university,
                defaults={
                    'partner_type': 'university',
                    'is_active': True,
                }
            )
            
            if created:
                self.stdout.write(f'創建大學夥伴: {partner.name}')
        
        # 導入中小學
        for school in partners_data.get('schools', []):
            partner, created = Partner.objects.get_or_create(
                name=school,
                defaults={
                    'partner_type': 'school',
                    'is_active': True,
                }
            )
            
            if created:
                self.stdout.write(f'創建學校夥伴: {partner.name}')
        
        # 導入企業
        for company in partners_data.get('companies', []):
            partner, created = Partner.objects.get_or_create(
                name=company,
                defaults={
                    'partner_type': 'company',
                    'is_active': True,
                }
            )
            
            if created:
                self.stdout.write(f'創建企業夥伴: {partner.name}')
