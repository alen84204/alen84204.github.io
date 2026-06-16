# 汎馬商辦中心官網 — Codex 交接文件

> 本文件讓任何 AI 助手（Codex / Claude / Cursor 等）無需對話記憶即可直接接手繼續開發。
> 最後更新：2026-06-15

---

## 一、專案概要

**業主**：余文魁（AlenYu），公司：汎馬整合行銷有限公司（統編 83695998）
**商辦位置**：台北市大安區光復南路102號8樓（光復大樓）— 台北大巨蛋正對面、捷運國父紀念館站步行3分鐘
**公司登記地址**：新北市淡水區新市三路一段68號10樓（法律登記處，非商辦實際位置，兩者不同）

**品牌名稱**：汎馬商辦中心（連鎖品牌，首站「大安光復館」；未來有中山館等計畫）

**商業目標**：
- 2個月內：借址登記客戶衝至40戶（核心獲利；目標80戶 × $2,500 = 月淨利20萬）
- 2個月內：實體辦公室從9間 → 15間以上出租
- 長期：50篇SEO文章建立流量護城河

**技術棧**：純靜態 HTML + CSS + Vanilla JS，無建置工具，直接開 index.html 即可預覽。

**線上網址**：https://alen84204.github.io/
**GitHub repo**：https://github.com/alen84204/alen84204.github.io
**GitHub 帳號**：alen84204（已登入，可用 `gh` CLI 操作）

---

## 二、檔案結構

```
index.html              首頁（主打主標＋價格錨點＋FAQ＋預約表單）
offices.html            獨立辦公室方案頁
registration.html       公司登記/借址登記方案頁
meeting-rooms.html      會議室/共享空間頁
about.html              關於我們＋交通位置
contact.html            聯絡頁
blog/index.html         專欄列表頁（注意：選單寫「專欄」不寫「部落格」）
blog/*.html             各 SEO 文章（見下方清單）
css/style.css           全站樣式（行動版優先）
js/site-config.js       ★ 全站聯絡資料設定（改這裡自動全站生效）
js/main.js              共用互動（config注入、行動選單、表單、語言鈕）
images/                 圖片目錄（目前多為 Unsplash 佔位圖）
sitemap.xml             SEO sitemap
.gitignore              排除：CLAUDE.md, content-plan.md, placeholders-todo.md, .claude/
```

---

## 三、聯絡資料（全部已確認，勿自行更改）

所有資料集中在 `js/site-config.js`，在 HTML 用 `data-config` 屬性注入，不要在各頁硬寫。

| 欄位 | 值 |
|------|----|
| 品牌名 | 汎馬商辦中心 |
| 據點名 | 大安光復館 |
| 公司名 | 汎馬整合行銷有限公司 |
| 統一編號 | 83695998 |
| 負責人 | 余文魁（AlenYu） |
| 電話（顯示） | 0963-666-859 |
| 電話（tel:） | +886963666859 |
| LINE ID | @137ffcjz |
| LINE 加好友 | https://lin.ee/N1t32aK |
| Email | alengj5566@gmail.com |
| 商辦地址 | 台北市大安區光復南路102號8樓（光復大樓） |
| 公司登記地址 | 新北市淡水區新市三路一段68號10樓 |
| Google Maps 嵌入 | 目前佔位：`https://www.google.com/maps?q=台北市大安區光復南路102號&output=embed` |

---

## 四、設計系統（CSS Custom Properties）

```css
:root {
  --navy: #11294b;        /* 主色 — 深藍 */
  --navy-light: #1d3f6e;  /* 主色淺版 */
  --gold: #c9a04e;        /* 強調色 — 金 */
  --gold-dark: #a67f33;
  --line-green: #06c755;  /* LINE 品牌綠 */
  --ink: #222b38;         /* 內文色 */
  --ink-soft: #5a6678;    /* 次要文字 */
  --bg: #ffffff;
  --bg-alt: #f4f6f9;      /* 區塊底色 */
  --border: #e2e7ee;
  --radius: 12px;
  --shadow: 0 6px 24px rgba(17, 41, 75, 0.10);
  --maxw: 1080px;
}
```

響應式斷點：`768px`（tablet）、`1024px`（desktop）。行動版優先。

---

## 五、重要的 data-config 注入模式

HTML 中不要硬寫聯絡資料，改用以下屬性，`main.js` 會自動填入：

```html
<!-- 文字注入 -->
<span data-config="brandName"></span>
<span data-config="companyName"></span>
<span data-config="address"></span>
<span data-config="displayPhone"></span>
<span data-config="taxId"></span>
<span data-config="owner"></span>
<span data-config="regAddress"></span>

<!-- 連結注入（自動加 tel: / mailto: 前綴） -->
<a data-config-href="lineUrl">LINE</a>
<a data-config-href="telPhone">電話</a>
<a data-config-href="email">Email</a>

<!-- iframe 注入 -->
<iframe data-config-src="mapEmbedUrl"></iframe>
```

---

## 六、重要架構規則

### 懸浮按鈕（float-cta）
```html
<div class="float-cta">
  <a class="float-line" data-config-href="lineUrl" target="_blank" rel="noopener">💬 LINE 詢問</a>
  <a class="float-tel" data-config-href="telPhone">📞 一鍵撥打</a>
</div>
```
- `.float-tel`（電話鈕）：**手機顯示、電腦隱藏**
- CSS 規則：`.float-cta .float-tel { display: none }` 在 `@media (min-width: 768px)` 內
- **重要**：一定要寫 `.float-cta .float-tel`（高特異性），不能只寫 `.float-tel`，否則被 `.float-cta a` 蓋過去

### 語言切換鈕
- Header 右側有 `<button class="lang-toggle">中｜EN</button>`
- 目前點擊只會 `alert("該功能並未實裝，有需要再開發\nby 文魁")` — 無實際功能
- 未來要做：前端 JS 切換 data-i18n 文字，不重整頁面

### 選單名稱
- 導覽列：獨立辦公室 / 公司登記 / 會議室／共享空間 / **專欄** / 關於我們 / 聯絡我們
- 注意第4項是「專欄」（不是「部落格」，已改名）

---

## 七、已發布的 SEO 文章

| 代號 | 檔案 | 主題 | 發布日期 |
|------|------|------|---------|
| A1 | blog/address-registration-guide.html | 借址登記是什麼？費用、流程、合法性 | 2026-06-13 |
| A2 | blog/rejected-by-tax-office.html | 借址登記被國稅局拒絕的5個原因 | 2026-06-13 |
| A3 | blog/how-to-choose-address.html | 公司登記地址怎麼選？商務中心 vs 自宅 vs 親友住址 | 2026-06-13 |
| A4 | blog/daan-district-guide.html | 大安區/信義區公司登記指南 | 2026-06-13 |
| A5 | blog/branch-office-setup.html | 分公司設立流程與登記地址需求 | 2026-06-13 |
| E1 | blog/taipei-business-center-price-2026.html | 台北商務中心租金行情 2026 | 2026-06-14 |
| E2 | blog/sun-yat-sen-station-office.html | 國父紀念館站辦公室出租選擇 | 2026-06-13 |

**尚未寫的文章**（優先序）：
- A6–A12：借址登記延伸主題（各行業適用性、設立流程圖解、信件代收 SOP、免稅自宅 vs 商辦地址比較…）
- B群（12篇）：開公司訣竅（資本額、負責人、章程、印章…）
- C群（8篇）：稅務/記帳
- D群（10篇）：商辦秘密
- E3–E8：在地長尾字（信義區、市政府站、東區…）

---

## 八、文章寫作規格

每篇文章必須包含以下結構（參考已有文章）：

1. `<head>`：Article schema + FAQPage schema（最少3條 Q&A）
2. `<div class="summary-box">`：本文重點（30秒快速了解）
3. `<nav class="toc">`：文章目錄（ol+a 錨點）
4. 內文各節（`<h2 id="...">`）
5. `.price-table-wrap > table.price-table`：費用表（一定要有）
6. `.faq-list > details.faq-item`：FAQ 摺疊區（至少3條）
7. `.article-cta`：文末 CTA（LINE + 預約參觀）
8. `<footer>` + `.float-cta`：標準 footer 和懸浮鈕

**SEO 規格**：
- `<title>` 含主關鍵字＋品牌名（汎馬商辦中心），不超過 70 字元
- `<meta name="description">` 120–160 字元
- `og:title` / `og:description` / `og:type: article`
- `<link rel="stylesheet" href="../css/style.css">` — 注意路徑 `../`
- `<script src="../js/site-config.js"></script>` 和 `<script src="../js/main.js"></script>` 放在 `</body>` 前

---

## 九、待替換的佔位內容（⚠️ 正式上線前必須處理）

詳細清單見本機 `placeholders-todo.md`（已加入 .gitignore，不在 git 中）：

| 項目 | 位置 | 說明 |
|------|------|------|
| 首頁相簿 6 張圖 | index.html #gallery | 目前為 Unsplash 示意圖，需換成實拍照 |
| LINE QR Code 圖 | contact.html .qr-box | 目前文字佔位 |
| 客戶見證 3 則 | index.html #testimonials | ⚠️ 目前為範例見證，非真實客戶，已標「示意」 |
| 進駐 logo 牆 4 格 | index.html .logo-strip | ⚠️ 目前文字卡非真實 logo，已標「示意」 |
| Google 商家 URL | js/site-config.js googleBusinessUrl | 目前佔位，待商家帳號確認 |
| Google Maps 嵌入 | js/site-config.js mapEmbedUrl | 待換商家後台專屬 iframe 碼 |
| 21間房型定價表 | offices.html | 業主尚未提供（坪數/定價/空房狀態） |
| 公司登記最終定價 | registration.html | 待業主確認定價 |
| 語言切換功能 | js/main.js, 所有 .html | 目前點擊只顯示 alert，待實作英文版 |

---

## 十、推薦的下一步任務（按優先序）

1. **繼續寫 SEO 文章** — ⭐ 照 [WRITING-GUIDE.md](WRITING-GUIDE.md) 一步步做（含完整 HTML 範本與配圖清單）。選題從 competitor-titles.md Part 2 勾選或標 🔥 的開始。
2. **部落格列表頁更新** — 每新增文章後，要把連結加進 `blog/index.html`
3. **辦公室頁面補完** — 等業主提供21間房的坪數/定價/照片後更新 `offices.html`
4. **Google 商家確認後** — 更新 site-config.js 的 googleBusinessUrl 和 mapEmbedUrl
5. **正式網域** — 購買 .com.tw 後更新 sitemap.xml 裡的 URL，並設定 Google Search Console

---

## 十一、注意事項（踩過的坑）

| 問題 | 正確做法 |
|------|---------|
| 電話鈕電腦版還看得到 | 用 `.float-cta .float-tel { display:none }` 加高特異性，不能只寫 `.float-tel` |
| GitHub CLI 不在 PATH | 必須用完整路徑：`C:\Program Files\GitHub CLI\gh.exe` |
| 外部圖片在 preview 環境不顯示 | 預覽沙盒封鎖外部 URL，curl 測試確認 HTTP 200 即代表真實瀏覽器可正常載入 |
| blog/ 下的 CSS/JS 路徑 | 一定要用 `../css/style.css`（加 ../），不能用 `css/style.css` |
| 業主法律登記地址 ≠ 商辦地址 | 法律地址：淡水新市三路；商辦地址：大安光復南路102號 — 絕對不能混用 |
| 不收的客群 | 不收：免統發票的小規模行號、進出口貿易商、殯葬/醫療器材製造/補習班/土木包工等特許行業 |

---

## 十二、定價參考（現行方案）

| 方案 | 定價 |
|------|------|
| 獨立辦公室 | NT$8,000–25,000/月（依坪數，共21間） |
| 借址登記 | NT$2,500–3,500/月（不削價：低於$2,000多為國稅局爭議名單） |
| 共享座位 | 待定（參考同區 T3CO 月租 $6,500 起） |
| 會議室 | 時租制，待定 |

**加值服務**：信件代收、電話秘書（待定費率）

---

## 十三、競品參考

- **JustCo「THE COLLECTIVE」**（巨蛋國際中心，正對面）：高端路線，進駐率90%。我方差異：平價＋登記服務
- **T3CO 韻驊**（市府站）：桌位月租 $6,500 起
- **世達商務中心**（多館）：促銷「簽一年送兩個月」— 可參考此促銷結構
- **同棟負評業者**：信件處理糟、爭議多 → 我方主打「信件代收當日通知 SOP」作信任賣點

---

_本文件由 Claude Code 產生。業主：余文魁（AlenYu）。如有技術問題請查閱 CLAUDE.md（本機）或洽 alengj5566@gmail.com。_
