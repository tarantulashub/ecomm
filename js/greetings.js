// ============================================
// greetings.js · saludos según la hora
// Cada frase tiene 2 partes:
//   saludo   → va ARRIBA A LA IZQUIERDA, en negrita
//   pregunta → va AL CENTRO, en cursiva
// {n} se reemplaza por el nombre.
// Cada franja es una LISTA: si agregas más frases, se elige una al azar (rotativo).
// ============================================

const FRANJAS = [
  { desde: 6,  hasta: 8,  frases: [{ saludo: "Buenos días, {n}.🌞",   pregunta: "¿Qué te gustaría buscar esta mañana?☕" }] },
  { desde: 9,  hasta: 9,  frases: [{ saludo: "Hola de nuevo, {n}.😃", pregunta: "¿Seguimos viendo los productos de hoy?🧐" }] },
  { desde: 10, hasta: 11, frases: [{ saludo: "¿Qué tal, {n}?🤠",      pregunta: "¿Listo para elegir tu producto ideal?🫡" }] },
  { desde: 12, hasta: 14, frases: [{ saludo: "Buenas tardes, {n}.🏜️", pregunta: "¿Qué prenda cazamos esta tarde?🤔" }] },
  { desde: 15, hasta: 15, frases: [{ saludo: "Hola otra vez, {n}.🏙️", pregunta: "¿Echando un vistazo al catálogo?🙃" }] },
  { desde: 16, hasta: 18, frases: [{ saludo: "Qué gusto verte de nuevo, {n}.😄", pregunta: "¿Qué te llamó la atención?😏" }] },
  { desde: 19, hasta: 20, frases: [{ saludo: "Buenas noches, {n}.🌃", pregunta: "¿Qué tal un vistazo al catálogo esta noche?📖" }] },
  { desde: 21, hasta: 21, frases: [{ saludo: "Hola de nuevo a esta hora, {n}.🌙", pregunta: "¿Buscando qué comprar? Explora el catálogo.🔍" }] },
  // 22:00 a 5:59 (madrugada) se maneja como "resto"
];

const MADRUGADA = [{ saludo: "Aún por aquí, {n}.🌌", pregunta: "¿Terminando de armar tu pedido?😳" }];

// Primera vez
export const SALUDO_PRIMERA_VEZ = "Hola, {n} 👋";
export const PREGUNTA_PRIMERA_VEZ = "¿Qué desea hacer hoy?";

export function fraseSegunHora(fecha = new Date()) {
  const h = fecha.getHours();
  const franja = FRANJAS.find((f) => h >= f.desde && h <= f.hasta);
  const lista = franja ? franja.frases : MADRUGADA;
  return lista[Math.floor(Math.random() * lista.length)];
}
