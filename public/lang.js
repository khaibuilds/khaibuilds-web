/* Enhance language choice, mobile navigation and email copy without inline scripts. */
(() => {
  const STORAGE_KEY = "khaibuilds.locale";
  const HINT_KEY = "khaibuilds.languageHintDismissed";
  const currentLang = document.documentElement.lang === "vi" ? "vi" : "en";

  /** @param {"localStorage" | "sessionStorage"} storageName
   *  @param {string} key
   */
  const getStored = (storageName, key) => {
    try { return window[storageName].getItem(key); } catch { return null; }
  };
  document.querySelectorAll("[data-language-switch]").forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-language-switch");
      if (target === "en" || target === "vi") {
        try { localStorage.setItem(STORAGE_KEY, target); } catch { /* Storage is optional. */ }
      }
    });
  });

  const preferred = getStored("localStorage", STORAGE_KEY);
  const dismissed = getStored("sessionStorage", HINT_KEY);
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
  const firstSupported = browserLanguages.find((language) => /^(en|vi)(?:-|$)/i.test(language)) || "en";
  const browserSuggestsVi = /^vi(?:-|$)/i.test(firstSupported);
  const targetLang = (preferred === "en" || preferred === "vi")
    ? preferred
    : (browserSuggestsVi ? "vi" : "en");
  const notice = document.getElementById("language-suggestion");
  if (notice && !dismissed && targetLang !== currentLang) notice.hidden = false;

  document.getElementById("dismiss-language")?.addEventListener("click", () => {
    if (notice) notice.hidden = true;
    try { sessionStorage.setItem(HINT_KEY, "1"); } catch { /* Dismissal still works. */ }
  });

  /** @type {HTMLDetailsElement | null} */
  const mobileNav = document.querySelector("details.mobile-nav");
  if (mobileNav) {
    document.addEventListener("pointerdown", (event) => {
      if (mobileNav.open && event.target instanceof Node && !mobileNav.contains(event.target)) {
        mobileNav.open = false;
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileNav.open) {
        mobileNav.open = false;
        mobileNav.querySelector("summary")?.focus();
      }
    });
  }

  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const status = button.closest(".contact-panel")?.querySelector("[data-copy-status]");
      // Literal is assembled in local JS so Cloudflare HTML email obfuscation cannot alter it.
      const email = ["hi", "khaibuilds.com"].join("@");
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(email);
        if (status) status.textContent = currentLang === "vi" ? "Đã sao chép địa chỉ email." : "Email address copied.";
      } catch {
        if (status) status.textContent = currentLang === "vi"
          ? "Không thể sao chép. Hãy chọn địa chỉ email ở trên."
          : "Unable to copy. Please select the email address above.";
      }
    });
  });
})();
