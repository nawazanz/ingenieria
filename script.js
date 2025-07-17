/* script.js – versión tarjetas con desbloqueo progresivo */

/* ---------------------------
 * CONFIGURACIÓN
 * --------------------------- */
const TOTAL_PROGRAMA = 152; // meta de referencia

/* ---------------------------
 * DATOS DEL PLAN (periodos I-IX)
 * Ajusta créditos/códigos si tienes datos más precisos
 * --------------------------- */
const CURSOS = [
  // --- I ---
  {periodo:"I", asignatura:"Química General", codigo:"100410", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"I", asignatura:"Biología", codigo:"100411", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"I", asignatura:"Pensamiento lógico y matemático", codigo:"100412", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"I", asignatura:"Competencias Comunicativas", codigo:"203138276", tipo:"Obligatorio", campo:"AIU", creditos:3},
  {periodo:"I", asignatura:"Inglés A1", codigo:"203138281", tipo:"Obligatorio", campo:"AIU", creditos:2},
  {periodo:"I", asignatura:"Introducción a la Ingeniería", codigo:"203138282", tipo:"Obligatorio", campo:"Disciplinar", creditos:4},
  {periodo:"I", asignatura:"Herramientas Digitales para la Gestión del Conocimiento", codigo:"203138284", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"I", asignatura:"Proyecto de Vida", codigo:"203138285", tipo:"Obligatorio", campo:"AIU", creditos:3},

  // --- II ---
  {periodo:"II", asignatura:"Cálculo Diferencial", codigo:"100413", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"II", asignatura:"Física General", codigo:"201015", tipo:"Obligatorio", campo:"IBC", creditos:2},
  {periodo:"II", asignatura:"Química Orgánica", codigo:"301103", tipo:"Obligatorio", campo:"IBC", creditos:4},
  {periodo:"II", asignatura:"Bioquímica", codigo:"203138274", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"II", asignatura:"Estadística y Probabilidad", codigo:"203138278", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"II", asignatura:"Dibujo de Ingeniería", codigo:"203138283", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"II", asignatura:"Electivo Disciplinar Común I", codigo:"", tipo:"Electivo", campo:"Disciplinar", creditos:0, linea:"Disciplinar Común"},

  // --- III ---
  {periodo:"III", asignatura:"Cálculo Integral", codigo:"201102", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"III", asignatura:"Fisicoquímica", codigo:"100416", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"III", asignatura:"Microbiología de los Alimentos", codigo:"201103", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"III", asignatura:"Ciencia de los Alimentos", codigo:"211619", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"III", asignatura:"Inglés A2", codigo:"203138280", tipo:"Obligatorio", campo:"AIU", creditos:3},
  {periodo:"III", asignatura:"Electivo Interdisciplinar Básico Común I", codigo:"", tipo:"Electivo", campo:"Complementaria", creditos:2, linea:"Interdisciplinar"},

  // --- IV ---
  {periodo:"IV", asignatura:"Ecuaciones Diferenciales", codigo:"201101", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"IV", asignatura:"Balance de Materia y Energía", codigo:"211624", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IV", asignatura:"Procesos de la Industria Alimentaria I", codigo:"203138275", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IV", asignatura:"Termodinámica", codigo:"203138279", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IV", asignatura:"Procesos de la Industria Alimentaria II", codigo:"203138277", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IV", asignatura:"Inglés B1+", codigo:"PEND", tipo:"Obligatorio", campo:"AIU", creditos:3},

  // --- V ---
  {periodo:"V", asignatura:"Manejo de materias primas alimentarias", codigo:"216010", tipo:"Obligatorio", campo:"Disciplinar", creditos:2},
  {periodo:"V", asignatura:"Mecánica de sólidos y fluídos", codigo:"211622", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"V", asignatura:"Cátedra Unadista", codigo:"201604", tipo:"Obligatorio", campo:"AIU", creditos:3},
  {periodo:"V", asignatura:"Engineering project II / Food quality and safety management", codigo:"202337120", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"V", asignatura:"Inglés B1", codigo:"100108", tipo:"Obligatorio", campo:"AIU", creditos:2},
  {periodo:"V", asignatura:"Electivo Disciplinar Común II", codigo:"203138286", tipo:"Electivo", campo:"Disciplinar", creditos:5, linea:"Disciplinar Común"},

  // --- VI ---
  {periodo:"VI", asignatura:"Procesos de conservación de alimentos", codigo:"203138287", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VI", asignatura:"Fenómenos de Transporte", codigo:"203138291", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VI", asignatura:"Ética y Ciudadanía", codigo:"203138295", tipo:"Obligatorio", campo:"AIU", creditos:3},
  {periodo:"VI", asignatura:"Fundamentos y Generalidades de Investigación", codigo:"40006", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"VI", asignatura:"Electivo Interdisciplinar Básico Común II", codigo:"301301", tipo:"Electivo", campo:"Complementaria", creditos:3, linea:"Interdisciplinar"},
  {periodo:"VI", asignatura:"Electivo Formación Complementaria I", codigo:"80005", tipo:"Electivo", campo:"Complementaria", creditos:2, linea:"Formación Complementaria"},

  // --- VII ---
  {periodo:"VII", asignatura:"Biotecnología Alimentaria", codigo:"203138288", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VII", asignatura:"Operaciones en Alimentos", codigo:"203138292", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VII", asignatura:"Análisis de los Alimentos", codigo:"203138296", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VII", asignatura:"Proyecto de Ingeniería I", codigo:"105020", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VII", asignatura:"Seminario de Investigación", codigo:"212060", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"VII", asignatura:"Electivo Disciplinar Específico I", codigo:"80007", tipo:"Electivo", campo:"Disciplinar", creditos:2, linea:"Disciplinar Específico"},

  // --- VIII ---
  {periodo:"VIII", asignatura:"Práctica Profesional", codigo:"203138289", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VIII", asignatura:"Ingeniería de Plantas de Alimentos", codigo:"203138293", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VIII", asignatura:"Food quality and safety management", codigo:"203138297", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VIII", asignatura:"Electivo Disciplinar Específico II", codigo:"120002", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Específico"},
  {periodo:"VIII", asignatura:"Electivo Interdisciplinar Básico Común III", codigo:"212030", tipo:"Electivo", campo:"Complementaria", creditos:3, linea:"Interdisciplinar"},
  {periodo:"VIII", asignatura:"Electivo Formación Complementaria II", codigo:"80010", tipo:"Electivo", campo:"Complementaria", creditos:2, linea:"Formación Complementaria"},

  // --- IX ---
  {periodo:"IX", asignatura:"Trabajo de Grado", codigo:"203138290", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IX", asignatura:"Ingeniería Ambiental", codigo:"203138294", tipo:"Obligatorio", campo:"IBC", creditos:2},
  {periodo:"IX", asignatura:"Pedagogía para la solución de conflictos", codigo:"203138298", tipo:"Obligatorio", campo:"AIU", creditos:2},
  {periodo:"IX", asignatura:"Electivo Disciplinar Específico III", codigo:"40004", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Específico"},
  {periodo:"IX", asignatura:"Electivo Disciplinar Específico IV", codigo:"40005", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Específico"},
];

/* ---- Electivas por Línea ---- */
const LINEAS_ELECTIVAS = {
  "Línea I – Procesos Biotecnológicos": [
    {asignatura:"Bioprocesos", codigo:"L1-1", creditos:3},
    {asignatura:"Tecnología Enzimática", codigo:"L1-2", creditos:3},
    {asignatura:"Gestión y aprovechamiento de subproductos alimentarios", codigo:"L1-3", creditos:3},
    {asignatura:"Biotechnology trends and legislation", codigo:"L1-4", creditos:3},
  ],
  "Línea II – Innovación y Gestión": [
    {asignatura:"Tecnologías convergentes en la industria alimentaria", codigo:"L2-1", creditos:3},
    {asignatura:"Tecnologías de transformación digital en la industria alimentaria", codigo:"L2-2", creditos:3},
    {asignatura:"Desarrollo y diseño de nuevos productos y empaques", codigo:"L2-3", creditos:3},
    {asignatura:"Sistemas para el mejoramiento de la inocuidad", codigo:"L2-4", creditos:3},
  ],
  "Línea III – Nutrición y Calidad": [
    {asignatura:"Nutrition and food", codigo:"L3-1", creditos:3},
    {asignatura:"Toxicología y alérgenos en alimentos", codigo:"L3-2", creditos:3},
    {asignatura:"Nuevas Materias Primas Alimentarias", codigo:"L3-3", creditos:3},
    {asignatura:"Soberanía y seguridad alimentaria", codigo:"L3-4", creditos:3},
  ],
};

/* ---------------------------
 * ESTADO DINÁMICO
 * --------------------------- */
const periodosOrden = ["I","II","III","IV","V","VI","VII","VIII","IX"];

// Sólo I desbloqueado al inicio
let unlocked = {};
periodosOrden.forEach((p,i)=>{ unlocked[p] = (i===0); });

// seleccionados = códigos o (asignatura si vacío)
let seleccionados = new Set();
function cursoId(c){ return c.codigo || c.asignatura; }

/* ---------------------------
 * RENDER
 * --------------------------- */
function buildMateriaPill(curso, isLocked, isSelected){
  const cls = [
    "materia-pill",
    curso.campo,
    isLocked?"locked":"",
    isSelected?"selected":"",
    curso.asignatura.length>32?"small-text":""
  ].filter(Boolean).join(" ");

  const title = `Código: ${curso.codigo||'N/D'}\\nCréditos: ${curso.creditos}${curso.linea?('\\n'+curso.linea):''}`;
  return `<div class="${cls}" data-id="${cursoId(curso)}" title="${title}">
    ${curso.asignatura}
    <span class="mat-credits">(${curso.creditos})</span>
  </div>`;
}

function buildPeriodoCard(periodo){
  const cursos = CURSOS.filter(c=>c.periodo===periodo);
  const isUnlocked = unlocked[periodo];
  const isCompleted = periodoCompletado(periodo);
  const statusCls = isCompleted?"completed":(isUnlocked?"unlocked":"locked");

  const materiasHtml = cursos.map(c=>{
    const id = cursoId(c);
    const sel = seleccionados.has(id);
    return buildMateriaPill(c, !isUnlocked, sel);
  }).join("");

  return `
    <div class="periodo-card ${statusCls}" data-periodo="${periodo}">
      <span class="periodo-status-badge">${isCompleted?"Completado":(isUnlocked?"Desbloqueado":"Bloqueado")}</span>
      <h2>${prefijoPeriodo(periodo)}</h2>
      <div class="materias-list">
        ${materiasHtml}
      </div>
    </div>`;
}

function prefijoPeriodo(p){
  // Mostrar como \"1º semestre\", etc.
  const idx = periodosOrden.indexOf(p) + 1;
  const suf = {1:\"º\",2:\"º\",3:\"º\",4:\"º\",5:\"º\",6:\"º\",7:\"º\",8:\"º\",9:\"º\"}[idx] || \"\";
  return `${idx}${suf} semestre`;
}

function renderPeriodos(){
  const cont = document.getElementById('periodosCards');
  cont.innerHTML = periodosOrden.map(buildPeriodoCard).join("");

  // Click handlers
  cont.querySelectorAll('.materia-pill').forEach(el=>{
    if(el.classList.contains('locked')) return;
    el.addEventListener('click', ()=>{
      const id = el.getAttribute('data-id');
      toggleSeleccion(id);
    });
  });
}

function renderLinea(){
  const selLinea = document.getElementById('selectLinea');
  const linea = selLinea.value;
  const section = document.getElementById('lineaSection');
  const cont = document.getElementById('lineaCards');

  if(!linea){
    section.style.display = 'none';
    cont.innerHTML = '';
    updateCreditos();
    return;
  }
  section.style.display = '';
  const cursos = LINEAS_ELECTIVAS[linea] || [];
  cont.innerHTML = `
    <div class="linea-card">
      <h3>${linea}</h3>
      <div class="materias-list">
        ${cursos.map(e=>{
          const id = e.codigo||e.asignatura;
          const sel = seleccionados.has(id) ? 'selected' : '';
          const title = `Código: ${e.codigo||'N/D'}\\nCréditos: ${e.creditos}`;
          return `<div class="materia-pill Disciplinar ${sel}" data-id="${id}" title="${title}">
            ${e.asignatura}<span class="mat-credits">(${e.creditos})</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;

  // Click en electivas
  cont.querySelectorAll('.materia-pill').forEach(el=>{
    el.addEventListener('click', ()=>{
      const id = el.getAttribute('data-id');
      toggleSeleccion(id);
    });
  });

  updateCreditos();
}

/* ---------------------------
 * LÓGICA
 * --------------------------- */
function periodoCompletado(periodo){
  const obligatorias = CURSOS.filter(c=>c.periodo===periodo && c.tipo==="Obligatorio");
  return obligatorias.every(c=>seleccionados.has(cursoId(c)));
}

function unlockCascade(){
  for(let i=0;i<periodosOrden.length-1;i++){
    const p = periodosOrden[i];
    const next = periodosOrden[i+1];
    if(!unlocked[next] && periodoCompletado(p)){
      unlocked[next] = true;
    }
  }
  // habilitar selector de línea cuando se desbloquee VII
  if(unlocked["VII"]){
    document.getElementById('selectLinea').disabled = false;
  }
}

function toggleSeleccion(id){
  if(seleccionados.has(id)) seleccionados.delete(id);
  else seleccionados.add(id);
  unlockCascade();
  renderPeriodos();  // re-render periodos con nuevos estados
  renderLinea();     // re-render electivas de línea (si aplica)
  updateCreditos();
}

function updateCreditos(){
  let total = 0;
  // periodos base
  CURSOS.forEach(c=>{
    if(seleccionados.has(cursoId(c))){
      total += Number(c.creditos)||0;
    }
  });
  // electivas de línea
  const linea = document.getElementById('selectLinea').value;
  if(linea && LINEAS_ELECTIVAS[linea]){
    LINEAS_ELECTIVAS[linea].forEach(e=>{
      const id = e.codigo||e.asignatura;
      if(seleccionados.has(id)) total += Number(e.creditos)||0;
    });
  }
  document.getElementById('creditosMarcados').textContent = total;
}

/* ---------------------------
 * INIT
 * --------------------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  renderPeriodos();
  updateCreditos();

  document.getElementById('selectLinea').addEventListener('change', ()=>{
    renderLinea();
  });
});

   
