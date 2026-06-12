// ============================================================
// 共用互動：配置注入、行動版選單、預約表單
// 依賴 js/site-config.js（必須先載入）
// ============================================================
(function () {
  var cfg = window.SITE_CONFIG || {};

  // ---- 1. 配置注入 ----
  // 文字：<span data-config="brandName"></span>
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    if (cfg[key]) el.textContent = cfg[key];
  });
  // 連結：<a data-config-href="lineUrl">、tel / mailto 自動加前綴
  document.querySelectorAll("[data-config-href]").forEach(function (el) {
    var key = el.getAttribute("data-config-href");
    if (!cfg[key]) return;
    if (key === "telPhone") el.href = "tel:" + cfg[key];
    else if (key === "email") el.href = "mailto:" + cfg[key];
    else el.href = cfg[key];
  });
  // iframe：<iframe data-config-src="mapEmbedUrl">
  document.querySelectorAll("[data-config-src]").forEach(function (el) {
    var key = el.getAttribute("data-config-src");
    if (cfg[key]) el.src = cfg[key];
  });

  // ---- 2. 行動版選單 ----
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  // ---- 3. 預約參觀表單 ----
  // 尚未串接後端，送出時組好訊息並引導至 LINE（最高轉換通路）。
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var msg =
        "【預約參觀】\n" +
        "姓名：" + (data.get("name") || "") + "\n" +
        "電話：" + (data.get("phone") || "") + "\n" +
        "需求：" + (data.get("service") || "") + "\n" +
        "希望時段：" + (data.get("time") || "") + "\n" +
        "備註：" + (data.get("message") || "");

      // 複製訊息到剪貼簿，方便貼到 LINE
      if (navigator.clipboard) {
        navigator.clipboard.writeText(msg).catch(function () {});
      }
      note.className = "form-note success";
      note.textContent =
        "已為您整理預約資訊（已複製到剪貼簿）。即將開啟 LINE，貼上送出即可完成預約；或直接來電 " +
        (cfg.displayPhone || "") + "。";

      if (cfg.lineUrl) {
        setTimeout(function () {
          window.open(cfg.lineUrl, "_blank");
        }, 800);
      }
    });
  }
})();
