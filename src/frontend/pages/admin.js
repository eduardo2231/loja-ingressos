import { events, mockUsers } from "../data.js";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function mountAdmin(root) {
  root.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="row row--tight">
          <h1 class="h2">Painel Admin</h1>
        </div>

        <div class="stats">
          ${[
            { label: "Eventos", value: events.length },
            { label: "Usuários", value: mockUsers.length },
            { label: "Ingressos vendidos", value: 11 },
            { label: "Receita", value: "R$ 3.200" },
          ]
            .map(
              (s) => `
                <div class="stat">
                  <div class="stat__value">${escapeHtml(s.value)}</div>
                  <div class="stat__label">${escapeHtml(s.label)}</div>
                </div>
              `
            )
            .join("")}
        </div>

        <h2 class="h3">Usuários</h2>
        <div class="tableWrap">
          <table class="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Papel</th>
                <th>Ingressos</th>
              </tr>
            </thead>
            <tbody>
              ${mockUsers
                .map(
                  (u) => `
                    <tr>
                      <td>${escapeHtml(u.name)}</td>
                      <td class="muted">${escapeHtml(u.email)}</td>
                      <td>
                        <span class="pill ${u.role === "admin" ? "pill--primary" : ""}">
                          ${escapeHtml(u.role)}
                        </span>
                      </td>
                      <td>${escapeHtml(u.ingressos)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <h2 class="h3">Eventos</h2>
        <div class="tableWrap">
          <table class="table">
            <thead>
              <tr>
                <th>Evento</th>
                <th>Data</th>
                <th>Local</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              ${events
                .map(
                  (ev) => `
                    <tr>
                      <td>${escapeHtml(ev.title)}</td>
                      <td class="muted">${escapeHtml(ev.date)}</td>
                      <td class="muted">${escapeHtml(ev.location)}</td>
                      <td>${escapeHtml(ev.price)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

