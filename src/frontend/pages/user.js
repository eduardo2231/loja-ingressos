import { events, mockLoggedUser } from "../data.js";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function mountUser(root) {
  const user = mockLoggedUser;
  const meusEventos = events.slice(0, 3);

  root.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="panel row">
          <div class="avatar" aria-hidden="true">U</div>
          <div class="grow">
            <h1 class="h2">${escapeHtml(user.name)}</h1>
            <p class="muted small">${escapeHtml(user.email)}</p>
          </div>
          <a class="btn btn--ghost" href="#/login">Sair</a>
        </div>

        <h2 class="h3">Meus Ingressos (${user.ingressos})</h2>

        <div class="grid grid--compact">
          ${meusEventos
            .map(
              (ev) => `
              <article class="card">
                <div class="card__media card__media--sm">
                  <img src="${escapeHtml(ev.image)}" alt="${escapeHtml(ev.title)}" loading="lazy" />
                </div>
                <div class="card__body">
                  <h3 class="card__title small">${escapeHtml(ev.title)}</h3>
                  <p class="muted small">${escapeHtml(ev.date)}</p>
                  <p class="muted small">${escapeHtml(ev.location)}</p>
                  <span class="pill pill--ok">Confirmado</span>
                </div>
              </article>
            `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

