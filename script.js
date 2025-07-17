/* script.js - Malla Curricular Interactiva – Ingeniería de Alimentos
 * Requisitos: jQuery, DataTables, Bootstrap 5 (ya incluidos en index.html)
 * Edita el arreglo DATASET para actualizar información.
 * TOTAL_PROGRAMA = 152 créditos (meta de avance).
 */

/* =========================
 *  DATASET
 * ========================= */
const DATASET = [
  /* ---------- PERIODO I (17 créditos) ---------- */
  {periodo:"I", asignatura:"Química General", codigo:"100410", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"I", asignatura:"Biología", codigo:"100411", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"I", asignatura:"Pensamiento lógico y matemático", codigo:"100412", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"I", asignatura:"Competencias Comunicativas", codigo:"203138276", tipo:"Obligatorio", campo:"AIU", creditos:3, linea:""},
  {periodo:"I", asignatura:"Inglés A1", codigo:"203138281", tipo:"Obligatorio", campo:"AIU", creditos:2, linea:""},
  {periodo:"I", asignatura:"Introducción a la Ingeniería", codigo:"203138282", tipo:"Obligatorio", campo:"Disciplinar", creditos:4, linea:""},
  {periodo:"I", asignatura:"Herramientas Digitales para la Gestión del Conocimiento", codigo:"203138284", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"I", asignatura:"Proyecto de Vida", codigo:"203138285", tipo:"Obligatorio", campo:"AIU", creditos:3, linea:""},

  /* ---------- PERIODO II (18 créditos) ---------- */
  {periodo:"II", asignatura:"Cálculo Diferencial", codigo:"100413", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"II", asignatura:"Física General", codigo:"201015", tipo:"Obligatorio", campo:"IBC", creditos:2, linea:""},
  {periodo:"II", asignatura:"Química Orgánica", codigo:"301103", tipo:"Obligatorio", campo:"IBC", creditos:4, linea:""},
  {periodo:"II", asignatura:"Bioquímica", codigo:"203138274", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"II", asignatura:"Estadística y Probabilidad", codigo:"203138278", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"II", asignatura:"Dibujo de Ingeniería", codigo:"203138283", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"II", asignatura:"Electivo Disciplinar Común I", codigo:"", tipo:"Electivo", campo:"Disciplinar", creditos:0, linea:"Disciplinar Común"},

  /* ---------- PERIODO III (17 créditos) ---------- */
  {periodo:"III", asignatura:"Cálculo Integral", codigo:"201102", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"III", asignatura:"Fisicoquímica", codigo:"100416", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"III", asignatura:"Microbiología de los Alimentos", codigo:"201103", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"III", asignatura:"Ciencia de los Alimentos", codigo:"211619", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"III", asignatura:"Inglés A2", codigo:"203138280", tipo:"Obligatorio", campo:"AIU", creditos:3, linea:""},
  {periodo:"III", asignatura:"Electivo Interdisciplinar Básico Común I", codigo:"", tipo:"Electivo", campo:"Complementaria", creditos:2, linea:"Interdisciplinar Básico Común"},

  /* ---------- PERIODO IV (18 créditos) ---------- */
  {periodo:"IV", asignatura:"Ecuaciones Diferenciales", codigo:"201101", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"IV", asignatura:"Balance de Materia y Energía", codigo:"211624", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"IV", asignatura:"Procesos de la Industria Alimentaria I", codigo:"203138275", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"IV", asignatura:"Termodinámica", codigo:"203138279", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"IV", asignatura:"Procesos de la Industria Alimentaria II", codigo:"203138277", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"IV", asignatura:"Inglés B1+", codigo:"PEND", tipo:"Obligatorio", campo:"AIU", creditos:3, linea:""},

  /* ---------- PERIODO V (18 créditos) ---------- */
  {periodo:"V", asignatura:"Manejo de materias primas alimentarias", codigo:"216010", tipo:"Obligatorio", campo:"Disciplinar", creditos:2, linea:""},
  {periodo:"V", asignatura:"Mecánica de sólidos y fluídos", codigo:"211622", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"V", asignatura:"Cátedra Unadista", codigo:"201604", tipo:"Obligatorio", campo:"AIU", creditos:3, linea:""},
  {periodo:"V", asignatura:"Engineering project II / Food quality and safety management", codigo:"202337120", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"V", asignatura:"Inglés B1", codigo:"100108", tipo:"Obligatorio", campo:"AIU", creditos:2, linea:""},
  {periodo:"V", asignatura:"Electivo Disciplinar Común II", codigo:"203138286", tipo:"Electivo", campo:"Disciplinar", creditos:5, linea:"Disciplinar Común"},

  /* ---------- PERIODO VI (17 créditos) ---------- */
  {periodo:"VI", asignatura:"Procesos de conservación de alimentos", codigo:"203138287", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"VI", asignatura:"Fenómenos de Transporte", codigo:"203138291", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"VI", asignatura:"Ética y Ciudadanía", codigo:"203138295", tipo:"Obligatorio", campo:"AIU", creditos:3, linea:""},
  {periodo:"VI", asignatura:"Fundamentos y Generalidades de Investigación", codigo:"40006", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"VI", asignatura:"Electivo Interdisciplinar Básico Común II", codigo:"301301", tipo:"Electivo", campo:"Complementaria", creditos:3, linea:"Interdisciplinar Básico Común"},
  {periodo:"VI", asignatura:"Electivo Formación Complementaria I", codigo:"80005", tipo:"Electivo", campo:"Complementaria", creditos:2, linea:"Formación Complementaria"},

  /* ---------- PERIODO VII (17 créditos) ---------- */
  {periodo:"VII", asignatura:"Biotecnología Alimentaria", codigo:"203138288", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"VII", asignatura:"Operaciones en Alimentos", codigo:"203138292", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"VII", asignatura:"Análisis de los Alimentos", codigo:"203138296", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"VII", asignatura:"Proyecto de Ingeniería I", codigo:"105020", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"VII", asignatura:"Seminario de Investigación", codigo:"212060", tipo:"Obligatorio", campo:"IBC", creditos:3, linea:""},
  {periodo:"VII", asignatura:"Electivo Disciplinar Específico I", codigo:"80007", tipo:"Electivo", campo:"Disciplinar", creditos:2, linea:"Disciplinar Específico"},

  /* ---------- PERIODO VIII (17 créditos) ---------- */
  {periodo:"VIII", asignatura:"Práctica Profesional", codigo:"203138289", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"VIII", asignatura:"Ingeniería de Plantas de Alimentos", codigo:"203138293", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"VIII", asignatura:"Food quality and safety management", codigo:"203138297", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"VIII", asignatura:"Electivo Disciplinar Específico II", codigo:"120002", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Específico"},
  {periodo:"VIII", asignatura:"Electivo Interdisciplinar Básico Común III", codigo:"212030", tipo:"Electivo", campo:"Complementaria", creditos:3, linea:"Interdisciplinar Básico Común"},
  {periodo:"VIII", asignatura:"Electivo Formación Complementaria II", codigo:"80010", tipo:"Electivo", campo:"Complementaria", creditos:2, linea:"Formación Complementaria"},

  /* ---------- PERIODO IX (13 créditos) ---------- */
  {periodo:"IX", asignatura:"Trabajo de Grado", codigo:"203138290", tipo:"Obligatorio", campo:"Disciplinar", creditos:3, linea:""},
  {periodo:"IX", asignatura:"Ingeniería Ambiental", codigo:"203138294", tipo:"Obligatorio", campo:"IBC", creditos:2, linea:""},
  {periodo:"IX", asignatura:"Pedagogía para la solución de conflictos", codigo:"203138298", tipo:"Obligatorio", campo:"AIU", creditos:2, linea:""},
  {periodo:"IX", asignatura:"Electivo Disciplinar Específico III", codigo:"40004", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Específico"},
  {periodo:"IX", asignatura:"Electivo Disciplinar Específico IV", codigo:"40005", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Específico"},

  /* ===========================================================
   * LISTADOS DE ELECTIVAS DISPONIBLES (SIN PERIODO FIJO)
   * =========================================================== */

  /* ---- Electivos Disciplinar Común (cumplir 7 créditos) ---- */
  {periodo:"-", asignatura:"Algebra, Trigonometría y Geometría Analítica", codigo:"200611", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Común"},
  {periodo:"-", asignatura:"Gestión Tecnológica", codigo:"40003", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Común"},
  {periodo:"-", asignatura:"Emprendimiento Tecnológico", codigo:"900001", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Común"},
  {periodo:"-", asignatura:"Diseño sustentable", codigo:"900002", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Común"},
  {periodo:"-", asignatura:"Sujeto Comunidad e Interacción Social", codigo:"900003", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Común"},
  {periodo:"-", asignatura:"Inclusión Social", codigo:"900004", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Común"},
  {periodo:"-", asignatura:"Educación Ambiental", codigo:"40002", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Disciplinar Común"},

  /* ---- Electivos Formación Complementaria (cumplir 3 créditos) ---- */
  {periodo:"-", asignatura:"Emprendimiento solidario", codigo:"150001", tipo:"Electivo", campo:"Complementaria", creditos:3, linea:"Formación Complementaria"},
  {periodo:"-", asignatura:"Responsabilidad social empresarial", codigo:"112001", tipo:"Electivo", campo:"Complementaria", creditos:3, linea:"Formación Complementaria"},
  {periodo:"-", asignatura:"Protocolo", codigo:"200610", tipo:"Electivo", campo:"Complementaria", creditos:3, linea:"Formación Complementaria"},
  {periodo:"-", asignatura:"Teatro", codigo:"80017", tipo:"Electivo", campo:"Complementaria", creditos:1, linea:"Formación Complementaria"},

  /* ---- Electivos Disciplinar Específico – Línea I ---- */
  {periodo:"-", asignatura:"Bioprocesos", codigo:"200611L1", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea I – Procesos Biotecnológicos"},
  {periodo:"-", asignatura:"Tecnología Enzimática", codigo:"40003L1", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea I – Procesos Biotecnológicos"},
  {periodo:"-", asignatura:"Gestión y aprovechamiento de subproductos alimentarios", codigo:"900001L1", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea I – Procesos Biotecnológicos"},
  {periodo:"-", asignatura:"Biotechnology trends and legislation", codigo:"900002L1", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea I – Procesos Biotecnológicos"},

  /* ---- Electivos Disciplinar Específico – Línea II ---- */
  {periodo:"-", asignatura:"Tecnologías convergentes en la industria alimentaria", codigo:"900003L2", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea II – Innovación y Gestión"},
  {periodo:"-", asignatura:"Tecnologías de transformación digital en la industria alimentaria", codigo:"900004L2", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea II – Innovación y Gestión"},
  {periodo:"-", asignatura:"Desarrollo y diseño de nuevos productos y empaques", codigo:"40002L2", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea II – Innovación y Gestión"},
  {periodo:"-", asignatura:"Sistemas para el mejoramiento de la inocuidad", codigo:"150001L2", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea II – Innovación y Gestión"},

  /* ---- Electivos Disciplinar Específico – Línea III ---- */
  {periodo:"-", asignatura:"Nutrition and food", codigo:"112001L3", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea III – Nutrición y Calidad"},
  {periodo:"-", asignatura:"Toxicología y alérgenos en alimentos", codigo:"200610L3", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea III – Nutrición y Calidad"},
  {periodo:"-", asignatura:"Nuevas Materias Primas Alimentarias", codigo:"80017L3", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea III – Nutrición y Calidad"},
  {periodo:"-", asignatura:"Soberanía y seguridad alimentaria", codigo:"PENDL3", tipo:"Electivo", campo:"Disciplinar", creditos:3, linea:"Línea III – Nutrición y Calidad"},
];

const TOTAL_PROGRAMA = 152; // meta de avance

/* =========================
 *  HELPERS
 * ========================= */
function uniqueValues(arr, key) {
  const set = new Set();
  arr.forEach(o => {
    if (o[key] !== undefined && o[key] !== null) set.add(o[key]);
  });
  return Array.from(set).sort();
}

function campoClass(campo) {
  switch (campo) {
    case 'IBC': return 'campo-IBC';
    case 'AIU': return 'campo-AIU';
    case 'Disciplinar': return 'campo-Disciplinar';
    case 'Complementaria': return 'campo-Complementaria';
    default: return '';
  }
}

/* Construye las filas HTML */
function buildTableRows(data) {
  return data.map(o => `
    <tr class="${campoClass(o.campo)}" data-periodo="${o.periodo}" data-campo="${o.campo}" data-tipo="${o.tipo}" data-linea="${o.linea}">
      <td>${o.periodo}</td>
      <td title="Código: ${o.codigo}\nCréditos: ${o.creditos}">${o.asignatura}</td>
      <td>${o.codigo}</td>
      <td>${o.tipo}</td>
      <td>${o.campo}</td>
      <td>${o.creditos}</td>
      <td>${o.linea}</td>
    </tr>`).join("");
}

/* Llena los selects de filtros */
function populateFilters() {
  const periodos = uniqueValues(DATASET, 'periodo');
  const campos   = uniqueValues(DATASET, 'campo');
  const tipos    = uniqueValues(DATASET, 'tipo');
  const lineas   = uniqueValues(DATASET, 'linea');

  function addOpts(sel, vals) {
    const el = document.getElementById(sel);
    el.innerHTML = '<option value="">Todos</option>' +
      vals.map(v => `<option value="${v}">${v || '(sin línea)'}</option>`).join('');
  }
  addOpts('filtroPeriodo', periodos);
  addOpts('filtroCampo', campos);
  addOpts('filtroTipo', tipos);
  addOpts('filtroLinea', lineas);
}

/* Filtros DataTables */
function aplicarFiltros(table) {
  const p = document.getElementById('filtroPeriodo').value;
  const c = document.getElementById('filtroCampo').value;
  const t = document.getElementById('filtroTipo').value;
  const l = document.getElementById('filtroLinea').value;

  // Columnas: 0=Periodo 1=Asignatura 2=Código 3=Tipo 4=Campo 5=Créditos 6=Línea
  table.column(0).search(p ? '^' + p + '$' : '', true, false);
  table.column(4).search(c ? '^' + c + '$' : '', true, false);
  table.column(3).search(t ? '^' + t + '$' : '', true, false);
  table.column(6).search(l ? '^' + l + '$' : '', true, false);
  table.draw();
}

/* Suma créditos visibles */
function calcularCreditos(table) {
  let total = 0;
  table.rows({ filter: 'applied' }).every(function () {
    const c = parseInt(this.data()[5], 10);
    if (!isNaN(c)) total += c;
  });
  document.getElementById('totalCreditos').textContent = total;

  // Barra de avance (referencia)
  const pct = (total / TOTAL_PROGRAMA) * 100;
  const bar = document.getElementById('porcentajeAvance');
  if (bar) {
    bar.style.width = (pct > 100 ? 100 : pct) + '%';
    bar.textContent = pct.toFixed(1) + '%';
  }
}

/* Inicialización */
$(document).ready(function () {
  // Insertar filas
  document.querySelector('#malla tbody').innerHTML = buildTableRows(DATASET);

  // Poblar selects
  populateFilters();

  // DataTable
  const table = $('#malla').DataTable({
    responsive: true,
    language: { url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
    order: [[0, 'asc']]
  });

  // Eventos filtros
  $('#filtroPeriodo,#filtroCampo,#filtroTipo,#filtroLinea').on('change', function () {
    aplicarFiltros(table);
  });

  // Créditos al refrescar
  table.on('draw', function () { calcularCreditos(table); });
  calcularCreditos(table);
});
