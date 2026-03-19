import { events } from "../data.js";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parsePriceBRL(price) {
  // Ex: "R$ 89,00" -> 89.00
  const only = String(price).replace(/[^\d,.-]/g, "");
  const normalized = only.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

function formatBRL(n) {
  try {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
  } catch {
    return `R$ ${n.toFixed(2)}`.replace(".", ",");
  }
}

function getEventIdFromHash() {
  const h = location.hash || "";
  // expected: "#/checkout/<id>"
  const parts = h.split("/").filter(Boolean);
  // parts: ["checkout", "<id>"]
  if (parts[0] !== "checkout") return null;
  const id = Number(parts[1]);
  return Number.isFinite(id) ? id : null;
}

export function mountCheckout(root) {
  const id = getEventIdFromHash();
  const ev = events.find((e) => e.id === id);

  if (!ev) {
    root.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="panel">
            <h1 class="h2">Compra não encontrada</h1>
            <p class="muted">Volte para os eventos.</p>
            <a class="btn btn--primary" href="#/">Voltar</a>
          </div>
        </div>
      </section>
    `;
    return;
  }

  const price = parsePriceBRL(ev.price);

  root.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="checkoutGrid">
          <div class="panel">
            <div class="row row--tight">
              <h1 class="h2">Finalizar compra</h1>
              <a class="link" href="#/">Voltar</a>
            </div>

            <h2 class="h3">Evento</h2>
            <div class="row" style="gap:12px; align-items:flex-start;">
              <div style="width:96px; height:72px; border-radius:14px; overflow:hidden; border:1px solid var(--border); background: var(--panel2)">
                <img src="${escapeHtml(ev.image)}" alt="${escapeHtml(ev.title)}" style="width:100%; height:100%; object-fit:cover; display:block;" />
              </div>
              <div class="grow">
                <div style="font-weight:900; margin-bottom:6px;">${escapeHtml(ev.title)}</div>
                <div class="muted small">${escapeHtml(ev.date)}</div>
                <div class="muted small">${escapeHtml(ev.location)}</div>
                <div style="margin-top:10px; font-weight:900;">Preço: ${escapeHtml(ev.price)}</div>
              </div>
            </div>

            <h2 class="h3">Quantidade</h2>
            <div class="row" style="gap:10px; align-items:center;">
              <input id="qty" class="input qtyInput" type="number" min="1" value="1" />
              <button id="plus" class="btn" type="button">+</button>
              <button id="minus" class="btn" type="button">-</button>
            </div>

            <div class="row row--tight" style="margin-top:14px;">
              <span class="muted">Total</span>
              <strong id="total" style="font-size:1.2rem;">${formatBRL(price)}</strong>
            </div>

            <div style="margin-top:14px;">
              <button id="confirm" class="btn btn--primary full" type="button">Confirmar compra</button>
              <p class="muted small" style="margin-top:10px;">Pagamento e confirmação são mock (sem backend).</p>
            </div>
          </div>

          <div class="panel">
            <h2 class="h3">Resumo</h2>
            <div class="tableWrap">
              <table class="table" style="min-width:0;">
                <tbody>
                  <tr>
                    <td class="muted">Categoria</td>
                    <td style="font-weight:800;">${escapeHtml(ev.category)}</td>
                  </tr>
                  <tr>
                    <td class="muted">Preço unitário</td>
                    <td style="font-weight:800;">${escapeHtml(ev.price)}</td>
                  </tr>
                  <tr>
                    <td class="muted">Quantidade</td>
                    <td style="font-weight:800;" id="qtyText">1</td>
                  </tr>
                  <tr>
                    <td class="muted">Total</td>
                    <td style="font-weight:900;" id="totalText">${formatBRL(price)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const qtyInput = root.querySelector("#qty");
  const qtyText = root.querySelector("#qtyText");
  const totalEl = root.querySelector("#total");
  const totalText = root.querySelector("#totalText");
  const plusBtn = root.querySelector("#plus");
  const minusBtn = root.querySelector("#minus");
  const confirmBtn = root.querySelector("#confirm");

  function clampQty(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return 1;
    return Math.max(1, Math.min(10, Math.floor(x)));
  }

  function recalc() {
    const qty = clampQty(qtyInput.value);
    qtyInput.value = String(qty);
    qtyText.textContent = String(qty);
    const total = price * qty;
    const formatted = formatBRL(total);
    totalEl.textContent = formatted;
    totalText.textContent = formatted;
  }

  qtyInput.addEventListener("input", recalc);
  plusBtn.addEventListener("click", () => {
    qtyInput.value = String(clampQty(qtyInput.value) + 1);
    recalc();
  });
  minusBtn.addEventListener("click", () => {
    qtyInput.value = String(clampQty(qtyInput.value) - 1);
    recalc();
  });

  confirmBtn.addEventListener("click", () => {
    const qty = clampQty(qtyInput.value);
    const total = price * qty;
    alert(`Compra confirmada (mock): ${ev.title}\nQuantidade: ${qty}\nTotal: ${formatBRL(total)}`);
    location.hash = "#/usuario";
  });

  recalc();
}

