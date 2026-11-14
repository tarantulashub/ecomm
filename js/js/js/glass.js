// ============================================
// glass.js · la luz del vidrio sigue tu dedo / mouse
// ============================================

export function iniciarVidrio() {
  const raiz = document.documentElement;

  // Luz general de la pantalla
  const mover = (x, y) => {
    raiz.style.setProperty("--mx", `${(x / innerWidth) * 100}%`);
    raiz.style.setProperty("--my", `${(y / innerHeight) * 100}%`);
  };

  // Reflejo local en cada botón / panel de vidrio
  const iluminar = (el, x, y) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--lx", `${x - r.left}px`);
    el.style.setProperty("--ly", `${y - r.top}px`);
    el.classList.add("is-lit");
  };

  const apagar = (el) => el.classList.remove("is-lit");

  const objetivos = document.querySelectorAll(".btn, .glass");

  addEventListener("pointermove", (e) => {
    mover(e.clientX, e.clientY);
    objetivos.forEach((el) => {
      const r = el.getBoundingClientRect();
      const cerca = e.clientX > r.left - 40 && e.clientX < r.right + 40 &&
                    e.clientY > r.top - 40 && e.clientY < r.bottom + 40;
      cerca ? iluminar(el, e.clientX, e.clientY) : apagar(el);
    });
  }, { passive: true });

  addEventListener("pointerup", () => objetivos.forEach(apagar));

  // En el celular, inclinar el teléfono también mueve la luz (si el aparato lo permite)
  addEventListener("deviceorientation", (e) => {
    if (e.gamma == null || e.beta == null) return;
    const x = (Math.max(-30, Math.min(30, e.gamma)) + 30) / 60 * innerWidth;
    const y = (Math.max(0, Math.min(60, e.beta)) / 60) * innerHeight;
    mover(x, y);
  }, { passive: true });
}
