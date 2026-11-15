// ============================================
// explorar.js · página "Productos y servicios"
// Usa los mismos módulos que el inicio.
// ============================================
import { iniciarTelegram, obtenerUsuario, abrirEnlace, tg } from "./telegram.js";
import { registrarEvento } from "./supabase.js";
import { iniciarTema } from "./theme.js";
import { iniciarVidrio } from "./glass.js";
import { PRODUCTOS, SERVICIOS } from "./catalogo.js";

const $ = (id) => document.getElementById(id);
const usuario = obtenerUsuario();
let categoriaAbierta = null;

// "Pantalones caballero – Lee" → "pantalones-caballero-lee" (para anotar en Supabase)
const slug = (t) =>
  t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
   .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// ---------- Aviso flotante ----------
let temporizador;
function aviso(texto) {
  const t = $("toast");
  t.textContent = texto;
  t.classList.add("show");
  clearTimeout(temporizador);
  temporizador = setTimeout(() => t.classList.remove("show"), 2200);
}

// ---------- Tarjetas y carruseles ----------
function crearTarjeta(emoji, nombre, alTocar) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "tile";

  const e = document.createElement("span");
  e.className = "tile__emoji";
  e.textContent = emoji;

  const n = document.createElement("span");
  n.className = "tile__nombre";
  n.textContent = nombre;

  b.append(e, n);
  if (alTocar) b.addEventListener("click", alTocar);
  else b.disabled = true;
  return b;
}

function configurarFlechas(caja, pista) {
  const izq = caja.querySelector(".flecha--izq");
  const der = caja.querySelector(".flecha--der");
  const paso = () => Math.max(pista.clientWidth * 0.8, 140);

  const actualizar = () => {
    const max = pista.scrollWidth - pista.clientWidth;
    izq.hidden = pista.scrollLeft <= 4;
    der.hidden = pista.scrollLeft >= max - 4;
  };

  izq.addEventListener("click", () => pista.scrollBy({ left: -paso(), behavior: "smooth" }));
  der.addEventListener("click", () => pista.scrollBy({ left: paso(), behavior: "smooth" }));
  pista.addEventListener("scroll", actualizar, { passive: true });
  addEventListener("resize", actualizar);
  addEventListener("load", actualizar);
  actualizar();
}

function pintarCarrusel(idPista, lista) {
  const pista = $(idPista);
  pista.textContent = "";

  if (lista.length === 0) {
    pista.append(crearTarjeta("⏳", "Próximamente", null));
  } else {
    lista.forEach((cat) =>
      pista.append(crearTarjeta(cat.emoji, cat.nombre, () => abrirCategoria(cat)))
    );
  }
  configurarFlechas(pista.parentElement, pista);
}

// ---------- Categoría abierta (lista de artículos) ----------
function abrirCategoria(cat) {
  categoriaAbierta = cat;
  registrarEvento(usuario.id, `cat_${cat.id}`);

  $("cat-titulo").textContent = `${cat.emoji} ${cat.nombre}`;
  const lista = $("lista");
  lista.textContent = "";

  if (!cat.articulos?.length) {
    const p = document.createElement("p");
    p.className = "vacio";
    p.textContent = "Próximamente";
    lista.append(p);
  }

  (cat.articulos ?? []).forEach((art) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn--sky";
    b.textContent = art.nombre;
    b.addEventListener("click", () => {
      registrarEvento(usuario.id, `item_${cat.id}_${slug(art.nombre)}`);
      if (!abrirEnlace(art.enlace)) aviso("Próximamente");
    });
    lista.append(b);
  });

  $("vista-inicio").hidden = true;
  $("vista-categoria").hidden = false;
  scrollTo({ top: 0 });
}

function cerrarCategoria() {
  categoriaAbierta = null;
  $("vista-categoria").hidden = true;
  $("vista-inicio").hidden = false;
}

// ---------- Volver ----------
function volver() {
  if (categoriaAbierta) { cerrarCategoria(); return; }
  if (tg && tg.BackButton) {
    tg.BackButton.hide();
  }
  if (history.length > 1) history.back();
  else window.location.href = "index.html";
}

function iniciarVolver() {
  // Dentro de Telegram se usa su flecha nativa; en el navegador (computadora) el botón "← Volver"
  const nativo = !!(tg && tg.initData && tg.BackButton && tg.isVersionAtLeast?.("6.1"));
  if (nativo) {
    tg.BackButton.onClick(volver);
    tg.BackButton.show();
    $("barra-volver").hidden = true;
  } else {
    $("btn-volver").addEventListener("click", volver);
  }
  addEventListener("keydown", (e) => { if (e.key === "Escape") volver(); });
}

// ---------- Arranque ----------
function arrancar() {
  iniciarTelegram();
  pintarCarrusel("pista-productos", PRODUCTOS);
  pintarCarrusel("pista-servicios", SERVICIOS);
  iniciarVolver();
  iniciarVidrio();
  iniciarTema($("theme-toggle"), (tema) => registrarEvento(usuario.id, `tema_${tema}`));
  registrarEvento(usuario.id, "vista_explorar");
}

arrancar();
