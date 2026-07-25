document.getElementById('cotForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Solicitud enviada ✓';
  btn.style.background = 'var(--ink)';
  btn.style.color = 'var(--bg1)';
  setTimeout(()=>{
    btn.textContent = 'Enviar solicitud →';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
});
