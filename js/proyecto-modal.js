/* ============================================================
   GIESAC — Modal de detalle de proyecto (con carrusel de fotos)
   Depende de window.PROYECTOS (js/proyectos-data.js).
   Expone: window.openProyectoModal(id)
   ============================================================ */
(function () {
  'use strict';

  let modal = null;
  let fotos = [];
  let current = 0;

  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'proy-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="proy-modal__overlay" data-close></div>
      <div class="proy-modal__panel" role="document">
        <button class="proy-modal__close" type="button" aria-label="Cerrar proyecto" data-close>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <div class="proy-modal__carousel">
          <img class="proy-modal__img" src="" alt="">
          <button class="proy-modal__nav proy-modal__nav--prev" type="button" aria-label="Foto anterior">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5L8 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="proy-modal__nav proy-modal__nav--next" type="button" aria-label="Foto siguiente">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <span class="proy-modal__counter" aria-hidden="true"></span>
        </div>
        <div class="proy-modal__info">
          <span class="proy-modal__tag"></span>
          <h3 class="proy-modal__name"></h3>
          <p class="proy-modal__meta"></p>
          <p class="proy-modal__desc"></p>
          <span class="proy-modal__cliente"></span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('[data-close]').addEventListener('click', closeModal);
    modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
    modal.querySelector('.proy-modal__nav--prev').addEventListener('click', () => go(current - 1));
    modal.querySelector('.proy-modal__nav--next').addEventListener('click', () => go(current + 1));
  }

  function go(index) {
    if (!fotos.length) return;
    current = ((index % fotos.length) + fotos.length) % fotos.length;
    const img = modal.querySelector('.proy-modal__img');
    img.src = fotos[current];
    modal.querySelector('.proy-modal__counter').textContent = (current + 1) + ' / ' + fotos.length;
    updateNav();
  }

  function updateNav() {
    const single = fotos.length <= 1;
    modal.querySelector('.proy-modal__nav--prev').classList.toggle('slider-btn--hidden', current === 0 || single);
    modal.querySelector('.proy-modal__nav--next').classList.toggle('slider-btn--hidden', current === fotos.length - 1 || single);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  window.openProyectoModal = function (id) {
    const project = (window.PROYECTOS || []).find((p) => p.id === id);
    if (!project) return;

    if (!modal) buildModal();

    fotos = project.fotos && project.fotos.length ? project.fotos : [project.img || 'images/recurso-1.webp'];

    modal.querySelector('.proy-modal__img').alt = project.nombre;
    modal.querySelector('.proy-modal__tag').textContent = project.tipo;
    modal.querySelector('.proy-modal__name').textContent = project.nombre;
    modal.querySelector('.proy-modal__meta').textContent = project.ubicacion + ' · ' + project.anio;
    modal.querySelector('.proy-modal__desc').textContent = project.desc || '';
    modal.querySelector('.proy-modal__cliente').textContent = project.cliente && project.cliente !== '—' ? 'Cliente: ' + project.cliente : '';

    go(0);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });
})();
