// ============================================
// config.js · AQUÍ cambias tus datos (lo único que tienes que editar)
// ============================================

// 1) Supabase: lo encuentras en Project Settings → API
//    Usa la clave "anon public" (NUNCA la "service_role")
export const SUPABASE_URL = "PEGA_AQUI_TU_PROJECT_URL";
export const SUPABASE_ANON_KEY = "PEGA_AQUI_TU_ANON_KEY";

// 2) Enlaces de los botones (déjalos vacíos "" si aún no los tienes)
export const LINKS = {
  explorar: "",   // ej: "https://telegra.ph/tu-catalogo"
  soporte: "",    // ej: "https://t.me/tu_usuario_de_soporte"
  faq: "",        // ej: "https://telegra.ph/preguntas-frecuentes"
};

// 3) Texto que se usa cuando el usuario no tiene nombre en Telegram
export const NOMBRE_COMODIN = "amigo";
