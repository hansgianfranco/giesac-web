'use strict';

document.getElementById('cotForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const feedback = document.getElementById('formFeedback');
  btn.textContent = 'Solicitud enviada ✓';
  btn.classList.add('btn--submitted');
  if (feedback) {
    feedback.textContent = 'Solicitud enviada. Te contactaremos en 48 horas.';
    feedback.classList.add('visible');
  }
  setTimeout(() => {
    btn.textContent = 'Enviar solicitud →';
    btn.classList.remove('btn--submitted');
    if (feedback) {
      feedback.textContent = '';
      feedback.classList.remove('visible');
    }
    e.target.reset();
  }, 3000);
});
