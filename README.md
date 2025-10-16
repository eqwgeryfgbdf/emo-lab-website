# EMO Lab 官方網站

## 專案簡介

EMO Lab (Eternal Matrix of Omniscience Laboratory) 官方網站，展示團隊成員、競賽成果、合作夥伴等資訊。

## 功能特色

- **團隊介紹**: 展示實驗室核心團隊成員資訊
- **競賽成果**: 分類展示競賽獲獎、論文發表、論文獲獎記錄
- **合作夥伴**: 展示合作大學、中小學、企業夥伴
- **最新消息**: 發布實驗室最新動態與消息
- **後台管理**: Django Admin 後台管理系統
- **響應式設計**: 支援手機、平板、桌面等各種裝置

## 技術架構

- **框架**: Django 5.2.7 (MTV架構)
- **資料庫**: SQLite (開發) / PostgreSQL (生產)
- **前端**: Bootstrap 5 + 自定義CSS
- **圖標**: Font Awesome 6.4.0
- **字體**: Noto Sans TC (繁體中文)

## 安裝步驟

### 1. 環境需求

- Python 3.11+
- pip (Python套件管理器)

### 2. 安裝依賴

```bash
pip install -r requirements.txt
```

### 3. 資料庫遷移

```bash
python manage.py migrate
```

### 4. 導入初始資料

```bash
# 導入實驗室基本資料
python manage.py import_lab_data

# 導入競賽資料
python manage.py import_competition_data
```

### 5. 建立管理員帳號

```bash
python manage.py createsuperuser
```

### 6. 啟動開發伺服器

```bash
python manage.py runserver
```

訪問 http://localhost:8000 查看網站

## 專案結構

```
emo-lab-website/
├── docs/                    # 文檔目錄
│   └── naming_conventions.md
├── emolab_project/         # Django專案設定
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── core/                   # 核心應用
│   ├── models.py          # 資料模型
│   ├── views.py           # 視圖邏輯
│   ├── urls.py            # URL路由
│   ├── admin.py           # 後台管理
│   ├── templates/         # 模板目錄
│   └── management/        # 管理命令
├── static/                # 靜態資源
│   ├── css/
│   ├── js/
│   └── images/
├── media/                 # 用戶上傳內容
├── templates/             # 全域模板
├── requirements.txt       # 依賴清單
├── manage.py
└── README.md
```

## 使用說明

### 前台功能

1. **首頁**: 實驗室介紹、最新消息、快速連結
2. **團隊**: 團隊成員資訊展示
3. **成果**: 競賽獲獎、論文發表記錄
4. **合作夥伴**: 合作機構與企業資訊
5. **聯絡我們**: 聯絡方式與實驗室資訊

### 後台管理

訪問 `/admin/` 進入管理後台，可管理：

- 團隊成員資訊
- 競賽成果記錄
- 最新消息發布
- 合作夥伴管理
- 實驗室基本資訊

## 部署說明

### Cloudflare Pages 部署

1. 將程式碼推送到 GitHub
2. 在 Cloudflare Pages 中連接 GitHub 倉庫
3. 設定建置命令：
   ```bash
   pip install -r requirements.txt
   python manage.py collectstatic --noinput
   python manage.py migrate
   ```
4. 設定環境變數（如需要）

### 環境變數

- `SECRET_KEY`: Django 密鑰
- `DEBUG`: 除錯模式 (False for production)
- `DATABASE_URL`: 資料庫連接字串

## 開發指南

### 命名規範

請參考 `docs/naming_conventions.md` 檔案，遵循統一的命名規範。

### 新增功能

1. 在 `core/models.py` 中定義資料模型
2. 在 `core/views.py` 中實作視圖邏輯
3. 在 `core/urls.py` 中配置URL路由
4. 在 `core/templates/core/` 中建立模板檔案
5. 在 `core/admin.py` 中配置後台管理

### 資料導入

使用管理命令導入資料：

```bash
# 導入實驗室資料
python manage.py import_lab_data

# 導入競賽資料
python manage.py import_competition_data
```

## 常見問題

### Q: 如何修改實驗室資訊？

A: 登入管理後台，在「實驗室資訊」中修改相關資料。

### Q: 如何新增團隊成員？

A: 在管理後台的「團隊成員」中新增，記得上傳照片並設定顯示順序。

### Q: 如何發布最新消息？

A: 在管理後台的「最新消息」中新增消息，確保勾選「是否發布」。

## 版本資訊

- v1.0.0 (2025-01-XX): 初始版本發布

## 聯絡資訊

- **Email**: emolab0831@gmail.com
- **GitHub**: https://github.com/EMO-Labs
- **官方網站**: https://sites.google.com/view/emo-lab

## 授權

本專案採用 MIT 授權條款。
