/* ============================================================
   GIESAC — Proyectos: buscador, filtros, orden y vista grilla/listado
   Depende de window.PROYECTOS (js/proyectos-data.js) y
   window.openProyectoModal (js/proyecto-modal.js).
   ============================================================ */
(function () {
  'use strict';

  const PROYECTOS = window.PROYECTOS || [];

  const state = { search: '', tipo: '', ubicacion: '', order: 'recientes', view: 'grid' };

  const $toolbar = document.getElementById('toolbar');
  const $grid = document.getElementById('grid');
  const $contador = document.getElementById('contador');
  const $search = document.getElementById('proySearch');

  if (!$toolbar || !$grid) return;

  // ---- Construir opciones únicas de los dropdowns a partir de los datos ----
  function buildOptions(field) {
    return Array.from(new Set(PROYECTOS.map((p) => p[field]))).sort((a, b) =>
      a.localeCompare(b, 'es')
    );
  }

  function buildFilterMenu(filterEl, field, defaultLabel) {
    const menu = filterEl.querySelector('.proy-filter__menu');
    const opts = buildOptions(field);
    let html =
      '<button type="button" class="proy-filter__item active" data-value="">' +
      defaultLabel +
      '</button>';
    opts.forEach((opt) => {
      html += `<button type="button" class="proy-filter__item" data-value="${opt}">${opt}</button>`;
    });
    menu.innerHTML = html;
  }

  const $filterTipo = document.getElementById('filterTipo');
  const $filterUbicacion = document.getElementById('filterUbicacion');
  buildFilterMenu($filterTipo, 'tipo', 'Todos los tipos');
  buildFilterMenu($filterUbicacion, 'ubicacion', 'Todas las ubicaciones');

  // ---- Interacción de dropdowns ----
  function closeAllFilters(except) {
    document.querySelectorAll('.proy-filter.is-open').forEach((el) => {
      if (el !== except) {
        el.classList.remove('is-open');
        el.querySelector('.proy-filter__toggle').setAttribute('aria-expanded', 'false');
      }
    });
  }

  [$filterTipo, $filterUbicacion].forEach((filterEl) => {
    const field = filterEl.dataset.filter === 'tipo' ? 'tipo' : 'ubicacion';
    const toggle = filterEl.querySelector('.proy-filter__toggle');
    const label = filterEl.querySelector('.proy-filter__label');
    const menu = filterEl.querySelector('.proy-filter__menu');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = filterEl.classList.contains('is-open');
      closeAllFilters();
      filterEl.classList.toggle('is-open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    menu.addEventListener('click', (e) => {
      const item = e.target.closest('.proy-filter__item');
      if (!item) return;
      const value = item.dataset.value;
      state[field] = value;
      label.textContent = value || label.dataset.default;
      menu.querySelectorAll('.proy-filter__item').forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
      filterEl.classList.toggle('proy-filter--active', !!value);
      filterEl.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      render();
    });

    label.dataset.default = label.textContent;
  });

  document.addEventListener('click', () => closeAllFilters());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllFilters();
  });

  // ---- Buscador ----
  if ($search) {
    $search.addEventListener('input', (e) => {
      state.search = e.target.value.trim().toLowerCase();
      render();
    });
  }

  // ---- Orden ----
  $toolbar.querySelectorAll('.proy-orderby__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.order = btn.dataset.order;
      $toolbar
        .querySelectorAll('.proy-orderby__btn')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });

  // ---- Vista grilla / listado ----
  const $viewBtns = $toolbar.querySelectorAll('.proy-view__btn');
  $viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.view = btn.dataset.view;
      $viewBtns.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      $grid.classList.toggle('proyectos-grid--list', state.view === 'list');
      render();
    });
  });

  // ---- Filtrado, orden y render ----
  function getFiltered() {
    let list = PROYECTOS.filter((p) => {
      const matchSearch = !state.search || p.nombre.toLowerCase().includes(state.search);
      const matchTipo = !state.tipo || p.tipo === state.tipo;
      const matchUbicacion = !state.ubicacion || p.ubicacion === state.ubicacion;
      return matchSearch && matchTipo && matchUbicacion;
    });

    list = list.slice().sort((a, b) => {
      if (state.order === 'alfabetico') {
        return a.nombre.localeCompare(b.nombre, 'es');
      }
      return b.anio - a.anio;
    });

    return list;
  }

  function render() {
    const list = getFiltered();

    $contador.textContent = list.length
      ? `${list.length} proyecto${list.length === 1 ? '' : 's'}`
      : '';

    if (!list.length) {
      $grid.innerHTML = '<p class="proy-empty">No se encontraron proyectos con estos filtros.</p>';
      return;
    }

    $grid.innerHTML = list
      .map((p, i) => {
        const num = String(i + 1).padStart(2, '0');
        return `
        <div class="proyecto" role="button" tabindex="0" data-id="${p.id}" aria-label="Ver proyecto ${p.nombre}">
          <img src="${p.fotos[0]}" alt="${p.nombre}" loading="lazy" decoding="async">
          <div class="overlay" aria-hidden="true"></div>
          <span class="num-tag">${num}/${String(list.length).padStart(2, '0')}</span>
          <span class="cliente-tag">${p.cliente}</span>
          <div class="proyecto-info">
            <h4>${p.nombre}</h4>
            <p class="loc">${p.ubicacion} · ${p.tipo}</p>
            <p class="ficha">${p.anio}</p>
          </div>
        </div>`;
      })
      .join('');

    $grid.querySelectorAll('.proyecto').forEach((card) => {
      const open = () => {
        if (window.openProyectoModal) window.openProyectoModal(card.dataset.id);
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  }

  render();
})();
