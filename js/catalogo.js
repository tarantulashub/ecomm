// ============================================
// catalogo.js · AQUÍ pegas tus categorías, artículos y enlaces
// ============================================
//
// Cómo agregar un ARTÍCULO: copia una línea { nombre: "...", enlace: "..." }
// Cómo agregar una CATEGORÍA (tarjeta): copia un bloque completo { id: ..., emoji: ..., ... }
//
// Reglas: cada línea termina en coma, los textos van entre comillas,
// y "id" va en minúsculas, sin espacios ni tildes (ej: "cargadores").
// Si "enlace" está vacío "", al tocarlo sale "Próximamente".

export const PRODUCTOS = [
  {
    id: "ropa",
    emoji: "👕",
    nombre: "Ropa",
    articulos: [
      { nombre: "Pantalones para caballeros – Lee",   enlace: "https://telegra.ph/catalogo-de-pantalones-lee-11-10" },  // pega aquí el enlace de telegra.ph
      { nombre: "Pantalones para caballeros – Levi's", enlace: "https://telegra.ph/catalogo-de-pantalones-levis-11-10" },
      { nombre: "Pantalones para caballeros – Wranglers",   enlace: "https://telegra.ph/catalogo-de-pantalones-wrangler-11-10" },
    ],
  },

  // Ejemplo para otra tarjeta (quita las // para activarla):
  // {
  //   id: "cargadores",
  //   emoji: "🔌",
  //   nombre: "Cargadores",
  //   articulos: [
  //     { nombre: "Cargador rápido", enlace: "" },
  //   ],
  // },
];

// Servicios: por ahora vacío (se muestra una tarjeta "Próximamente").
// Para agregar uno, usa el mismo formato que en PRODUCTOS.
export const SERVICIOS = [];
