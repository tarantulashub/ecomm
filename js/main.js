// ============================================
// main.js · une todos los módulos
// ============================================
import { LINKS } from "./config.js";
import { iniciarTelegram, obtenerUsuario, abrirEnlace } from "./telegram.js";
import { registrarVisita, registrarEvento } from "./supabase.js";
import { fraseSegunHora, SALUDO_PRIMERA_VEZ, PREGUNTA_PRIMERA_VEZ } from "./greetings.js";
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

// ---------- Saludo (arriba, izquierda) + pregunta (centro) ----------
function mostrarSaludo(usuario, visita) {
  const hola = $("hello");
  const pregunta = $("question");

  let saludo, texto;
  if (visita?.esNueva) {
    // Primera vez (según Supabase)
    saludo = SALUDO_PRIMERA_VEZ;
    texto = PREGUNTA_PRIMERA_VEZ;
  } else {
    const f = fraseSegunHora();
    saludo = f.saludo;
    texto = f.pregunta;
  }

  // textContent = seguro (el nombre nunca se interpreta como código)
  hola.hidden = false;
  hola.textContent = saludo.replace("{n}", usuario.nombreMostrar);
  pregunta.textContent = texto;
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
  const usuario = obtenerUsuario();

  iniciarTelegram();
  iniciarLogo();
  iniciarVidrio();
  iniciarTema($("theme-toggle"), (tema) => registrarEvento(usuario.id, `tema_${tema}`));
  iniciarBotones(usuario);

  // Mientras Supabase responde, mostramos el saludo normal (no se ve vacío)
  mostrarSaludo(usuario, null);

  const visita = await registrarVisita(usuario);
  if (visita) mostrarSaludo(usuario, visita);
}

arrancar();
