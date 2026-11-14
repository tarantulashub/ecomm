// ============================================
// supabase.js · habla con la base de datos
// ============================================
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const configurado =
  SUPABASE_URL && !SUPABASE_URL.startsWith("PEGA") &&
  SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.startsWith("PEGA");

const cliente = configurado && window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Registra la visita. Supabase decide si es primera vez o no.
 * Devuelve { esNueva, visitas, ultimaVisita }
 * Si algo falla, devuelve null (la app sigue funcionando igual).
 */
export async function registrarVisita(usuario) {
  if (!cliente || !usuario.id) return null;
  try {
    const { data, error } = await cliente.rpc("registrar_visita", {
      p_id: usuario.id,
      p_username: usuario.username || null,
      p_nombre: usuario.primerNombre || null,
      p_apellido: usuario.apellido || null,
    });
    if (error) throw error;
    return {
      esNueva: !!data.es_nueva,
      visitas: data.visitas,
      ultimaVisita: data.ultima_visita,
    };
  } catch (e) {
    console.warn("Supabase (visita):", e.message);
    return null;
  }
}

/** Anota una interacción, por ejemplo: registrarEvento(id, "click_explorar") */
export async function registrarEvento(usuarioId, tipo) {
  if (!cliente || !usuarioId) return;
  try {
    await cliente.rpc("registrar_evento", { p_id: usuarioId, p_tipo: tipo });
  } catch (e) {
    console.warn("Supabase (evento):", e.message);
  }
}
