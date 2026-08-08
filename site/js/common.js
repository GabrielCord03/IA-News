const SECTIONS = [
  { key: "modelos", label: "Modelos" },
  { key: "ferramentas_plugins_mcps", label: "Ferramentas & MCPs" },
  { key: "open_source", label: "Open Source" },
  { key: "discussoes", label: "Discussões" },
  { key: "papers", label: "Papers" },
  { key: "mercado", label: "Mercado" },
  { key: "regulacao", label: "Regulação" },
  { key: "integracoes_novas", label: "Integrações Novas" },
  { key: "dicas_economia_e_performance", label: "Economia & Performance" },
  { key: "dicas_programadores", label: "Dicas pra Programadores" },
  { key: "delphi_e_ia", label: "Delphi + IA" },
  { key: "comparativos_modelos", label: "Comparativos de Modelos" },
];

function sectionMeta(key) {
  return SECTIONS.find((s) => s.key === key) || { key, label: key };
}

function fmtDate(iso) {
  const [y, m, d] = iso.split("-");
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${d} ${months[parseInt(m, 10) - 1]} ${y}`;
}

function fmtDateLonga(iso) {
  const [y, m, d] = iso.split("-");
  const dias = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const dt = new Date(Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)));
  return `${dias[dt.getUTCDay()]}, ${parseInt(d, 10)} de ${months[parseInt(m, 10) - 1]} de ${y}`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function slugifyTerm(term) {
  return encodeURIComponent(term.trim());
}

async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Falha ao carregar ${path}: ${res.status}`);
  return res.json();
}

function initTheme() {
  const stored = localStorage.getItem("radar-ia-theme");
  if (stored) document.documentElement.setAttribute("data-theme", stored);
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const render = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const isDark = current === "dark" || (!current && window.matchMedia("(prefers-color-scheme: dark)").matches);
    btn.innerHTML = `<span class="toggle-dot${isDark ? "" : " is-filled"}" aria-hidden="true"></span>${isDark ? "Dia" : "Noite"}`;
    btn.setAttribute("aria-label", isDark ? "Mudar para modo dia" : "Mudar para modo noturno");
  };
  render();
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const isDark = current === "dark" || (!current && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("radar-ia-theme", next);
    render();
  });
}

const HIGHLIGHTS_KEY = "radar-ia-destaques";

function getHighlights() {
  try {
    return JSON.parse(localStorage.getItem(HIGHLIGHTS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveHighlights(map) {
  localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(map));
}

function highlightKey(data, catKey, titulo) {
  return `${data}::${catKey}::${titulo}`;
}

function isHighlighted(key) {
  return Object.prototype.hasOwnProperty.call(getHighlights(), key);
}

function toggleHighlight(key, payload) {
  const map = getHighlights();
  if (map[key]) {
    delete map[key];
  } else {
    map[key] = { ...payload, savedAt: Date.now() };
  }
  saveHighlights(map);
  return Object.prototype.hasOwnProperty.call(map, key);
}

function renderMarkToggle(key, payload) {
  const marked = isHighlighted(key);
  const payloadAttr = payload ? ` data-payload='${JSON.stringify(payload).replace(/'/g, "&#39;")}'` : "";
  return `
    <button type="button" class="mark-toggle" data-key="${escapeHtml(key)}"${payloadAttr}
      aria-pressed="${marked}" aria-label="${marked ? "Remover destaque" : "Marcar como importante"}">
      <span class="mark-dot" aria-hidden="true"></span>${marked ? "Marcado" : "Marcar"}
    </button>
  `;
}

function initMarkToggles(root, onToggle) {
  (root || document).querySelectorAll(".mark-toggle[data-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      let payload = null;
      if (btn.dataset.payload) {
        try { payload = JSON.parse(btn.dataset.payload); } catch {}
      }
      const nowMarked = toggleHighlight(key, payload);
      btn.setAttribute("aria-pressed", String(nowMarked));
      btn.setAttribute("aria-label", nowMarked ? "Remover destaque" : "Marcar como importante");
      btn.innerHTML = `<span class="mark-dot" aria-hidden="true"></span>${nowMarked ? "Marcado" : "Marcar"}`;
      if (onToggle) onToggle(key, nowMarked, btn);
    });
  });
}

function populatedCategories(secoes) {
  return SECTIONS
    .map((meta) => ({ ...meta, items: (secoes && secoes[meta.key]) || [] }))
    .filter((c) => c.items.length);
}

function renderMasthead(day) {
  const cats = populatedCategories(day.secoes || {});
  const totalItens = cats.reduce((n, c) => n + c.items.length, 0);
  const accentBand = day.destaque_do_dia
    ? `<div class="accent-band"><span class="label">Avistamento raro</span><span class="accent-band-text">dia raro — vale ler inteiro, não só o resumo</span></div>`
    : "";
  return `
    <header class="masthead">
      <div class="meta-row">
        <span class="label">${fmtDateLonga(day.data)}</span>
        <span class="label">${totalItens} itens · ${cats.length} seções</span>
      </div>
      ${accentBand}
      <h1 class="display-h1">O dia em <em>inteligência artificial</em></h1>
      <p class="lead">${escapeHtml(day.resumo)}</p>
    </header>
  `;
}

function renderRail(cats) {
  if (!cats.length) return "";
  const items = cats
    .map((c, i) => `
      <li>
        <a href="#${c.key}" class="rail-link" data-rail-for="${c.key}">
          <span class="mono-index">${String(i + 1).padStart(2, "0")}</span>
          <span class="rail-label">${escapeHtml(c.label)}</span>
          <span class="rail-count">${c.items.length}</span>
        </a>
      </li>
    `)
    .join("");
  return `
    <nav class="col-rail" aria-label="Sumário do dia">
      <p class="label">Sumário</p>
      <ol class="rail-list">${items}</ol>
    </nav>
  `;
}

function initActiveSection(ids) {
  if (!ids.length || !("IntersectionObserver" in window)) return;
  const links = new Map(
    [...document.querySelectorAll(".rail-link")].map((a) => [a.dataset.railFor, a])
  );
  const setActive = (id) => {
    links.forEach((a, key) => a.classList.toggle("is-active", key === id));
  };
  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
  );
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

function renderItem(item, ctx) {
  const alta = item.relevancia === "alta";
  const mark = alta
    ? `<span class="relevance-mark" aria-label="Relevância alta"><span class="relevance-dot"></span></span>`
    : "";
  const tipo = item.tipo ? `<span class="label">${escapeHtml(item.tipo.replace(/_/g, " "))}</span>` : "";
  const toggle = ctx
    ? renderMarkToggle(highlightKey(ctx.data, ctx.catKey, item.titulo), {
        data: ctx.data,
        catKey: ctx.catKey,
        catLabel: ctx.catLabel,
        item,
      })
    : "";
  const comparados = item.modelos_comparados && item.modelos_comparados.length
    ? `<div class="item-models">${item.modelos_comparados
        .map((m, i) => `${i > 0 ? '<span class="sep">/</span>' : ""}<span class="model-name">${escapeHtml(m)}</span>`)
        .join("")}</div>`
    : "";
  const custoBeneficio = item.custo_beneficio
    ? `<p class="item-cb"><span class="label">Custo-benefício</span>${escapeHtml(item.custo_beneficio)}</p>`
    : "";
  const extra = comparados || custoBeneficio ? `<div class="item-extra">${comparados}${custoBeneficio}</div>` : "";
  const fonte = item.fonte
    ? `<a class="source-link" href="${escapeHtml(item.fonte)}" target="_blank" rel="noopener noreferrer">Fonte ↗</a>`
    : "";
  return `
    <article class="item-entry${alta ? " item-alta" : ""}">
      <div>${mark}</div>
      <div>
        <div class="item-heading-row">
          <h3 class="item-title">${escapeHtml(item.titulo)}</h3>
          ${tipo}
          ${toggle}
        </div>
        <p class="item-summary">${escapeHtml(item.resumo)}</p>
        ${extra}
        ${fonte}
      </div>
    </article>
  `;
}

function renderCategoriesWithPause(cats, data) {
  const pauseAt = Math.ceil(cats.length / 2);
  let html = "";
  cats.forEach((c, i) => {
    if (i === pauseAt && cats.length > 3) {
      html += `<div class="pause-divider"><span class="rule-line"></span><span class="label">metade do dia</span><span class="rule-line"></span></div>`;
    }
    const ctx = { data, catKey: c.key, catLabel: c.label };
    html += `
      <section id="${c.key}" class="category-section" style="--i:${i}">
        <div class="category-head">
          <span class="mono-index">${String(i + 1).padStart(2, "0")}</span>
          <h2 class="category-title">${escapeHtml(c.label)}</h2>
          <span class="label cat-count">${c.items.length}</span>
        </div>
        <div class="item-list">${c.items.map((it) => renderItem(it, ctx)).join("")}</div>
      </section>
    `;
  });
  return html;
}

function renderTerms(glossarioDoDia) {
  if (!glossarioDoDia || !glossarioDoDia.length) return "";
  const chips = glossarioDoDia
    .map((g) => `<a class="chip" href="glossario.html#${slugifyTerm(g.termo)}">${escapeHtml(g.termo)}<span class="arrow">↗</span></a>`)
    .join("");
  return `
    <div class="terms-box">
      <h2>Termos do dia</h2>
      <div class="chips">${chips}</div>
    </div>
  `;
}

function renderDeepen(paraAprofundar) {
  if (!paraAprofundar || !paraAprofundar.length) return "";
  const items = paraAprofundar
    .map((p) => `
      <li>
        <a href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer">
          <span class="title">${escapeHtml(p.titulo)}</span>
          <span class="label">${escapeHtml(p.tipo)}</span>
        </a>
      </li>
    `)
    .join("");
  return `
    <div class="deepen-box">
      <h2>Pra aprofundar</h2>
      <ul>${items}</ul>
    </div>
  `;
}

function renderDigest(day, container) {
  const cats = populatedCategories(day.secoes || {});
  container.innerHTML = `
    <div class="layout-grid">
      ${renderRail(cats)}
      <div class="col-main">
        ${renderMasthead(day)}
        ${renderCategoriesWithPause(cats, day.data)}
        ${renderTerms(day.glossario_do_dia)}
        ${renderDeepen(day.para_aprofundar)}
      </div>
    </div>
  `;
  initActiveSection(cats.map((c) => c.key));
  initMarkToggles(container);
}
