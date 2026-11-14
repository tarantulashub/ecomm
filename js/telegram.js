// ============================================
// telegram.js · lee los datos del usuario desde Telegram
// ============================================
import { NOMBRE_COMODIN } from "./config.js";

export const tg = window.Telegram?.WebApp ?? null;

// Convierte cualquier cosa rara (null, undefined, vacío) en texto limpio
const limpio = (valor) => (typeof valor === "string" ? valor.trim() : "");

export function iniciarTelegram() {
  if (!tg) return;
  tg.ready();    // avisa a Telegram que la app cargó
  tg.expand();   // abre a pantalla completa
}

// Devuelve SIEMPRE un objeto seguro, nunca "undefined"
export function obtenerUsuario() {
  const u = tg?.initDataUnsafe?.user;

  const primerNombre = limpio(u?.first_name);
  const apellido = limpio(u?.last_name);
  const username = limpio(u?.username);

  return {
    id: u?.id ?? null,            // null = abierto fuera de Telegram (pruebas)
    username,
    primerNombre,
    apellido,
    // Nombre para mostrar: nombre → @username → comodín
    nombreMostrar: primerNombre || username || NOMBRE_COMODIN,
  };
}

export function abrirEnlace(url) {
  if (!url) return false;
  if (tg && /^https:\/\/t\.me\//.test(url)) tg.openTelegramLink(url);
  else if (tg) tg.openLink(url);
  else window.open(url, "_blank");
  return true;
}

export const esquemaTelegram = () => tg?.colorScheme ?? null; // "light" | "dark"
