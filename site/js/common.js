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
    btn.innerHTML = svgIcon(isDark ? "sun" : "moon", 17) + `<span>${isDark ? "Dia" : "Vigília"}</span>`;
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

function renderDaySummary(day) {
  const badge = day.destaque_do_dia
    ? `<span class="badge">${svgIcon("sighting", 13)}Avistamento raro</span>`
    : "";
  return `
    <div class="day-summary">
      <div class="date-row">
        <h1 class="day-date"><span class="sr-only">Registro de campo — </span>${fmtDate(day.data)}</h1>
        ${badge}
      </div>
      <p>${escapeHtml(day.resumo)}</p>
    </div>
  `;
}

function renderItem(item) {
  const markNotable = item.relevancia === "alta"
    ? `<span class="field-mark" title="Achado de destaque">${svgIcon("flag", 12)}</span>`
    : "";
  const tipo = item.tipo ? `<span class="tag">${escapeHtml(item.tipo.replace(/_/g, " "))}</span>` : "";
  const comparados = item.modelos_comparados && item.modelos_comparados.length
    ? `<p><strong>Modelos:</strong> ${escapeHtml(item.modelos_comparados.join(", "))}</p>` : "";
  const custoBeneficio = item.custo_beneficio ? `<p><strong>Custo-benefício:</strong> ${escapeHtml(item.custo_beneficio)}</p>` : "";
  const fonte = item.fonte
    ? `<a class="source-link" href="${escapeHtml(item.fonte)}" target="_blank" rel="noopener noreferrer">${svgIcon("arrow", 13)}Fonte</a>`
    : "";
  return `
    <div class="item">
      <h3>${markNotable}${escapeHtml(item.titulo)}</h3>
      ${tipo}
      <p>${escapeHtml(item.resumo)}</p>
      ${comparados}
      ${custoBeneficio}
      <div class="meta">${fonte}</div>
    </div>
  `;
}

function renderSections(secoes) {
  let html = "";
  for (const meta of SECTIONS) {
    const items = secoes[meta.key];
    if (!items || !items.length) continue;
    html += `
      <section class="category" style="--cat-ink: var(--ink-${meta.key})">
        <div class="category-head">
          <span class="cat-icon">${svgIcon(meta.key, 19)}</span>
          <h2>${meta.label}</h2>
          <span class="cat-count">${items.length}</span>
        </div>
        ${items.map((it) => renderItem(it)).join("")}
      </section>
    `;
  }
  return html;
}

function renderTerms(glossarioDoDia) {
  if (!glossarioDoDia || !glossarioDoDia.length) return "";
  const chips = glossarioDoDia
    .map((g) => `<a class="chip" href="glossario.html#${slugifyTerm(g.termo)}">${escapeHtml(g.termo)}</a>`)
    .join("");
  return `
    <div class="terms-box">
      <h2>${svgIcon("book", 17)}Termos do dia</h2>
      <div class="chips">${chips}</div>
    </div>
  `;
}

function renderDeepen(paraAprofundar) {
  if (!paraAprofundar || !paraAprofundar.length) return "";
  const items = paraAprofundar
    .map((p) => `<li><span class="tag">${escapeHtml(p.tipo)}</span> <a href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.titulo)}</a></li>`)
    .join("");
  return `
    <div class="deepen-box">
      <h2>Pra aprofundar</h2>
      <ul>${items}</ul>
    </div>
  `;
}

function renderDigest(day, container) {
  container.innerHTML =
    renderDaySummary(day) +
    renderTerms(day.glossario_do_dia) +
    renderSections(day.secoes || {}) +
    renderDeepen(day.para_aprofundar);
}
