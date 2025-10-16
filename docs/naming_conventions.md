# EMOLabs 網站命名規範

## 概述
本文件定義了EMOLabs網站專案中所有程式碼、檔案、變數的命名規範，確保代碼風格統一且易於維護。

## Python 相關命名

### 模組/檔案名稱
- **格式**: `snake_case`
- **範例**: `team_member.py`, `achievement_view.py`, `data_import.py`
- **說明**: 使用小寫字母和下劃線分隔單詞

### 類別名稱
- **格式**: `PascalCase`
- **範例**: `TeamMember`, `AchievementModel`, `NewsAdmin`
- **說明**: 每個單詞首字母大寫，不使用分隔符

### 函數/方法名稱
- **格式**: `snake_case`
- **範例**: `get_team_members()`, `display_achievements()`, `import_competition_data()`
- **說明**: 使用小寫字母和下劃線，動詞開頭

### 變數名稱
- **格式**: `snake_case`
- **範例**: `team_data`, `achievement_list`, `latest_news`
- **說明**: 使用小寫字母和下劃線，名詞形式

### 常數名稱
- **格式**: `UPPER_SNAKE_CASE`
- **範例**: `MAX_TEAM_SIZE`, `DEFAULT_ORDER`, `API_BASE_URL`
- **說明**: 全大寫字母和下劃線

## Django 特定命名

### 模型欄位
- **格式**: `snake_case`
- **範例**: `full_name`, `award_date`, `certificate_image`
- **說明**: 資料庫欄位使用小寫和下劃線

### URL 路由
- **格式**: `kebab-case`
- **範例**: `/team-members/`, `/achievements/`, `/contact-us/`
- **說明**: 使用連字符分隔單詞，全小寫

### 模板檔案
- **格式**: `snake_case.html`
- **範例**: `team_member_detail.html`, `achievement_list.html`
- **說明**: 使用下劃線分隔，以.html結尾

### 視圖函數
- **格式**: `snake_case`
- **範例**: `home_view()`, `team_detail_view()`, `achievement_list_view()`
- **說明**: 以_view結尾，使用下劃線分隔

## 前端相關命名

### CSS 類別
- **格式**: `kebab-case`
- **範例**: `.team-card`, `.achievement-list`, `.nav-item`
- **說明**: 使用連字符分隔，全小寫

### JavaScript 變數/函數
- **格式**: `camelCase`
- **範例**: `teamData`, `achievementList`, `loadTeamMembers()`
- **說明**: 首字母小寫，後續單詞首字母大寫

### HTML ID 屬性
- **格式**: `kebab-case`
- **範例**: `team-member-1`, `achievement-card`, `contact-form`
- **說明**: 使用連字符分隔，全小寫

## 檔案組織規範

### 目錄結構
```
emo-lab-website/
├── docs/                    # 文檔目錄
├── emolab_project/         # Django專案設定
├── core/                   # 核心應用
│   ├── models.py          # 資料模型
│   ├── views.py           # 視圖邏輯
│   ├── urls.py            # URL路由
│   ├── admin.py           # 後台管理
│   └── templates/         # 模板目錄
├── static/                # 靜態資源
│   ├── css/              # 樣式檔案
│   ├── js/               # JavaScript檔案
│   └── images/           # 圖片資源
├── media/                 # 用戶上傳內容
└── templates/             # 全域模板
```

### 檔案命名範例
- `core/models.py` - 核心資料模型
- `core/views.py` - 核心視圖邏輯
- `core/admin.py` - 後台管理配置
- `core/management/commands/import_data.py` - 資料導入命令
- `static/css/main.css` - 主要樣式檔案
- `static/js/team.js` - 團隊頁面JavaScript
- `templates/base.html` - 基礎模板

## 資料庫相關

### 表格名稱
- **格式**: `snake_case` (複數形式)
- **範例**: `team_members`, `achievements`, `news_items`
- **說明**: 使用下劃線分隔，通常為複數形式

### 外鍵欄位
- **格式**: `model_name_id`
- **範例**: `team_member_id`, `achievement_id`
- **說明**: 以_id結尾，對應關聯模型名稱

## 版本控制

### Git 分支命名
- **格式**: `type/description`
- **範例**: `feature/team-management`, `fix/achievement-display`, `docs/readme-update`
- **說明**: 類型/描述，使用連字符分隔

### Commit 訊息
- **格式**: `type: description`
- **範例**: `feat: add team member management`, `fix: resolve achievement display issue`
- **類型**: feat, fix, docs, style, refactor, test, chore

## 注意事項

1. **一致性**: 在整個專案中保持命名風格一致
2. **可讀性**: 選擇有意義且易於理解的命名
3. **長度**: 避免過長或過短的命名
4. **特殊字符**: 避免使用特殊字符和空格
5. **保留字**: 避免使用程式語言的保留字

## 更新記錄

- 2025-01-XX: 初始版本建立
- 版本: v1.0.0
