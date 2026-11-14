// ============================================
// main.js · une todos los módulos
// ============================================
import { LINKS } from "./config.js";
import { iniciarTelegram, obtenerUsuario, abrirEnlace } from "./telegram.js";
import { registrarVisita, registrarEvento } from "./supabase.js";
import { fraseSegunHora, PREGUNTA_PRIMERA_VEZ } from "./greetings.js";
import { iniciarTema } from "./theme.js";
import { iniciarVidrio } from "./glass.js";

const $ = (id) => document.getElementById(id);

// ---------- Logo: si no existe la imagen, deja el recuadro punteado ----------
function iniciarLogo() {
  const img = $("logo-img");
  const caja = $("logo-box");
  img.addEventListener("load", () => caja.classList.add("has-logo"));
  img.addEventListener("error", () => img.remove());
}

// ---------- Texto con el nombre en negrita (sin usar innerHTML = seguro) ----------
function escribirFrase(elemento, plantilla, nombre) {
  elemento.textContent = "";
  plantilla.split("{n}").forEach((trozo, i, partes) => {
    elemento.append(trozo);
    if (i < partes.length - 1) {
      const negrita = document.createElement("strong");
      negrita.textContent = nombre;
      elemento.append(negrita);
    }
  });
}

// ---------- Saludo ----------
function mostrarSaludo(usuario, visita) {
  const hola = $("hello");
  const pregunta = $("question");

  // Primera vez (según Supabase). Si Supabase falla, usamos el saludo normal.
  if (visita?.esNueva) {
    hola.hidden = false;
    hola.textContent = `Hola, ${usuario.nombreMostrar} 👋`;
    pregunta.textContent = PREGUNTA_PRIMERA_VEZ;
  } else {
    hola.hidden = true;
    escribirFrase(pregunta, fraseSegunHora(), usuario.nombreMostrar);
  }
}

// ---------- Aviso flotante ----------
let temporizador;
function aviso(texto) {
  const t = $("toast");
  t.textContent = texto;
  t.classList.add("show");
  clearTimeout(temporizador);
  temporizador = setTimeout(() => t.classList.remove("show"), 2200);
}

// ---------- Botones ----------
function iniciarBotones(usuario) {
  document.querySelectorAll("[data-action]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const accion = boton.dataset.action;           // explorar | soporte | faq
      registrarEvento(usuario.id, `click_${accion}`); // queda anotado en Supabase
      if (!abrirEnlace(LINKS[accion])) aviso("Próximamente");
    });
  });
}

// ---------- Arranque ----------
async function arrancar() {
  iniciarTelegram();
  iniciarLogo();
  iniciarVidrio();
  iniciarTema($("theme-toggle"), (tema) => registrarEvento(usuario.id, `tema_${tema}`));

  const usuario = obtenerUsuario();
  iniciarBotones(usuario);

  // Mientras Supabase responde, mostramos el saludo normal (no se ve vacío)
  mostrarSaludo(usuario, null);

  const visita = await registrarVisita(usuario);
  if (visita) mostrarSaludo(usuario, visita);
}

arrancar();
