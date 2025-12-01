# EMO Lab 官方網站

## 專案簡介

EMO Lab 官方網站是一個現代化的靜態網站，用於展示 EMO Lab（Eternal Matrix of Omniscience Laboratory）的團隊資訊、研究成果、合作夥伴等內容。

## 功能特色

- 🎨 現代科技感設計風格
- 📱 完全響應式設計（支援桌面、平板、手機）
- ⚡ 快速載入的靜態網站
- 🎭 豐富的動畫效果
- 📊 動態資料載入與展示
- 🔍 成果篩選與搜尋功能
- 📧 聯絡表單功能

## 網站結構

```
/
├── index.html              # 首頁
├── about.html              # 關於我們
├── team.html               # 團隊成員
├── achievements.html       # 研究成果
├── partners.html           # 合作夥伴
├── contact.html            # 聯絡我們
├── css/                    # 樣式檔案
│   ├── main.css           # 主要樣式
│   ├── responsive.css     # 響應式設計
│   └── animations.css     # 動畫效果
├── js/                     # JavaScript 檔案
│   ├── main.js            # 主要功能
│   ├── dataLoader.js      # 資料載入器
│   └── animations.js      # 動畫控制器
├── data/                   # 資料檔案
│   ├── site-data.json     # 網站資料
│   └── achievements.json  # 成果資料
├── images/                 # 圖片資源
├── docs/                   # 文件資料
│   ├── naming-conventions.json # 命名規範
│   └── PERFORMANCE_OPTIMIZATION.md # 效能優化報告
└── tests/                  # 測試檔案
    └── test.html          # 測試頁面
```

## 技術規格

- **HTML5**: 語義化標籤，無障礙設計
- **CSS3**: 現代CSS特性，CSS變數，Flexbox/Grid佈局
- **JavaScript ES6+**: 模組化設計，現代語法
- **響應式設計**: 支援各種螢幕尺寸
- **無障礙設計**: 符合WCAG標準

## 瀏覽器支援

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 快速開始

1. **下載專案**
   ```bash
   git clone [repository-url]
   cd emo-lab-website
   ```

2. **開啟網站**
   - 直接開啟 `index.html` 檔案
   - 或使用本地伺服器：
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx serve .
   ```

3. **訪問網站**
   - 開啟瀏覽器前往 `http://localhost:8000`

## 自訂設定

### 修改資料

1. **網站基本資訊**: 編輯 `data/site-data.json`
2. **成果資料**: 編輯 `data/achievements.json`
3. **圖片資源**: 將圖片放入 `images/` 資料夾

### 修改樣式

1. **色彩主題**: 修改 `css/main.css` 中的 CSS 變數
2. **字型設定**: 更新 Google Fonts 連結
3. **動畫效果**: 調整 `css/animations.css`

### 修改功能

1. **新增頁面**: 參考現有頁面結構
2. **修改導航**: 更新所有頁面的導航選單
3. **新增功能**: 在 `js/main.js` 中擴展功能

## 命名規範

詳細的命名規範請參考 `docs/naming-conventions.json` 檔案，包含：

- 檔案命名規則
- CSS 類別命名（BEM方法論）
- JavaScript 函數/變數命名
- 圖片資源命名標準

## 部署指南

### GitHub Pages

1. 將程式碼推送到 GitHub 倉庫
2. 在倉庫設定中啟用 GitHub Pages
3. 選擇來源分支（通常是 main）
4. 網站將自動部署到 `https://username.github.io/repository-name`

### 其他靜態網站託管

- **Netlify**: 拖拽資料夾或連接 Git 倉庫
- **Vercel**: 連接 Git 倉庫自動部署
- **Firebase Hosting**: 使用 Firebase CLI 部署

## 維護指南

### 定期更新

1. **檢查連結**: 確保所有外部連結正常
2. **更新資料**: 定期更新成果和新聞
3. **測試功能**: 確保所有功能正常運作
4. **優化效能**: 壓縮圖片，優化載入速度

### 備份建議

1. 定期備份整個專案資料夾
2. 使用 Git 版本控制
3. 備份重要的圖片和資料檔案

## 故障排除

### 常見問題

1. **圖片無法顯示**
   - 檢查圖片路徑是否正確
   - 確認圖片檔案存在

2. **動畫效果不工作**
   - 檢查瀏覽器是否支援 CSS 動畫
   - 確認 JavaScript 檔案正確載入

3. **響應式設計問題**
   - 檢查 CSS 媒體查詢
   - 測試不同螢幕尺寸

### 除錯工具

- 使用瀏覽器開發者工具
- 檢查控制台錯誤訊息
- 使用網路面板檢查資源載入

## 貢獻指南

1. Fork 專案
2. 建立功能分支
3. 提交變更
4. 發起 Pull Request

## 授權

本專案採用 MIT 授權條款。

## 聯絡資訊

- **Email**: emolab0831@gmail.com
- **GitHub**: https://github.com/EMO-Labs
- **官方網站**: https://sites.google.com/view/emo-lab

---

© 2024 EMO Lab. All rights reserved.
