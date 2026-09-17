/**
 * AMY FITNESS — COMPONENT RENDERERS
 * Reads from js/data.js and injects markup into mount points.
 * Keeps content (data.js) separated from presentation (this file + CSS).
 */
(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const currentPage = document.body.dataset.page || "";

  const svgArrow = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18L18 6M18 6H9M18 6V15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ---------------- NAV ---------------- */
  function renderNav() {
    const mount = $("#site-nav");
    if (!mount) return;
    const links = NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}"${l.href === currentPage ? ' aria-current="page"' : ""}>${l.label}</a>`
    ).join("");
    mount.innerHTML = `
      <a href="index.html" class="nav-logo" aria-label="${SITE.name} — home">
        <img src="images/logo.png" alt="${SITE.name} logo" width="44" height="44" />
        <span class="nav-logo-word">AMY FITNESS</span>
      </a>
      <nav class="nav-links" aria-label="Primary">
        ${links}
      </nav>
      <div class="nav-right">
        <a href="contact.html" class="btn btn-primary nav-cta">Book a Session</a>
        <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;

    const mobileMount = $("#mobile-menu");
    if (mobileMount) {
      const mLinks = NAV_LINKS.concat([{ label: "Contact", href: "contact.html" }])
        .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
        .join("");
      mobileMount.innerHTML = `
        <ul>${mLinks}</ul>
        <a href="contact.html" class="btn btn-primary">Book a Session</a>
      `;
    }
  }

  /* ---------------- FOOTER ---------------- */
  function renderFooter() {
    const mount = $("#site-footer");
    if (!mount) return;
    const navCol = NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("");
    const hours = SITE.hours.map((h) => `<li><span>${h.d}</span> — ${h.h}</li>`).join("");
    const social = SITE.social.map((s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${SITE.name} on ${s.label}">${s.label.slice(0, 2).toUpperCase()}</a>`).join("");
    const addressLines = SITE.address.map((line) => `<li>${line}</li>`).join("");
    mount.innerHTML = `
      <div class="wrap">
        <div class="footer-top">
          <div class="footer-brand">
            <img src="images/logo.png" alt="${SITE.name} logo" width="48" height="48" />
            <p class="text-dim" style="max-width:28ch">${SITE.tagline}</p>
            <div class="footer-social">${social}</div>
          </div>
          <div class="footer-col">
            <h4>Sitemap</h4>
            <ul>${navCol}<li><a href="results.html">Results</a></li><li><a href="contact.html">Contact</a></li></ul>
          </div>
          <div class="footer-col">
            <h4>Location</h4>
            <ul>
              ${addressLines}
              <li style="margin-top:0.4rem;"><a href="${SITE.mapsUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--red);display:inline-flex;align-items:center;gap:0.3rem;">Get Directions ${svgArrow}</a></li>
              <li style="margin-top:0.4rem;"><a href="tel:${SITE.phoneRaw}">${SITE.phone}</a></li>
              <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Hours</h4>
            <ul>${hours}</ul>
          </div>
        </div>
        <div class="wrap" style="padding-left:0;padding-right:0;">
          <p class="footer-closing">Train With Purpose.</p>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span>
          <span>Designed &amp; Built by <a href="https://avinashnandipati.com" target="_blank" rel="noopener noreferrer" style="color:var(--white);font-weight:600;text-decoration:underline;text-underline-offset:3px;transition:color 0.2s ease;">Avinash Nandipati</a></span>
          <span>Madhapur &bull; Hyderabad &bull; Telangana</span>
        </div>
      </div>
    `;
  }

  /* ---------------- PROGRAMS ---------------- */
  function renderPrograms(mountSel, opts) {
    const mount = $(mountSel);
    if (!mount) return;
    const detailed = opts && opts.detailed;
    mount.innerHTML = PROGRAMS.map(
      (p, i) => `
      <div class="program-row reveal reveal-delay-${(i % 4) + 1}" role="link" tabindex="0" data-href="training.html#${p.slug}" aria-label="${p.name} — view program">
        <div class="program-row-inner">
          <span class="program-index">${p.index}</span>
          <span class="program-name">${p.name}</span>
          <span class="program-tag">${p.tag}</span>
          <span class="program-arrow">${svgArrow}</span>
        </div>
        <div class="program-preview ph" aria-hidden="true">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
        </div>
      </div>
    `
    ).join("");

    if (detailed) {
      $$(".program-row", mount).forEach((row, i) => {
        row.addEventListener("click", (e) => {}, { once: false });
      });
    }
    if (window.initScrollReveals) window.initScrollReveals();
  }

  function renderProgramDetail() {
    const mount = $("#program-detail-list");
    if (!mount) return;
    mount.innerHTML = PROGRAMS.map(
      (p, i) => `
      <article class="section" id="${p.slug}" style="padding-top:clamp(3rem,6vw,5rem);padding-bottom:clamp(3rem,6vw,5rem);border-top:1px solid var(--line);">
        <div class="grid-12">
          <div style="grid-column: 1 / -1;" class="reveal">
            <div class="section-num">${p.index} / ${String(PROGRAMS.length).padStart(2, "0")}</div>
          </div>
          <div style="grid-column: 1 / -1;" class="reveal">
            <h2 class="display" style="font-size:var(--fs-h2);margin-top:0.6rem;">${p.name}</h2>
            <p class="eyebrow" style="margin-top:0.9rem;">${p.tag}</p>
          </div>
        </div>
        <div class="grid-12" style="margin-top:2.2rem;align-items:start;">
          <div style="grid-column: 1 / span 12;" class="reveal">
            <div class="ph" style="aspect-ratio:16/7;margin-bottom:2rem;">
              <img src="${p.image}" alt="${p.name}" loading="lazy" />
            </div>
          </div>
          <div style="grid-column: 1 / span 7;" class="reveal">
            <p class="lede" style="max-width:60ch;">${p.detail}</p>
          </div>
          <div style="grid-column: 8 / span 5;" class="reveal">
            <h3 class="eyebrow on-dark">What's Included</h3>
            <ul style="margin-top:1rem;display:flex;flex-direction:column;gap:0.7rem;">
              ${p.includes.map((i) => `<li style="padding-left:1rem;border-left:1px solid var(--red);color:var(--bone-dim);font-size:0.92rem;">${i}</li>`).join("")}
            </ul>
            <a href="contact.html" class="btn btn-primary" style="margin-top:1.6rem;">Book a Session ${svgArrow}</a>
          </div>
        </div>
      </article>
    `
    ).join("");
    if (window.initScrollReveals) window.initScrollReveals();
  }

  /* ---------------- COACHES ---------------- */
  function renderCoaches(mountSel, opts) {
    const mount = $(mountSel);
    if (!mount) return;
    const limit = (opts && opts.limit) || COACHES.length;
    mount.innerHTML = COACHES.slice(0, limit)
      .map(
        (c, i) => `
      <article class="coach-card reveal reveal-delay-${(i % 4) + 1}" id="${c.slug}">
        <div class="coach-portrait ph">
          <img src="${c.image}" alt="${c.name}" loading="lazy" />
        </div>
        <div class="coach-info">
          <div>
            <p class="coach-role">${c.role}</p>
            <h3 class="coach-name">${c.name}</h3>
            <p class="coach-spec" style="margin-top:0.4rem;">${c.spec}</p>
          </div>
          <p class="coach-bio">${c.bio}</p>
          <p class="text-dim" style="font-style:italic;font-size:0.92rem;">&ldquo;${c.philosophy}&rdquo;</p>
          <div class="coach-meta">
            <div><span class="n">${c.years}</span><span class="l">Years Experience</span></div>
            <div><span class="n">${c.clients}</span><span class="l">Clients Trained</span></div>
          </div>
          <a href="coaches.html#${c.slug}" class="btn btn-ghost">View Profile ${svgArrow}</a>
        </div>
      </article>
    `
      )
      .join("");
    if (window.initScrollReveals) window.initScrollReveals();
  }

  /* ---------------- STATS ---------------- */
  function renderStats(mountSel) {
    const mount = $(mountSel);
    if (!mount) return;
    mount.innerHTML = STATS.map(
      (s) => `
      <div class="stat reveal">
        <span class="n"><span class="count-up" data-count="${s.n}">${s.n}</span><span class="accent">${s.suffix}</span></span>
        <span class="l">${s.label}</span>
      </div>
    `
    ).join("");
    if (window.initScrollReveals) window.initScrollReveals();
    if (window.initCountUp) window.initCountUp();
  }

  /* ---------------- RESULTS ---------------- */
  function renderResults(mountSel, opts) {
    const mount = $(mountSel);
    if (!mount) return;
    const limit = (opts && opts.limit) || RESULTS.length;
    mount.innerHTML = RESULTS.slice(0, limit)
      .map(
        (r, i) => `
      <div class="result-card reveal reveal-delay-${(i % 3) + 1}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.6rem;flex-wrap:wrap;">
          <span class="goal">${r.goal}</span>
          ${r.metric ? `<span class="metric-badge" style="font-family:var(--font-mono);font-size:0.68rem;color:var(--red);background:rgba(200,32,44,0.12);border:1px solid rgba(200,32,44,0.3);padding:0.25rem 0.55rem;border-radius:3px;letter-spacing:0.04em;font-weight:600;">${r.metric}</span>` : ""}
        </div>
        <p class="quote" style="margin-top:0.4rem;">&ldquo;${r.quote}&rdquo;</p>
        <span class="name" style="font-family:var(--font-display);font-size:1.35rem;color:var(--white);margin-top:0.6rem;text-transform:uppercase;">${r.name}</span>
        <div class="meta" style="display:flex;gap:0.8rem;font-family:var(--font-mono);font-size:0.72rem;color:var(--bone-dim);text-transform:uppercase;">
          <span>${r.program}</span> &bull; <span>${r.duration}</span>
        </div>
      </div>
    `
      )
      .join("");
    if (window.initScrollReveals) window.initScrollReveals();
  }

  /* ---------------- TESTIMONIALS ---------------- */
  function renderTestimonials(mountSel) {
    const mount = $(mountSel);
    if (!mount) return;
    const slides = TESTIMONIALS.map(
      (t, i) => `
      <div class="testimonial-slide${i === 0 ? " active" : ""}">
        <p class="testimonial-quote">&ldquo;${t.quote}&rdquo;</p>
        <p class="testimonial-attr">— ${t.attr}</p>
      </div>
    `
    ).join("");
    const dots = TESTIMONIALS.map((_, i) => `<button class="testimonial-dot${i === 0 ? " active" : ""}" aria-label="Show testimonial ${i + 1}"></button>`).join("");
    mount.innerHTML = `${slides}<div class="testimonial-nav">${dots}</div>`;
  }

  /* ---------------- FACILITY ---------------- */
  function renderFacility(mountSel) {
    const mount = $(mountSel);
    if (!mount) return;
    mount.innerHTML = FACILITY_IMAGES.map(
      (f) => `
      <div class="facility-item ${f.key} reveal">
        <div class="ph" style="width:100%;height:100%;">
          <img src="${f.image}" alt="${f.label}" loading="lazy" />
        </div>
        <span class="cap">${f.label}</span>
      </div>
    `
    ).join("");
    if (window.initScrollReveals) window.initScrollReveals();
  }

  /* ---------------- Expose + auto-init ---------------- */
  window.AmyFitness = {
    renderNav,
    renderFooter,
    renderPrograms,
    renderProgramDetail,
    renderCoaches,
    renderStats,
    renderResults,
    renderTestimonials,
    renderFacility,
  };

  renderNav();
  renderFooter();
})();
