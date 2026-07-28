'use strict';

const categorias = [
  { key: 'todos', label: 'Todos' },
  { key: 'multifamiliar', label: 'Vivienda multifamiliar' },
  { key: 'unifamiliar', label: 'Vivienda unifamiliar' },
  { key: 'comercial', label: 'Comercial' },
  { key: 'oficinas', label: 'Oficinas' },
  { key: 'hoteles', label: 'Hoteles' },
  { key: 'salud', label: 'Educación y salud' },
  { key: 'industrial', label: 'Industria y almacenes' },
  { key: 'institucional', label: 'Institucional' },
  { key: 'clubes', label: 'Clubes' },
];

document.getElementById('filtros').innerHTML = categorias.map((c, i) =>
  `<button class="filtro ${i === 0 ? 'active' : ''}" data-f="${c.key}">${c.label}</button>`
).join('');

const proyectos = [
  { n: '001', nombre: 'Condominio Cuattro', cliente: 'Grupo Líder', loc: 'Comas, Lima', cat: 'multifamiliar', area: '60,000 m²', desc: 'Diseño BIM colaborativo: eléctricas, sanitarias, mecánicas (CFD) y contra incendio.' },
  { n: '002', nombre: 'Multifamiliar Scala', cliente: 'Albamar Inmobiliaria', loc: 'Lima', cat: 'multifamiliar', area: '8,200 m²', desc: 'Diseño de instalaciones eléctricas, sanitarias, mecánicas y CFD.' },
  { n: '003', nombre: 'Fac. Oceanografía, Pesquería y Acuicultura — UNFV', cliente: 'UNFV', loc: 'Callao', cat: 'salud', area: '8,000 m²', desc: 'Instalaciones eléctricas, sanitarias, mecánicas, comunicaciones y costos.' },
  { n: '004', nombre: 'Aeropuerto Internacional Jorge Chávez', cliente: '—', loc: 'Callao', cat: 'institucional', area: '55,000 m²', desc: 'Estudio de flujo dinámico computacional (CFD) para confort térmico y eficiencia energética de la envolvente.' },
  { n: '005', nombre: 'Multifamiliar Marsano', cliente: 'Grupo Líder', loc: 'Miraflores', cat: 'multifamiliar', area: '10,000 m²', desc: 'Instalaciones eléctricas, mecánicas y sanitarias — certificación LEED.' },
  { n: '006', nombre: 'Multifamiliar Qanai', cliente: 'Grupo LAR', loc: 'La Victoria, Lima', cat: 'multifamiliar', area: '110,000 m²', desc: 'Ingeniería eléctrica para 8 torres — 1,100 viviendas.' },
  { n: '007', nombre: 'Multifamiliar Tovar', cliente: '—', loc: 'Miraflores', cat: 'multifamiliar', area: '3,100 m²', desc: 'Instalaciones eléctricas, mecánicas y sanitarias — certificación LEED.' },
  { n: '008', nombre: 'Centro de Monitoreo', cliente: '—', loc: 'Surco, Lima', cat: 'oficinas', area: '18,000 m²', desc: 'Instalaciones eléctricas, electromecánicas, sanitarias, costos y presupuestos.' },
  { n: '009', nombre: 'Hotel Marriott', cliente: '—', loc: 'Tarapoto, San Martín', cat: 'hoteles', area: '10,000 m²', desc: 'Estructuras e instalaciones eléctricas, mecánicas, sanitarias y contra incendio.' },
  { n: '010', nombre: 'Torre Tale', cliente: '—', loc: 'San Borja, Lima', cat: 'multifamiliar', area: '60,000 m²', desc: 'Instalaciones bajo metodología VDC/BIM y estudio de flujo dinámico computacional.' },
  { n: '011', nombre: 'Minka — Pabellones 1 y 3', cliente: 'Cheng Franco Arquitectos', loc: 'Callao', cat: 'comercial', area: '18,000 m²', desc: 'Estructuras e ingeniería eléctrica, mecánica, sanitaria y contra incendio.' },
  { n: '012', nombre: 'Centro de Convenciones', cliente: 'PUCP', loc: 'San Isidro, Lima', cat: 'institucional', area: '18,000 m²', desc: 'Evaluación de instalaciones eléctricas, mecánicas y sanitarias para certificación LEED Platinum.' },
  { n: '013', nombre: 'Remodelación Estadio Nacional', cliente: '—', loc: 'Lima', cat: 'institucional', area: '—', desc: 'Proyecto de referencia en la trayectoria de más de 13 años de la empresa.' },
  { n: '014', nombre: 'Multifamiliar Mirador II', cliente: 'TRES60 E.I.R.L.', loc: 'Breña, Lima', cat: 'multifamiliar', area: '13,000 m²', desc: 'Desarrollo de estructuras, instalaciones eléctricas e instalaciones sanitarias.' },
  { n: '015', nombre: 'Edificio de Oficinas — Los Negocios', cliente: 'TRES60 E.I.R.L.', loc: 'Surquillo, Lima', cat: 'oficinas', area: '3,000 m²', desc: 'Desarrollo de estructuras, instalaciones eléctricas e instalaciones sanitarias.' },
  { n: '016', nombre: 'Casa de Playa', cliente: 'Grid Arquitectos', loc: 'Playa Coral, Asia', cat: 'unifamiliar', area: '700 m²', desc: 'Desarrollo de ingeniería eléctrica, mecánica y estructuras.' },
  { n: '017', nombre: 'Oficinas VICSA', cliente: 'Math Construcción y Consultoría', loc: 'Ate, Lima', cat: 'oficinas', area: '200 m²', desc: 'Desarrollo de proyecto de estructuras e instalaciones sanitarias.' },
  { n: '018', nombre: 'Auditorio ICH', cliente: 'Shell Arquitectos', loc: 'Centro de Lima', cat: 'institucional', area: '950 m²', desc: 'Ingeniería eléctrica, mecánica y sanitaria, más proyecto de seguridad y evacuación.' },
  { n: '019', nombre: 'Clínica Oftalmológica', cliente: 'TRES60 E.I.R.L.', loc: 'Lince, Lima', cat: 'salud', area: '3,400 m²', desc: 'Ingeniería eléctrica, mecánica y sanitaria, incluye proyecto de gases medicinales.' },
  { n: '020', nombre: 'Colegio Futura Schools', cliente: 'Thiessen — Dirección de Proyectos', loc: 'Cerro Colorado, Arequipa', cat: 'salud', area: '600 m²', desc: 'Desarrollo de ingeniería eléctrica y sanitaria.' },
  { n: '021', nombre: 'Multifamiliar República de Panamá', cliente: 'Lima 1007 Arquitectos', loc: 'Barranco, Lima', cat: 'multifamiliar', area: '10,000 m²', desc: 'Ingeniería eléctrica, mecánica y sanitaria.' },
  { n: '022', nombre: 'Almacenes Rodasur', cliente: 'ILS Proyectos S.A.C.', loc: 'Lima', cat: 'industrial', area: '2,400 m²', desc: 'Desarrollo de estructuras, instalaciones eléctricas, mecánicas y sanitarias.' },
  { n: '023', nombre: 'Ampliación Planta Empaquetadora', cliente: 'Agrícola Cerro Prieto', loc: 'Chiclayo', cat: 'industrial', area: '26,000 m²', desc: 'Desarrollo de ingeniería eléctrica en media y baja tensión.' },
  { n: '024', nombre: 'Multifamiliar Icon', cliente: 'Lima 1007 Arquitectos', loc: 'Miraflores', cat: 'multifamiliar', area: '5,700 m²', desc: 'Instalaciones eléctricas, sanitarias y modelamiento BIM (CEPRES B).' },
  { n: '025', nombre: 'Club Polideportivo', cliente: 'Sayani Contratistas Generales', loc: 'Chachapoyas', cat: 'clubes', area: '1,500 m²', desc: 'Desarrollo de ingeniería sanitaria y de estructuras.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
];

const imagenes = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?auto=format&fit=crop&w=600&q=80',
];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderProyectos(filter) {
  const lista = proyectos.filter(p => filter === 'todos' || p.cat === filter);
  document.getElementById('contador').textContent = `${lista.length} proyecto${lista.length === 1 ? '' : 's'}`;
  document.getElementById('grid').innerHTML = lista.map((p, idx) => {
    const img = p.img || imagenes[(parseInt(p.n) - 1) % imagenes.length];
    return [
      '<div class="proyecto" data-cat="' + escapeHtml(p.cat) + '">',
      '  <img src="' + img + '" alt="' + escapeHtml(p.nombre) + '" loading="lazy">',
      '  <span class="num-tag">#' + escapeHtml(p.n) + '</span>',
      '  <span class="cliente-tag">' + escapeHtml(p.cliente !== '—' ? p.cliente : 'Ref.') + '</span>',
      '  <div class="overlay"></div>',
      '  <div class="proyecto-info">',
      '    <h4>' + escapeHtml(p.nombre) + '</h4>',
      '    <div class="loc">' + escapeHtml(p.loc + (p.area !== '—' ? ' · ' + p.area : '')) + '</div>',
      '    <div class="ficha">' + escapeHtml(p.desc) + '</div>',
      '  </div>',
      '</div>'
    ].join('');
  }).join('');
}

renderProyectos('todos');

document.querySelectorAll('.filtro').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProyectos(btn.dataset.f);
  });
});
