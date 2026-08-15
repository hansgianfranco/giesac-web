'use strict';

/* ============================================================
   Header scroll
   ============================================================ */
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      document.getElementById('mainHeader').classList.toggle('scrolled', window.scrollY > 50);
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

/* ============================================================
   Fullscreen overlay menu
   ============================================================ */
const menuBtn     = document.getElementById('menuBtn');
const siteOverlay = document.getElementById('siteOverlay');

function openOverlay() {
  menuBtn.classList.add('is-open');
  siteOverlay.classList.add('is-open');
  menuBtn.setAttribute('aria-expanded', 'true');
  siteOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overlay-open');
  menuBtn.setAttribute('aria-label', 'Cerrar menú');
}

function closeOverlay() {
  menuBtn.classList.remove('is-open');
  siteOverlay.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  siteOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('overlay-open');
  menuBtn.setAttribute('aria-label', 'Abrir menú');
}

function toggleOverlay() {
  if (siteOverlay.classList.contains('is-open')) {
    closeOverlay();
  } else {
    openOverlay();
  }
}

if (menuBtn) menuBtn.addEventListener('click', toggleOverlay);

/* Cerrar con Escape */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && siteOverlay.classList.contains('is-open')) {
    closeOverlay();
    menuBtn.focus();
  }
});

/* Cerrar al hacer click en un link del overlay */
if (siteOverlay) {
  siteOverlay.querySelectorAll('.site-overlay__link, .site-overlay__cta').forEach(link => {
    link.addEventListener('click', closeOverlay);
  });
}

/* ============================================================
   Intersection Observer — fade-in
   ============================================================ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade').forEach(el => io.observe(el));

/* ============================================================
   Projects Carousel — generic factory (classList-based)
   ============================================================ */
function initCarousel(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  if (!track || !prevBtn || !nextBtn) return;

  const slides = track.querySelectorAll('.projects-carousel__slide');
  let current = 0;
  const total = slides.length;

  function goTo(index) {
    current = ((index % total) + total) % total;
    slides.forEach((slide, i) => {
      slide.classList.toggle('projects-carousel__slide--active', i === current);
      slide.classList.toggle('projects-carousel__slide--prev', i < current);
    });
    track.setAttribute('data-current', current);
    track.setAttribute('aria-label', 'Slide ' + (current + 1) + ' de ' + total);
    updateArrows();
  }

  function updateArrows() {
    prevBtn.classList.toggle('slider-btn--hidden', current === 0);
    nextBtn.classList.toggle('slider-btn--hidden', current === total - 1);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  goTo(0);
}


/* ============================================================
   Carousel init (multifamiliar)
   ============================================================ */
initCarousel('carousel-multi-track', 'multi-prev', 'multi-next');
initCarousel('carousel-otros-track', 'otros-prev', 'otros-next');

/* ============================================================
   Intro Split — slider de textos (1/2)
   ============================================================ */
function initIntroSlider() {
  const track = document.getElementById('intro-slider-track');
  const prevBtn = document.getElementById('intro-prev');
  const nextBtn = document.getElementById('intro-next');
  const counter = document.getElementById('intro-slider-counter');
  if (!track || !prevBtn || !nextBtn) return;

  const slides = track.querySelectorAll('.intro-split__slide');
  const total = slides.length;
  let current = 0;

  function goTo(index) {
    current = ((index % total) + total) % total;
    slides.forEach((slide, i) => {
      slide.classList.toggle('intro-split__slide--active', i === current);
    });
    if (counter) counter.textContent = (current + 1) + '/' + total;
    updateArrows();
  }

  function updateArrows() {
    prevBtn.classList.toggle('slider-btn--hidden', current === 0);
    nextBtn.classList.toggle('slider-btn--hidden', current === total - 1);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  goTo(0);
}

initIntroSlider();

/* ============================================================
   Proyectos clickeables (home) → abren modal de detalle
   ============================================================ */
document.querySelectorAll('[data-proyecto]').forEach((el) => {
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  const open = () => {
    if (window.openProyectoModal) window.openProyectoModal(el.dataset.proyecto);
  };
  el.addEventListener('click', open);
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });
});
