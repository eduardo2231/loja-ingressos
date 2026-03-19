import { categories, events } from "../data.js";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderEventCard(ev) {
  return `
    <article class="card">
      <div class="card__media">
        <img src="${escapeHtml(ev.image)}" alt="${escapeHtml(ev.title)}" loading="lazy" />
        <span class="pill pill--primary">${escapeHtml(ev.category)}</span>
      </div>
      <div class="card__body">
        <h3 class="card__title">${escapeHtml(ev.title)}</h3>
        <p class="muted small">${escapeHtml(ev.date)}</p>
        <p class="muted small">${escapeHtml(ev.location)}</p>
        <div class="card__row">
          <strong>${escapeHtml(ev.price)}</strong>
          <button class="btn btn--primary" data-buy="${ev.id}">Comprar</button>
        </div>
      </div>
    </article>
  `;
}

export function mountHome(root) {
  root.innerHTML = `
    <section class="hero">
      <div class="hero__inner">
        <h1>Compre seus ingressos aqui</h1>
        <p class="muted">Os melhores eventos da sua cidade.</p>
        <div class="search">
          <input id="q" type="text" placeholder="Buscar eventos..." autocomplete="off" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section__title">Eventos em Destaque</h2>
        <div id="cats" class="chips"></div>
        <div id="grid" class="grid"></div>
        <p id="empty" class="muted center hidden">Nenhum evento encontrado.</p>
      </div>
    </section>
  `;

  const q = root.querySelector("#q");
  const cats = root.querySelector("#cats");
  const grid = root.querySelector("#grid");
  const empty = root.querySelector("#empty");

  let activeCategory = "Todos";
  let query = "";

  function renderCats() {
    cats.innerHTML = categories
      .map((c) => {
        const active = c === activeCategory ? "chip chip--active" : "chip";
        return `<button class="${active}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`;
      })
      .join("");
  }

  function renderGrid() {
    const filtered = events.filter((e) => {
      const matchCategory = activeCategory === "Todos" || e.category === activeCategory;
      const matchSearch = e.title.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchSearch;
    });

    grid.innerHTML = filtered.map(renderEventCard).join("");
    empty.classList.toggle("hidden", filtered.length !== 0);
  }

  renderCats();
  renderGrid();

  q.addEventListener("input", (e) => {
    query = e.target.value || "";
    renderGrid();
  });

  cats.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    activeCategory = btn.getAttribute("data-cat");
    renderCats();
    renderGrid();
  });

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-buy]");
    if (!btn) return;
    const id = btn.getAttribute("data-buy");
    location.hash = `#/checkout/${id}`;
  });
}

