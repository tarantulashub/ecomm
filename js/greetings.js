// ============================================
// greetings.js · saludos según la hora
// {n} se reemplaza por el nombre.
// Cada franja es una LISTA: si agregas más frases, se elige una al azar (rotativo).
// ============================================

const FRANJAS = [
  { desde: 6,  hasta: 8,  frases: ["Buenos días, {n}. ¿Qué te gustaría buscar esta mañana?"] },
  { desde: 9,  hasta: 9,  frases: ["Hola de nuevo, {n}. ¿Seguimos viendo los productos de hoy?"] },
  { desde: 10, hasta: 11, frases: ["¿Qué tal, {n}? ¿Listo para elegir tu producto ideal?"] },
  { desde: 12, hasta: 14, frases: ["Buenas tardes, {n}. ¿Qué prenda cazamos esta tarde?"] },
  { desde: 15, hasta: 15, frases: ["Hola otra vez, {n}. ¿Echando un vistazo al catálogo?"] },
  { desde: 16, hasta: 18, frases: ["Qué gusto verte de nuevo, {n}. ¿Qué te llamó la atención?"] },
  { desde: 19, hasta: 20, frases: ["Buenas noches, {n}. ¿Qué tal un vistazo al catálogo esta noche?"] },
  { desde: 21, hasta: 21, frases: ["Hola de nuevo a esta hora, {n}. ¿Buscando qué comprar? Explora el catálogo."] },
  // 22:00 a 5:59 (madrugada) se maneja como "resto"
];

const MADRUGADA = ["Aún por aquí, {n}. ¿Terminando de armar tu pedido?"];

export const PREGUNTA_PRIMERA_VEZ = "¿Qué desea hacer hoy?";

export function fraseSegunHora(fecha = new Date()) {
  const h = fecha.getHours();
  const franja = FRANJAS.find((f) => h >= f.desde && h <= f.hasta);
  const lista = franja ? franja.frases : MADRUGADA;
  return lista[Math.floor(Math.random() * lista.length)];
}
