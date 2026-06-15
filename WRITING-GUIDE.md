# 專欄文章撰寫指南（給 Codex / Antigravity 等 AI 接手）

> 這份文件讓「沒有任何對話記憶」的 AI 助手，只靠讀檔就能寫出一篇符合本站規格的新文章並正確掛上網站。
> 先讀 [HANDOVER.md](HANDOVER.md) 了解專案全貌，再看本文照做。
> 最後更新：2026-06-15

---

## 一、開始前先讀這些檔（順序）

1. **HANDOVER.md** — 專案總覽、品牌資料、設計系統、踩過的坑（必讀）
2. **competitor-titles.md**（本機，不在 git）— Part 2 是「可寫標題池」，業主會在上面勾選 ✅ 要寫的題目
3. **content-plan.md**（本機，不在 git）— 50 篇長期藍圖與分群
4. **js/site-config.js** — 所有聯絡資料（不要硬寫，用 data-config 注入）
5. **任一篇現成文章當範本**，例如 `blog/is-address-registration-legal.html`（結構最標準）

## 二、選題規則

- 從 **competitor-titles.md Part 2** 找業主勾選、或標 🔥（高流量）、且標 ⬜（還沒寫）的題目。
- 確認該題還沒寫過：檢查 `blog/` 目錄沒有對應檔案。
- 一次寫一篇，寫完掛好再寫下一篇。

## 三、檔名規則

- 放在 `blog/` 資料夾。
- 檔名用英文 kebab-case，對應主題，例如：
  - 借址登記費用 → `address-registration-fee.html`
  - 一人公司節稅 → `one-person-company-tax.html`
- 不要用中文檔名。

## 四、寫作規則（務必遵守）

1. **語言**：繁體中文、台灣用語。專業、結構化、好讀。
2. **法規／價格保守**：不得寫「保證通過登記」等承諾字眼。法規不確定時加註「建議向會計師確認」。
3. **價格基準**：借址登記 2,500–3,500/月、獨立辦公室 8,000–25,000/月、共享座位 6,000 起、會議室時租。借址不削價（低於 2,000 多為國稅局爭議名單）。
4. **不收客群**（適時帶到，是信任賣點）：免用統一發票小規模行號、進出口貿易商、殯葬／醫療器材製造／補習班／土木包工等特許行業、有欠稅紀錄者。
5. **聯絡資料一律用 data-config 注入**，不要硬寫電話／LINE／地址。
6. **路徑**：blog/ 內的檔案，CSS/JS/圖片一律加 `../`（例：`../css/style.css`）。
7. **每篇必備區塊**：`<head>` 雙 schema → page-hero → summary-box（30秒快速了解）→ hero-figure 配圖 → toc 目錄 → 各 `<h2 id>` 內文 → 至少一個 price-table → faq-list（≥3 條，且要和 head 的 FAQPage schema 對應）→ 自家方案/在地段落 → article-cta → footer → float-cta → 兩支 script。
8. **內鏈**：文中至少連到 1–2 篇相關文章（同 blog/ 內）與 1 個方案頁（../registration.html 或 ../offices.html）。
9. **配圖**：用 Unsplash 免版權商務主題圖（見第六節 ID 清單），alt 寫「…情境示意」，並保留「示意圖、待換實拍」的 HTML 註記。
10. **日期**：datePublished / dateModified / 卡片 card-meta 用當天日期。

## 五、文章 HTML 範本（直接複製，替換 {{ }} 佔位）

```html
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{標題含主關鍵字}}｜汎馬商辦中心</title>
  <meta name="description" content="{{120–160字描述，含主關鍵字}}">
  <meta property="og:title" content="{{社群標題}}">
  <meta property="og:description" content="{{社群描述}}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="zh_TW">
  <link rel="icon" type="image/png" href="../images/favicon.png">
  <link rel="alternate icon" href="../images/favicon.ico">
  <link rel="stylesheet" href="../css/style.css">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{{標題}}",
    "datePublished": "{{YYYY-MM-DD}}",
    "dateModified": "{{YYYY-MM-DD}}",
    "author": { "@type": "Organization", "name": "汎馬商辦中心" },
    "publisher": { "@type": "Organization", "name": "汎馬商辦中心" },
    "inLanguage": "zh-Hant-TW"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "{{問題1}}",
        "acceptedAnswer": { "@type": "Answer", "text": "{{答案1}}" } },
      { "@type": "Question", "name": "{{問題2}}",
        "acceptedAnswer": { "@type": "Answer", "text": "{{答案2}}" } },
      { "@type": "Question", "name": "{{問題3}}",
        "acceptedAnswer": { "@type": "Answer", "text": "{{答案3}}" } }
    ]
  }
  </script>
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="../index.html" class="logo" data-config="brandName">汎馬商辦中心</a>
      <nav class="main-nav" id="mainNav">
        <a href="../offices.html">獨立辦公室</a>
        <a href="../registration.html">公司登記</a>
        <a href="../meeting-rooms.html">會議室／共享空間</a>
        <a href="index.html">專欄</a>
        <a href="../about.html">關於我們</a>
        <a href="../contact.html" class="nav-cta">聯絡我們</a>
      </nav>
      <button class="lang-toggle" type="button" title="English version coming soon">中｜EN</button>
      <button class="menu-toggle" id="menuToggle" aria-label="開啟選單"><span></span><span></span><span></span></button>
    </div>
  </header>

  <section class="page-hero">
    <div class="container">
      <p class="hero-kicker">{{分類，如：公司登記專欄}}</p>
      <h1>{{H1 標題，可用 <br> 斷行}}</h1>
      <p class="hero-sub">{{副標}}｜最後更新：2026年6月</p>
    </div>
  </section>

  <main class="section">
    <div class="container article">
      <div class="summary-box">
        <strong>30 秒快速了解：</strong>{{2–3 句重點，用 <strong> 標關鍵字}}
      </div>

      <!-- 注意：以下為免版權示意圖（Unsplash），非本中心實景，業主實拍到位後替換 src -->
      <figure class="hero-figure">
        <img src="https://images.unsplash.com/photo-{{圖片ID}}?w=1200&q=80&auto=format&fit=crop" alt="{{…情境示意}}" loading="lazy">
      </figure>

      <nav class="toc">
        <h2>文章目錄</h2>
        <ol>
          <li><a href="#sec1">{{章節1}}</a></li>
          <li><a href="#sec2">{{章節2}}</a></li>
          <li><a href="#faq">常見問題 FAQ</a></li>
        </ol>
      </nav>

      <h2 id="sec1">{{章節1標題}}</h2>
      <p>{{內文}}</p>

      <!-- 需要表格時用這個 -->
      <div class="price-table-wrap">
        <table class="price-table">
          <thead><tr><th>{{欄1}}</th><th>{{欄2}}</th><th>{{欄3}}</th></tr></thead>
          <tbody>
            <tr><td>{{}}</td><td class="price-num">{{}}</td><td>{{}}</td></tr>
            <tr class="highlight"><td>{{}}</td><td class="price-num">{{}}</td><td>{{}}</td></tr>
          </tbody>
        </table>
      </div>
      <p class="table-note">※ {{備註，行情類加「實際依…而異」}}</p>

      <!-- 需要步驟時用這個 -->
      <ol class="steps">
        <li><strong>{{步驟標題}}</strong><span>{{說明}}</span></li>
      </ol>

      <h2 id="sec2">{{章節2標題}}</h2>
      <p>{{內文，記得內鏈：<a href="其他文章.html">…</a> 與 <a href="../registration.html">方案頁</a>}}</p>

      <h2>汎馬商辦中心・大安光復館</h2>
      <p>{{帶出自家賣點：大安區精華地段、信件代收當日通知、控管同址戶數，並連到方案頁}}</p>

      <h2 id="faq">常見問題 FAQ</h2>
      <div class="faq-list">
        <details class="faq-item"><summary>{{問題1}}</summary><p class="faq-a">{{答案1}}</p></details>
        <details class="faq-item"><summary>{{問題2}}</summary><p class="faq-a">{{答案2}}</p></details>
        <details class="faq-item"><summary>{{問題3}}</summary><p class="faq-a">{{答案3}}</p></details>
      </div>

      <div class="article-cta">
        <h2>{{行動呼籲標題}}</h2>
        <p>{{一句話導流}}</p>
        <div class="hero-actions">
          <a class="btn btn-line" data-config-href="lineUrl" target="_blank" rel="noopener">LINE 免費諮詢</a>
          <a class="btn btn-gold" href="../index.html#booking">預約參觀</a>
        </div>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p class="footer-news">📩 想收到空房與優惠通知？<a data-config-href="lineUrl" target="_blank" rel="noopener">加入官方 LINE →</a></p>
      <p><strong data-config="brandName">汎馬商辦中心</strong>　大安光復館｜<span data-config="address">台北市大安區光復南路107號8樓</span></p>
      <p class="footer-legal"><span data-config="companyName">汎馬整合行銷有限公司</span>　統一編號：<span data-config="taxId">83695998</span>　負責人：<span data-config="owner">余文魁</span>　公司登記地址：<span data-config="regAddress">新北市淡水區新市三路一段68號10樓</span></p>
      <p>© 2026 <span data-config="companyName">汎馬整合行銷有限公司</span> All rights reserved.</p>
    </div>
  </footer>

  <div class="float-cta">
    <a class="float-line" data-config-href="lineUrl" target="_blank" rel="noopener">💬 LINE 詢問</a>
    <a class="float-tel" data-config-href="telPhone">📞 一鍵撥打</a>
  </div>

  <script src="../js/site-config.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
```

## 六、可用的 Unsplash 配圖 ID（皆已驗證可載入，商務主題）

格式：`https://images.unsplash.com/photo-{ID}?w=1200&q=80&auto=format&fit=crop`
（卡片縮圖用 `w=600&q=75`）

| ID | 內容 |
|----|------|
| 1497366216548-37526070297c | 獨立辦公室 |
| 1431540015161-0bf868a2d407 | 會議室 |
| 1604328698692-f76ea9498e76 | 共享／開放空間 |
| 1497366811353-6870744d04b2 | 開放辦公室 |
| 1524758631624-e2822e304c36 | 接待洽談區 |
| 1517502884422-41eaead166d4 | 茶水交誼區 |
| 1486406146926-c627a92ad1ab | 商辦大樓外觀（適合在地／地段題） |
| 1497215728101-856f4ea42174 | 辦公室＋城市窗景 |
| 1542744173-8e7e53415bb0 | 會議簡報 |
| 1521737604893-d14cc237f11d | 團隊協作 |
| 1454165804606-c3d57bc86b40 | 文件審閱／簽約（適合登記、流程題） |

> 用前可先用 curl 確認回 200。實拍照到位後業主會替換。

## 七、寫完後一定要做的兩件事

1. **把文章加到專欄列表 `blog/index.html`**：在 `<div class="card-grid">` 最上方（最新在前）插入一張卡片：
   ```html
   <article class="card">
     <a class="card-thumb" href="{{檔名}}.html"><img src="https://images.unsplash.com/photo-{{ID}}?w=600&q=75&auto=format&fit=crop" alt="" loading="lazy"></a>
     <h3><a href="{{檔名}}.html">{{標題}}</a></h3>
     <p>{{一句摘要}}</p>
     <p class="card-meta">📅 {{YYYY-MM-DD}}</p>
     <a class="card-link" href="{{檔名}}.html">閱讀全文 →</a>
   </article>
   ```
2. **在 competitor-titles.md 把該題的 ⬜ 改成 ✅**（標記已完成，避免重複寫）。

## 八、不要碰的東西

- 不要改 `js/site-config.js` 的聯絡資料（除非業主明確要求）。
- 不要把 CLAUDE.md / content-plan.md / competitor-titles.md / placeholders-todo.md 加進 git（已在 .gitignore，內含商業策略）。
- 不要替換 header 左上的文字 logo（待業主提供「汎馬商辦中心」版 logo 圖）。
- 不要動表單 JS（表單功能無效一事業主會另外處理）。

## 九、驗證與發布

- 本機預覽：`python -m http.server 8765` 後開 `http://localhost:8765/blog/{{檔名}}.html`。
- 確認：頁面正常、配圖載入、內鏈可點、手機版正常。
- 發布：`git add -A && git commit -m "新增文章：{{標題}}" && git push`（會自動部署到 GitHub Pages）。
- GitHub CLI 若要用，路徑為 `C:\Program Files\GitHub CLI\gh.exe`。
