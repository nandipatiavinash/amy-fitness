/**
 * AMY FITNESS — SITE BEHAVIOR
 * Vanilla JS. No build step required. Respects prefers-reduced-motion.
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Nav: sticky + transparent→solid ---------------- */
  const nav = document.querySelector(".nav");
  if (nav) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 40) nav.classList.add("scrolled");
          else nav.classList.remove("scrolled");
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Mobile menu ---------------- */
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (toggle && mobileMenu) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    };
    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      mobileMenu.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------- Scroll reveals ---------------- */
  let revealObserver;
  function initScrollReveals() {
    const revealEls = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!revealEls.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      if (!revealObserver) {
        revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
        );
      }
      revealEls.forEach((el) => revealObserver.observe(el));
    }
  }

  window.initScrollReveals = initScrollReveals;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollReveals);
  } else {
    initScrollReveals();
  }

  /* ---------------- Hero entrance (staggered) ---------------- */
  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-hero-in]").forEach((el, i) => {
      if (reduceMotion) {
        el.style.opacity = "1";
        return;
      }
      setTimeout(() => el.classList.add("in"), 120 + i * 110);
    });
  });

  /* ---------------- Count-up numbers ---------------- */
  let countObserver;
  function initCountUp() {
    const counters = document.querySelectorAll(".count-up:not(.animated)");
    if (!counters.length) return;

    const animateCount = (el) => {
      el.classList.add("animated");
      const target = parseFloat(el.dataset.count || el.textContent);
      if (reduceMotion || isNaN(target)) {
        el.textContent = target;
        return;
      }
      const dur = 1000;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      if (!countObserver) {
        countObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateCount(entry.target);
                countObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -10px 0px" }
        );
      }
      counters.forEach((el) => countObserver.observe(el));
    }
  }

  window.initCountUp = initCountUp;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCountUp);
  } else {
    initCountUp();
  }

  /* ---------------- Testimonial slider ---------------- */
  const tBlock = document.querySelector(".testimonial-block");
  if (tBlock) {
    const slides = tBlock.querySelectorAll(".testimonial-slide");
    const dots = tBlock.querySelectorAll(".testimonial-dot");
    let idx = 0;
    let timer;
    const show = (i) => {
      slides.forEach((s, n) => s.classList.toggle("active", n === i));
      dots.forEach((d, n) => d.classList.toggle("active", n === i));
      idx = i;
    };
    dots.forEach((d, n) =>
      d.addEventListener("click", () => {
        show(n);
        resetTimer();
      })
    );
    const advance = () => show((idx + 1) % slides.length);
    const resetTimer = () => {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(advance, 6000);
    };
    if (slides.length) {
      show(0);
      resetTimer();
    }
  }

  /* ---------------- Program row preview swap (desktop hover) ---------------- */
  document.querySelectorAll(".program-row").forEach((row) => {
    row.addEventListener("click", () => {
      const target = row.dataset.href;
      if (target) window.location.href = target;
    });
    row.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && row.dataset.href) {
        e.preventDefault();
        window.location.href = row.dataset.href;
      }
    });
  });

  /* ---------------- Contact form (Redirects directly to WhatsApp) ---------------- */
  const form = document.querySelector("#contact-form");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach((input) => {
        const field = input.closest(".field");
        const empty = !input.value.trim();
        const invalidEmail = input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        if (empty || invalidEmail) {
          field.classList.add("error");
          valid = false;
        } else {
          field.classList.remove("error");
        }
      });

      if (!status) return;

      if (valid) {
        const nameVal = form.querySelector("#name").value.trim();
        const emailVal = form.querySelector("#email").value.trim();
        const phoneVal = form.querySelector("#phone") ? form.querySelector("#phone").value.trim() : "";
        const programVal = form.querySelector("#program") ? form.querySelector("#program").value : "";
        const goalVal = form.querySelector("#goal").value.trim();

        const waMsg = `Hi Amy Fitness! I would like to book a consultation session.

*Name:* ${nameVal}
${phoneVal ? `*Phone:* ${phoneVal}\n` : ""}${emailVal ? `*Email:* ${emailVal}\n` : ""}${programVal && programVal !== "Not sure yet" ? `*Interested Program:* ${programVal}\n` : ""}*Training Goal:* ${goalVal}`;

        const waUrl = `https://wa.me/919542224419?text=${encodeURIComponent(waMsg)}`;

        status.innerHTML = `
          <div style="background:rgba(37,211,102,0.1);border:1px solid #25D366;padding:1.2rem;border-radius:4px;color:var(--white);">
            <div style="display:flex;align-items:center;gap:0.6rem;font-weight:600;color:#25D366;font-size:1.05rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/></svg>
              Booking request prepared!
            </div>
            <p style="margin-top:0.5rem;font-size:0.9rem;color:var(--bone-dim);">Redirecting you to WhatsApp to send your details directly to coach (+91 95422 24419)...</p>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top:1rem;display:inline-flex;background:#25D366;border-color:#25D366;color:#0a0908;font-weight:700;">
              Open WhatsApp Now &rarr;
            </a>
          </div>
        `;
        status.classList.add("show", "success");

        // Auto-open WhatsApp in a new tab
        setTimeout(() => {
          window.open(waUrl, "_blank");
        }, 800);

        form.reset();
      } else {
        status.textContent = "Please check the highlighted fields and try again.";
        status.classList.add("show");
        status.classList.remove("success");
      }
    });
  }
})();
