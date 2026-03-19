export function mountLogin(root) {
  const auth = window.__auth;
  const ADMIN_EMAIL = "admin@email.com";
  const ADMIN_PASSWORD = "admin";

  root.innerHTML = `
    <section class="section">
      <div class="container narrow">
        <div class="panel">
          <h1 id="title">Entrar</h1>
          <p id="subtitle" class="muted small">Acesse sua conta</p>

          <form id="form" class="form">
            <div id="nameWrap" class="hidden">
              <label class="label" for="name">Nome completo</label>
              <input id="name" class="input" type="text" />
            </div>

            <div>
              <label class="label" for="email">Email</label>
              <input id="email" class="input" type="email" required />
            </div>

            <div>
              <label class="label" for="pass">Senha</label>
              <input id="pass" class="input" type="password" required />
            </div>

            <button class="btn btn--primary full" type="submit" id="submit">Entrar</button>
          </form>

          <p class="muted small center" style="margin:10px 0 0">
            Admin (mock): <strong>${ADMIN_EMAIL}</strong> / <strong>${ADMIN_PASSWORD}</strong>
          </p>

          <p class="muted small center">
            <span id="switchText">Não tem conta?</span>
            <button onClick="return false" class="link" id="switch" type="button">Cadastre-se</button>
          </p>
        </div>
      </div>
    </section>
  `;

  const title = root.querySelector("#title");
  const subtitle = root.querySelector("#subtitle");
  const nameWrap = root.querySelector("#nameWrap");
  const switchText = root.querySelector("#switchText");
  const switchBtn = root.querySelector("#switch");
  const submitBtn = root.querySelector("#submit");
  const form = root.querySelector("#form");

  let isRegister = false;

  function render() {
    title.textContent = isRegister ? "Criar Conta" : "Entrar";
    subtitle.textContent = isRegister ? "Preencha para se cadastrar" : "Acesse sua conta";
    nameWrap.classList.toggle("hidden", !isRegister);
    switchText.textContent = isRegister ? "Já tem conta?" : "Não tem conta?";
    switchBtn.textContent = isRegister ? "Entrar" : "Cadastre-se";
    submitBtn.textContent = isRegister ? "Cadastrar" : "Entrar";
  }

  render();

  switchBtn.addEventListener("click", () => {
    isRegister = !isRegister;
    render();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = root.querySelector("#email").value.trim();
    const password = root.querySelector("#pass").value;

    const isAdmin = email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    const role = isAdmin ? "admin" : "user";

    alert(`${isRegister ? "Cadastro" : "Login"} com: ${email} (mock)`);
    if (auth) auth.setSession({ email, role });
    location.hash = isAdmin ? "#/admin" : "#/usuario";
  });
}

