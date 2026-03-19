import { mountHome } from "./pages/home.js";
import { mountLogin } from "./pages/login.js";
import { mountUser } from "./pages/user.js";
import { mountAdmin } from "./pages/admin.js";
import { mountCheckout } from "./pages/checkout.js";

const routes = {
  "/": mountHome,
  "/login": mountLogin,
  "/usuario": mountUser,
  "/admin": mountAdmin,
};

function getSession() {
  try {
    const raw = localStorage.getItem("session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSession(session) {
  localStorage.setItem("session", JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem("session");
}

function getPathFromHash() {
  const hash = location.hash || "#/";
  const path = hash.startsWith("#") ? hash.slice(1) : hash;
  return path || "/";
}

function updateNav() {
  const s = getSession();
  const isAdmin = s && s.role === "admin";

  const navAdmin = document.getElementById("navAdmin");
  const navAdminMobile = document.getElementById("navAdminMobile");
  const navLogin = document.getElementById("navLogin");
  const navLoginMobile = document.getElementById("navLoginMobile");

  if (navAdmin) navAdmin.classList.toggle("hidden", !isAdmin);
  if (navAdminMobile) navAdminMobile.classList.toggle("hidden", !isAdmin);

  const loginLabel = s ? "Sair" : "Entrar";
  const loginHref = s ? "#/logout" : "#/login";

  if (navLogin) {
    navLogin.textContent = loginLabel;
    navLogin.setAttribute("href", loginHref);
  }
  if (navLoginMobile) {
    navLoginMobile.textContent = loginLabel;
    navLoginMobile.setAttribute("href", loginHref);
  }
}

function render() {
  const app = document.getElementById("app");
  const path = getPathFromHash();

  if (path === "/logout") {
    clearSession();
    location.hash = "#/";
    return;
  }

  if (path.startsWith("/checkout/")) {
    // "#/checkout/<id>" -> path becomes "/checkout/<id>" (hash query not supported)
    mountCheckout(app);
    updateNav();
    return;
  }

  if (path === "/admin") {
    const s = getSession();
    if (!s || s.role !== "admin") {
      location.hash = "#/login";
      return;
    }
  }

  const mount = routes[path] || routes["/"];
  mount(app);
  updateNav();
}

function setupMobileMenu() {
  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("mobileMenu");

  function close() {
    menu.classList.add("hidden");
    toggle.textContent = "☰";
    toggle.setAttribute("aria-label", "Abrir menu");
  }

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("hidden") === false;
    toggle.textContent = open ? "✕" : "☰";
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  window.addEventListener("hashchange", close);
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) close();
  });
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  if (!location.hash) location.hash = "#/";
  updateNav();
  render();
});

window.__auth = { getSession, setSession, clearSession };

