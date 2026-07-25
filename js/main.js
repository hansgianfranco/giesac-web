/* Header scroll */
window.addEventListener('scroll',()=>{
  document.getElementById('mainHeader').classList.toggle('scrolled', window.scrollY>50);
});

/* Mobile menu */
function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* Intersection Observer */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); }
  });
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));
