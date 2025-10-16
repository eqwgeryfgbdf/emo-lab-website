# EMO Lab 網站測試清單

## Phase 1: 核心功能測試

### 1.1 基礎設定
- [x] consts.ts 包含雙語常數（部分完成 - 缺少中英分離）
- [x] astro.config.mjs 域名正確（https://emelab.org）
- [x] package.json 更新

### 1.2 雙語路由
- [x] / 顯示英文
- [x] /zh/ 顯示中文
- [x] 語言切換器運作
- [x] 所有主要頁面有雙語版本

### 1.3 Header 導航
- [x] Logo 連結正確
- [x] 所有導航項目運作
- [x] 語言切換器顯示
- [ ] 響應式選單（手機版）
- [x] Active 狀態正確

### 1.4 Footer 元件
- [ ] EMO Labs 版權資訊（仍為 "Your name here"）
- [ ] 聯絡信箱正確
- [ ] GitHub 連結正確
- [ ] 移除 Astro 連結

### 1.5 Content Collections
- [x] blog collection schema 正確
- [x] authors collection 運作
- [x] astro check 無錯誤（有 2 個類型錯誤需修復）

### 1.6 部落格功能
- [x] 文章列表顯示
- [x] 文章內容渲染
- [x] Tags 分類運作
- [x] Categories 分類運作
- [x] 作者頁面運作

### 1.7 搜尋功能
- [x] 搜尋頁面顯示
- [x] 搜尋結果正確
- [x] 中英文搜尋支援

### 1.8 響應式設計
- [ ] 手機版 (375px) - 待測試
- [ ] 平板版 (768px) - 待測試
- [ ] 桌面版 (1440px) - 待測試

### 1.9 建置與部署
- [x] npm run build 成功
- [x] npm run preview 運作
- [x] npm run deploy 可執行

### 1.10 SEO 與 Meta
- [x] 每頁 title 正確
- [x] Meta description 存在
- [x] Sitemap 生成
- [x] RSS Feed 正常

## Phase 2: 缺失功能檢測

### 2.1 首頁設計
- [ ] Hero Section
- [ ] 研究領域展示
- [ ] 最新研究 Highlight
- [ ] 合作機構展示
- [ ] CTA 按鈕

### 2.2 研究成果系統
- [ ] Blog → Research 重構（若需要）
- [ ] 學術欄位添加

### 2.3 團隊頁面
- [ ] /team 頁面
- [ ] Team collection
- [ ] TeamMember 元件

### 2.4 About 頁面
- [ ] 實驗室簡介
- [ ] 研究方向
- [ ] 合作機構
- [ ] 聯絡與招生資訊

### 2.5 設計系統
- [ ] 配色變數更新
- [ ] 新 UI 元件
- [ ] 動畫效果

### 2.6 內容清理
- [ ] 刪除範例文章
- [ ] 更新圖片
- [ ] 移除 Astro 品牌

## Phase 3: 圖片資源管理

### 3.1 圖片資源盤點
- [x] 團隊與活動照片：5 張
- [x] 個人照片：2 張
- [x] 研討會資料：4 張
- [x] 競賽證明文件：20+ 張
- [x] 成就資料庫：Competition.csv（16 項記錄）

### 3.2 圖片使用規劃
- [ ] 首頁 Hero Section：台北-團隊照.jpeg
- [ ] About 頁面：E化專題-團體照1.jpeg
- [ ] Team 頁面：捷運盃黑客松-合照1.jpeg
- [ ] Research 頁面：研討會證明文件

### 3.3 圖片優化
- [ ] 檢查圖片大小（台北-團隊照.jpeg 3.1M 需優化）
- [ ] 將圖片移至 public/images/ 分類
- [ ] 添加 WebP 格式版本

### 3.4 競賽資料整合
- [ ] 將 Competition.csv 整合到網站
- [ ] 建立成就展示區
- [ ] 動態生成成就列表

## 測試結果總結

### ✅ 已完成（約 60%）
- 核心架構：雙語、路由、content collections
- 建置與部署：成功
- SEO 基礎：sitemap、RSS 正常
- 圖片資源：已盤點，待整合

### ⚠️ 需要修復
- Footer 資訊更新
- 類型錯誤修復（2 個）
- 響應式設計測試

### ❌ 待實作
- 首頁重設計
- 團隊頁面
- About 頁面內容
- 圖片整合使用
