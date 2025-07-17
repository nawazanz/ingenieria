/* script.js - Malla Curricular Interactiva por semestres con desbloqueo
 * ---------------------------------------------------------------
 * Flujo:
 * - Periodo I desbloqueado al inicio.
 * - Marca (clic) materias completadas. Clic de nuevo = desmarcar.
 * - Cuando TODAS las materias OBLIGATORIAS de un periodo están marcadas,
 *   se desbloquea el siguiente periodo.
 * - Al desbloquear los periodos donde aparecen los Electivos Disciplinar Específico,
 *   se habilita el selector de Línea. Al elegir línea se muestran sus electivas.
 * ---------------------------------------------------------------
 */

const TOTAL_PROGRAMA = 152; // total créditos orientativo

/* ===== DATASET BASE =====
 * He agrupado las materias visibles del PDF.
 * Ajusta créditos/códigos según tus datos oficiales.
 */
const CURSOS = [
  /* ---------- PERIODO I (17 créditos) ---------- */
  {periodo:"I", asignatura:"Química General", codigo:"100410", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"I", asignatura:"Biología", codigo:"100411", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"I", asignatura:"Pensamiento lógico y matemático", codigo:"100412", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"I", asignatura:"Competencias Comunicativas", codigo:"203138276", tipo:"Obligatorio", campo:"AIU", creditos:3},
  {periodo:"I", asignatura:"Inglés A1", codigo:"203138281", tipo:"Obligatorio", campo:"AIU", creditos:2},
  {periodo:"I", asignatura:"Introducción a la Ingeniería", codigo:"203138282", tipo:"Obligatorio", campo:"Disciplinar", creditos:4},
  {periodo:"I", asignatura:"Herramientas Digitales para la Gestión del Conocimiento", codigo:"203138284", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"I", asignatura:"Proyecto de Vida", codigo:"203138285", tipo:"Obligatorio", campo:"AIU", creditos:3},

  /* ---------- PERIODO II (18 créditos) ---------- */
  {periodo:"II", asignatura:"Cálculo Diferencial", codigo:"100413", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"II", asignatura:"Física General", codigo:"201015", tipo:"Obligatorio", campo:"IBC", creditos:2},
  {periodo:"II", asignatura:"Química Orgánica", codigo:"301103", tipo:"Obligatorio", campo:"IBC", creditos:4},
  {periodo:"II", asignatura:"Bioquímica", codigo:"203138274", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"II", asignatura:"Estadística y Probabilidad", codigo:"203138278", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"II", asignatura:"Dibujo de Ingeniería", codigo:"203138283", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"II", asignatura:"Electivo Disciplinar Común I", codigo:"", tipo:"Electivo", campo:"Disciplinar", creditos:0, linea:"Disciplinar Común"},

  /* ---------- PERIODO III (17 créditos) ---------- */
  {periodo:"III", asignatura:"Cálculo Integral", codigo:"201102", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"III", asignatura:"Fisicoquímica", codigo:"100416", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"III", asignatura:"Microbiología de los Alimentos", codigo:"201103", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"III", asignatura:"Ciencia de los Alimentos", codigo:"211619", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"III", asignatura:"Inglés A2", codigo:"203138280", tipo:"Obligatorio", campo:"AIU", creditos:3},
  {periodo:"III", asignatura:"Electivo Interdisciplinar Básico Común I", codigo:"", tipo:"Electivo", campo:"Complementaria", creditos:2, linea:"Interdisciplinar Básico Común"},

  /* ---------- PERIODO IV (18 créditos) ---------- */
  {periodo:"IV", asignatura:"Ecuaciones Diferenciales", codigo:"201101", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"IV", asignatura:"Balance de Materia y Energía", codigo:"211624", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IV", asignatura:"Procesos de la Industria Alimentaria I", codigo:"203138275", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IV", asignatura:"Termodinámica", codigo:"203138279", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IV", asignatura:"Procesos de la Industria Alimentaria II", codigo:"203138277", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IV", asignatura:"Inglés B1+", codigo:"PEND", tipo:"Obligatorio", campo:"AIU", creditos:3},

  /* ---------- PERIODO V (18 créditos) ---------- */
  {periodo:"V", asignatura:"Manejo de materias primas alimentarias", codigo:"216010", tipo:"Obligatorio", campo:"Disciplinar", creditos:2},
  {periodo:"V", asignatura:"Mecánica de sólidos y fluídos", codigo:"211622", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"V", asignatura:"Cátedra Unadista", codigo:"201604", tipo:"Obligatorio", campo:"AIU", creditos:3},
  {periodo:"V", asignatura:"Engineering project II / Food quality and safety management", codigo:"202337120", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"V", asignatura:"Inglés B1", codigo:"100108", tipo:"Obligatorio", campo:"AIU", creditos:2},
  {periodo:"V", asignatura:"Electivo Disciplinar Común II", codigo:"203138286", tipo:"Electivo", campo:"Disciplinar", creditos:5, linea:"Disciplinar Común"},

  /* ---------- PERIODO VI (17 créditos) ---------- */
  {periodo:"VI", asignatura:"Procesos de conservación de alimentos", codigo:"203138287", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VI", asignatura:"Fenómenos de Transporte", codigo:"203138291", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VI", asignatura:"Ética y Ciudadanía", codigo:"203138295", tipo:"Obligatorio", campo:"AIU", creditos:3},
  {periodo:"VI", asignatura:"Fundamentos y Generalidades de Investigación", codigo:"40006", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"VI", asignatura:"Electivo Interdisciplinar Básico Común II", codigo:"301301", tipo:"Electivo", campo:"Complementaria", creditos:3, linea:"Interdisciplinar Básico Común"},
  {periodo:"VI", asignatura:"Electivo Formación Complementaria I", codigo:"80005", tipo:"Electivo", campo:"Complementaria", creditos:2, linea:"Formación Complementaria"},

  /* ---------- PERIODO VII (17 créditos) ---------- */
  {periodo:"VII", asignatura:"Biotecnología Alimentaria", codigo:"203138288", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VII", asignatura:"Operaciones en Alimentos", codigo:"203138292", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VII", asignatura:"Análisis de los Alimentos", codigo:"203138296", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VII", asignatura:"Proyecto de Ingeniería I", codigo:"105020", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VII", asignatura:"Seminario de Investigación", codigo:"212060", tipo:"Obligatorio", campo:"IBC", creditos:3},
  {periodo:"VII", asignatura:"Electivo Disciplinar Específico I", codigo:"80007", tipo:"Electivo", campo:"Disciplinar", creditos:2, linea:"Disciplinar Específico"},

  /* ---------- PERIODO VIII (17 créditos) ---------- */
  {periodo:"VIII", asignatura:"Práctica Profesional", codigo:"203138289", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VIII", asignatura:"Ingeniería de Plantas de Alimentos", codigo:"203138293", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VIII", asignatura:"Food quality and safety management", codigo:"203138297", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"VIII", asignatura:"Electivo Disciplinar Específico II", codigo:"120002", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Específico"},
  {periodo:"VIII", asignatura:"Electivo Interdisciplinar Básico Común III", codigo:"212030", tipo:"Electivo", campo:"Complementaria", creditos:3, linea:"Interdisciplinar Básico Común"},
  {periodo:"VIII", asignatura:"Electivo Formación Complementaria II", codigo:"80010", tipo:"Electivo", campo:"Complementaria", creditos:2, linea:"Formación Complementaria"},

  /* ---------- PERIODO IX (13 créditos) ---------- */
  {periodo:"IX", asignatura:"Trabajo de Grado", codigo:"203138290", tipo:"Obligatorio", campo:"Disciplinar", creditos:3},
  {periodo:"IX", asignatura:"Ingeniería Ambiental", codigo:"203138294", tipo:"Obligatorio", campo:"IBC", creditos:2},
  {periodo:"IX", asignatura:"Pedagogía para la solución de conflictos", codigo:"203138298", tipo:"Obligatorio", campo:"AIU", creditos:2},
  {periodo:"IX", asignatura:"Electivo Disciplinar Específico III", codigo:"40004", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Específico"},
  {periodo:"IX", asignatura:"Electivo Disciplinar Específico IV", codigo:"40005", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Específico"},
];

/* ===== CATÁLOGO ELECTIVAS POR LÍNEA ===== */
const LINEAS_ELECTIVAS = {
  "Línea I – Procesos Biotecnológicos": [
    {asignatura:"Bioprocesos", codigo:"200611L1", creditos:3},
    {asignatura:"Tecnología Enzimática", codigo:"40003L1", creditos:3},
    {asignatura:"Gestión y aprovechamiento de subproductos alimentarios", codigo:"900001L1", creditos:3},
    {asignatura:"Biotechnology trends and legislation", codigo:"900002L1", creditos:3},
  ],
  "Línea II – Innovación y Gestión": [
    {asignatura:"Tecnologías convergentes en la industria alimentaria", codigo:"900003L2", creditos:3},
    {asignatura:"Tecnologías de transformación digital en la industria alimentaria", codigo:"900004L2", creditos:3},
    {asignatura:"Desarrollo y diseño de nuevos productos y empaques", codigo:"40002L2", creditos:3},
    {asignatura:"Sistemas para el mejoramiento de la inocuidad", codigo:"150001L2", creditos:3},
  ],
  "Línea III – Nutrición y Calidad": [
    {asignatura:"Nutrition and food", codigo:"112001L3", creditos:3},
    {asignatura:"Toxicología y alérgenos en alimentos", codigo:"200610L3", creditos:3},
    {asignatura:"Nuevas Materias Primas Alimentarias", codigo:"80017L3", creditos:3},
    {asignatura:"Soberanía y seguridad alimentaria", codigo:"PENDL3", creditos:3},
  ],
};

/* ===== Estado dinámico ===== */
const periodosOrden = ["I","II","III","IV","V","VI","VII","VIII","IX"];
let periodoUnlocked = {I:true};  // I desbloqueado al inicio
periodosOrden.slice(1).forEach(p=>periodoUnlocked[p]=false);

let seleccionados = new Set(); // guarda códigos (o asignatura si sin código)
function rowId(curso){ return curso.codigo || curso.asignatura; }

/* Marcar / desmarcar */
function toggleSeleccion(curso){
  const id = rowId(curso);
  if(seleccionados.has(id)){ seleccionados.delete(id); }
  else { seleccionados.add(id); }
  renderAll(); // re-render para actualizar estilos y créditos
  checkUnlocks();
}

/* Verificar si todas las obligatorias de un periodo están marcadas */
function periodoCompletado(periodo){
  const cursos = CURSOS.filter(c=>c.periodo===periodo && c.tipo==="Obligatorio");
  return cursos.every(c=>seleccionados.has(rowId(c)));
}

/* Lógica de desbloqueo */
function checkUnlocks(){
  for(let i=0;i<periodosOrden.length-1;i++){
    const p = periodosOrden[i];
    const next = periodosOrden[i+1];
    if(!periodoUnlocked[next] && periodoCompletado(p)){
      periodoUnlocked[next] = true;
    }
  }
  // habilitar selector de línea cuando se desbloquee VII
  const selectLinea = document.getElementById('selectLinea');
  if(periodoUnlocked["VII"]){
    selectLinea.disabled = false;
  }
}

/* Créditos totales marcados */
function creditosMarcados(){
  let total = 0;
  CURSOS.forEach(c=>{
    if(seleccionados.has(rowId(c))){
      total += Number(c.creditos)||0;
    }
  });
  // No sumo electivas de línea aquí; se podrían sumar si se marcan (ver abajo)
  const linea = document.getElementById('selectLinea')?.value;
  if(linea && LINEAS_ELECTIVAS[linea]){
    LINEAS_ELECTIVAS[linea].forEach(e=>{
      const id = e.codigo || e.asignatura;
      if(seleccionados.has(id)) total += Number(e.creditos)||0;
    });
  }
  return total;
}

/* Construye tabla HTML de un periodo */
function buildPeriodoTable(periodo){
  const cursos = CURSOS.filter(c=>c.periodo===periodo);
  const unlocked = periodoUnlocked[periodo];
  const done = periodoCompletado(periodo);
  const headerClass = done ? "completed" : (unlocked?"unlocked":"locked");

  let rows = cursos.map(c=>{
    const id = rowId(c);
    const isSel = seleccionados.has(id);
    const locked = !unlocked;
    const campoClass = locked ? "" : campoToClass(c.campo);
    const rowCls = [
      locked?"locked":"",
      isSel?"selected":"",
      campoClass
    ].filter(Boolean).join(" ");

    return `<tr class="${rowCls}" data-id="${id}">
      <td class="codigo-col">${c.codigo||""}</td>
      <td>${c.asignatura}</td>
      <td>${c.tipo}</td>
      <td>${c.campo}</td>
      <td class="creditos-col">${c.creditos}</td>
    </tr>`;
  }).join("");

  return `
  <div class="periodo-card ${unlocked?"":"locked"}" data-periodo="${periodo}">
    <div class="periodo-header ${headerClass}">
      <h2 class="h5 mb-0">Periodo ${periodo}</h2>
      <span class="badge text-light">${done?"Completado":(unlocked?"Desbloqueado":"Bloqueado")}</span>
    </div>
    <div class="table-responsive">
      <table class="periodo-table table-sm table-bordered">
        <thead>
          <tr>
            <th>Código</th>
            <th>Asignatura</th>
            <th>Tipo</th>
            <th>Campo</th>
            <th>Créditos</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* Convierte campo en clase de color */
function campoToClass(campo){
  switch(campo){
    case "IBC": return "campo-IBC";
    case "AIU": return "campo-AIU";
    case "Disciplinar": return "campo-Disciplinar";
    case "Complementaria": return "campo-Complementaria";
    default: return "";
  }
}

/* Render electivas según línea elegida */
function buildLineaElectivas(linea){
  const data = LINEAS_ELECTIVAS[linea] || [];
  if(!data.length) return "";
  const rows = data.map(e=>{
    const id = e.codigo || e.asignatura;
    const isSel = seleccionados.has(id);
    const rowCls = isSel?"selected":"";
    return `<tr class="${rowCls}" data-id="${id}">
      <td class="codigo-col">${e.codigo||""}</td>
      <td>${e.asignatura}</td>
      <td class="creditos-col">${e.creditos}</td>
    </tr>`;
  }).join("");

  return `
    <div class="table-responsive mb-4">
      <table class="periodo-table table-sm table-bordered">
        <thead>
          <tr>
            <th>Código</th>
            <th>Asignatura</th>
            <th>Créditos</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>`;
}

/* Render global */
function renderAll(){
  const cont = document.getElementById('periodosContainer');
  cont.innerHTML = periodosOrden.map(buildPeriodoTable).join("");

  // attach click handlers (delegación)
  cont.querySelectorAll('.periodo-card tbody tr').forEach(tr=>{
    if(tr.classList.contains('locked')) return; // ignore bloqueadas
    tr.addEventListener('click', ()=>{
      const id = tr.getAttribute('data-id');
      const curso = findCursoById(id);
      toggleSeleccion(curso);
    });
  });

  // actualizar créditos
  document.getElementById('creditosMarcados').textContent = creditosMarcados();

  // actualizar electivas línea si visible
  renderLineaElectivas();
}

function findCursoById(id){
  return CURSOS.find(c=>rowId(c)===id) ||
         findLineaCursoById(id);
}

/* Electivas línea: buscar */
function findLineaCursoById(id){
  for(const k in LINEAS_ELECTIVAS){
    const found = LINEAS_ELECTIVAS[k].find(e=>(e.codigo||e.asignatura)===id);
    if(found) return found;
  }
  return null;
}

/* Render sección electivas línea */
function renderLineaElectivas(){
  const linea = document.getElementById('selectLinea').value;
  const wrap = document.getElementById('lineaElectivasContainer');
  const area = document.getElementById('lineaTables');

  if(!linea){
    wrap.style.display = 'none';
    area.innerHTML = '';
    return;
  }
  wrap.style.display = '';
  area.innerHTML = buildLineaElectivas(linea);

  // clicks en electivas de línea
  area.querySelectorAll('tbody tr').forEach(tr=>{
    tr.addEventListener('click', ()=>{
      const id = tr.getAttribute('data-id');
      if(seleccionados.has(id)) seleccionados.delete(id);
      else seleccionados.add(id);
      renderAll(); // re-render todo para refrescar créditos
    });
  });
}

/* EVENTOS DE INTERFAZ */
document.addEventListener('DOMContentLoaded', ()=>{
  renderAll(); // primer render

  // cuando cambie la línea (solo después desbloqueo)
  document.getElementById('selectLinea').addEventListener('change', ()=>{
    renderLineaElectivas();
    document.getElementById('creditosMarcados').textContent = creditosMarcados();
  });
});

   
