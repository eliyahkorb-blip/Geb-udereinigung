/* ==========================================================================
   König Gebäudereinigung — main.js
   Mobile-Navigation, Accessibility-Widget, Cookie-Consent, Kontaktformular.
   Keine externen Abhängigkeiten.
   ========================================================================== */
(function () {
  "use strict";

  var html = document.documentElement;

  /* ------------------------------------------------------------------
     Mobile-Navigation
     ------------------------------------------------------------------ */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && window.innerWidth < 1024) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Accessibility-Widget (Schriftgröße, Kontrast)
     Einstellungen werden in localStorage gespeichert.
     ------------------------------------------------------------------ */
  var A11Y_KEY = "koenig_a11y_settings";

  function loadA11ySettings() {
    try {
      var raw = localStorage.getItem(A11Y_KEY);
      if (!raw) return { fontScale: 0, contrast: false };
      var parsed = JSON.parse(raw);
      return {
        fontScale: typeof parsed.fontScale === "number" ? parsed.fontScale : 0,
        contrast: !!parsed.contrast
      };
    } catch (err) {
      return { fontScale: 0, contrast: false };
    }
  }

  function saveA11ySettings(settings) {
    try {
      localStorage.setItem(A11Y_KEY, JSON.stringify(settings));
    } catch (err) {
      /* localStorage nicht verfügbar (z. B. privates Surfen) — Einstellung gilt nur für diese Sitzung */
    }
  }

  function applyA11ySettings(settings) {
    if (settings.fontScale > 0) {
      html.setAttribute("data-font-scale", String(settings.fontScale));
    } else {
      html.removeAttribute("data-font-scale");
    }
    html.classList.toggle("contrast-mode", !!settings.contrast);
  }

  function initA11yWidget() {
    var toggle = document.querySelector(".a11y-toggle");
    var panel = document.querySelector(".a11y-panel");
    var incBtn = document.querySelector("[data-a11y-font-inc]");
    var decBtn = document.querySelector("[data-a11y-font-dec]");
    var contrastBtn = document.querySelector("[data-a11y-contrast]");
    var resetBtn = document.querySelector("[data-a11y-reset]");
    if (!toggle || !panel) return;

    var settings = loadA11ySettings();
    applyA11ySettings(settings);
    updateA11yUI();

    function updateA11yUI() {
      if (contrastBtn) contrastBtn.setAttribute("aria-pressed", settings.contrast ? "true" : "false");
      if (incBtn) incBtn.setAttribute("aria-pressed", settings.fontScale >= 3 ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.addEventListener("click", function (e) {
      if (!panel.contains(e.target) && !toggle.contains(e.target)) {
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    if (incBtn) {
      incBtn.addEventListener("click", function () {
        settings.fontScale = Math.min(3, settings.fontScale + 1);
        applyA11ySettings(settings);
        saveA11ySettings(settings);
        updateA11yUI();
      });
    }
    if (decBtn) {
      decBtn.addEventListener("click", function () {
        settings.fontScale = Math.max(0, settings.fontScale - 1);
        applyA11ySettings(settings);
        saveA11ySettings(settings);
        updateA11yUI();
      });
    }
    if (contrastBtn) {
      contrastBtn.addEventListener("click", function () {
        settings.contrast = !settings.contrast;
        applyA11ySettings(settings);
        saveA11ySettings(settings);
        updateA11yUI();
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        settings = { fontScale: 0, contrast: false };
        applyA11ySettings(settings);
        saveA11ySettings(settings);
        updateA11yUI();
      });
    }
  }

  /* ------------------------------------------------------------------
     Cookie-Consent (Kategorien: notwendig, statistik, externeMedien, uebersetzung)
     Aktuell werden keine Statistik-/Tracking-Dienste eingebunden — das
     Consent-System ist technisch vorbereitet, falls künftig z. B. IONOS
     SiteAnalytics, Google Maps oder ein Website-Übersetzer ergänzt werden.
     ------------------------------------------------------------------ */
  var CONSENT_KEY = "koenig_cookie_consent";

  function loadConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function saveConsent(consent) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch (err) {
      /* kein Speicherzugriff möglich */
    }
    document.dispatchEvent(new CustomEvent("koenig:consent-updated", { detail: consent }));
  }

  function initCookieBanner() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;
    var acceptAllBtn = document.getElementById("cookie-accept-all");
    var rejectBtn = document.getElementById("cookie-reject");
    var saveBtn = document.getElementById("cookie-save-selection");
    var settingsToggle = document.getElementById("cookie-settings-toggle");
    var categories = document.getElementById("cookie-categories");
    var statistikInput = document.getElementById("cookie-cat-statistik");
    var medienInput = document.getElementById("cookie-cat-medien");
    var uebersetzungInput = document.getElementById("cookie-cat-uebersetzung");

    var existing = loadConsent();
    if (!existing) {
      banner.classList.add("is-visible");
    }

    if (settingsToggle && categories) {
      settingsToggle.addEventListener("click", function () {
        var isOpen = categories.classList.toggle("is-open");
        settingsToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    function closeBanner() {
      banner.classList.remove("is-visible");
    }

    if (acceptAllBtn) {
      acceptAllBtn.addEventListener("click", function () {
        saveConsent({ necessary: true, statistik: true, externeMedien: true, uebersetzung: true, date: new Date().toISOString() });
        closeBanner();
      });
    }
    if (rejectBtn) {
      rejectBtn.addEventListener("click", function () {
        saveConsent({ necessary: true, statistik: false, externeMedien: false, uebersetzung: false, date: new Date().toISOString() });
        closeBanner();
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        saveConsent({
          necessary: true,
          statistik: statistikInput ? statistikInput.checked : false,
          externeMedien: medienInput ? medienInput.checked : false,
          uebersetzung: uebersetzungInput ? uebersetzungInput.checked : false,
          date: new Date().toISOString()
        });
        closeBanner();
      });
    }

    var reopenLink = document.querySelectorAll("[data-open-cookie-settings]");
    reopenLink.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        banner.classList.add("is-visible");
        if (categories) categories.classList.add("is-open");
      });
    });
  }

  /* ------------------------------------------------------------------
     Kontaktformular — kein Backend vorhanden (statisches Hosting).
     Das Formular öffnet beim Absenden einen vorausgefüllten
     E-Mail-Entwurf (mailto:) als Fallback. Für eine echte serverseitige
     Zustellung wird ein Formular-Backend benötigt (siehe README.md).
     ------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      var lines = [
        "Name: " + (data.get("name") || ""),
        "Firma: " + (data.get("company") || "-"),
        "Telefon: " + (data.get("phone") || "-"),
        "E-Mail: " + (data.get("email") || ""),
        "Objekt/Standort: " + (data.get("location") || "-"),
        "Gewünschte Leistung: " + (data.get("service") || "-"),
        "",
        "Nachricht:",
        data.get("message") || ""
      ];

      var subject = "Anfrage über Website: " + (data.get("name") || "Neue Anfrage");
      var body = lines.join("\n");
      var mailto = "mailto:info@koenig-gebaeudereinigung.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;

      if (status) {
        status.textContent = "Ihr E-Mail-Programm öffnet sich mit einer vorausgefüllten Anfrage. Bitte senden Sie die E-Mail dort ab, damit wir sie erhalten.";
        status.classList.add("is-visible");
        status.setAttribute("role", "status");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initA11yWidget();
    initCookieBanner();
    initContactForm();
  });
})();
