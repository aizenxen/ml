// Lightweight demo state. No backend. Just vibes.
const AUTH_KEY = "arm_auth";
const ATTEMPTS_KEY = "arm_login_attempts";

function isAuthed() {
  return localStorage.getItem(AUTH_KEY) === "1";
}

function requireAuth() {
  if (!isAuthed()) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "login.html";
}

function setAuthed() {
  localStorage.setItem(AUTH_KEY, "1");
}

function getAttempts() {
  return parseInt(localStorage.getItem(ATTEMPTS_KEY) || "0", 10);
}
function incAttempts() {
  const n = getAttempts() + 1;
  localStorage.setItem(ATTEMPTS_KEY, String(n));
  return n;
}
function resetAttempts() {
  localStorage.removeItem(ATTEMPTS_KEY);
}

// Modal utils
function openModal(id) {
  document.getElementById(id)?.classList.add("show");
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove("show");
}

// Bind logout if present
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  // Close modals on backdrop click
  document.querySelectorAll(".modal-backdrop").forEach(b => {
    b.addEventListener("click", e => {
      if (e.target.classList.contains("modal-backdrop")) {
        b.classList.remove("show");
      }
    });
  });
});

// Login handler
function handleLoginSubmit(e) {
  e.preventDefault();
  const loginEl = document.getElementById("login");
  const passEl = document.getElementById("password");
  const errorEl = document.getElementById("login-error");

  const login = loginEl.value.trim();
  const pass = passEl.value.trim();

  loginEl.classList.remove("error");
  passEl.classList.remove("error");
  errorEl.textContent = "";

  // Demo rules: both fields required, min password length 4
  if (!login || pass.length < 4) {
    const attempts = incAttempts();
    if (!login) loginEl.classList.add("error");
    if (pass.length < 4) passEl.classList.add("error");
    errorEl.textContent = `Неверные данные. Попытка ${attempts}. Требуется логин и пароль длиной ≥ 4 символов.`;
    return;
  }

  // Success
  setAuthed();
  resetAttempts();
  window.location.href = "experiments.html";
}

// Fake conditional activation for incident button on run page
function evaluateQualityGates() {
  const failChip = document.querySelector(".quality-fail");
  const incidentBtn = document.getElementById("create-incident-from-qg");
  if (failChip && incidentBtn) {
    incidentBtn.disabled = false;
    incidentBtn.classList.remove("secondary");
    incidentBtn.classList.add("warn");
  }
}

// Export helpers (mock)
function exportCSV() { alert("Экспорт CSV (заглушка)."); }
function exportPDF() { alert("Экспорт PDF (заглушка)."); }

// Report builder (mock)
function buildReportPreview() {
  const preview = document.getElementById("report-preview");
  if (!preview) return;
  preview.innerHTML = `
    <div class="chart">Здесь будет таблица и графики по выбранным параметрам (демо).</div>
    <div class="meta">Источник: эксперименты, run’ы, метрики, инциденты, аудит.</div>
  `;
}
