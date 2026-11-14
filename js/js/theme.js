// ============================================
// theme.js · modo claro / oscuro
// ============================================
import { esquemaTelegram, tg } from "./telegram.js";

const CLAVE = "ecomm-tema";
const raiz = document.documentElement;

function guardado() {
  try { return localStorage.getItem(CLAVE); } catch { return null; }
}

function aplicar(tema) {
  raiz.dataset.theme = tema;
  try { localStorage.setItem(CLAVE, tema); } catch { /* sin almacenamiento */ }
  // Colorea la barra superior de Telegram para que combine
  try {
    tg?.setHeaderColor?.(tema === "dark" ? "#06111d" : "#dff1ff");
    tg?.setBackgroundColor?.(tema === "dark" ? "#06111d" : "#dff1ff");
  } catch { /* versiones viejas de Telegram */ }
}

export function iniciarTema(boton, alCambiar) {
  const inicial =
    guardado() ||
    esquemaTelegram() ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  aplicar(inicial);

  boton.addEventListener("click", () => {
    const nuevo = raiz.dataset.theme === "dark" ? "light" : "dark";
    aplicar(nuevo);
    alCambiar?.(nuevo);
  });
}
