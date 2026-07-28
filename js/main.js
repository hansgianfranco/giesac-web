'use strict';

/* Header scroll */
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

/* Mobile menu */
const mobileMenu = document.getElementById('mobileMenu');
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileClose = document.querySelector('.mobile-menu .close');

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
}

if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
if (mobileClose) mobileClose.addEventListener('click', toggleMenu);

/* Intersection Observer */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade').forEach(el => io.observe(el));
