from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
import csv
import os
from core.models import Achievement


class Command(BaseCommand):
    help = '從 Competition.csv 導入競賽資料'

    def handle(self, *args, **options):
        # 讀取 CSV 檔案
        csv_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), 'images', 'Competition.csv')
        
        try:
            with open(csv_file_path, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                achievements = list(reader)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR('找不到 Competition.csv 檔案'))
            return

        # 導入競賽資料
        self.import_achievements(achievements)
        
        self.stdout.write(self.style.SUCCESS('成功導入競賽資料'))

    def import_achievements(self, achievements_data):
        """導入競賽成果"""
        for achievement_data in achievements_data:
            # 跳過空行
            if not achievement_data.get('類型') or not achievement_data.get('競賽名稱'):
                continue
                
            # 映射類別
            category_mapping = {
                '競賽': 'competition',
                '論文發表': 'paper',
                '論文獲獎': 'award',
            }
            
            category = category_mapping.get(achievement_data.get('類型', ''), 'competition')
            
            # 解析日期
            event_date_str = achievement_data.get('時間', '2024-01-01')
            try:
                # 處理不同的日期格式
                if '年' in event_date_str and '月' in event_date_str and '日' in event_date_str:
                    # 處理 "2025年12月7日" 格式
                    import re
                    date_match = re.search(r'(\d{4})年(\d{1,2})月(\d{1,2})日', event_date_str)
                    if date_match:
                        year, month, day = date_match.groups()
                        event_date = f"{year}-{month.zfill(2)}-{day.zfill(2)}"
                    else:
                        event_date = '2024-01-01'
                else:
                    event_date = event_date_str
                    
                parsed_date = parse_date(event_date)
                if not parsed_date:
                    parsed_date = parse_date('2024-01-01')
            except:
                parsed_date = parse_date('2024-01-01')
            
            achievement, created = Achievement.objects.get_or_create(
                event_name=achievement_data.get('競賽名稱', ''),
                work_title=achievement_data.get('作品名稱', ''),
                defaults={
                    'category': category,
                    'award': achievement_data.get('名次/獲得獎項', ''),
                    'event_date': parsed_date,
                    'description': f"類別: {achievement_data.get('類型', '')}",
                }
            )
            
            if created:
                self.stdout.write(f'創建成果記錄: {achievement.event_name} - {achievement.work_title}')
            else:
                self.stdout.write(f'更新成果記錄: {achievement.event_name} - {achievement.work_title}')
