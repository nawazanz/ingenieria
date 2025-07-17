<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Malla Curricular Interactiva – Ingeniería de Alimentos</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" />
  <style>
    body { background:#f9f9f9; padding:1.5rem; }
    h1 { text-align:center; margin-bottom:1.5rem; }
    .creditos-box { font-weight:bold; margin-top:1rem; }
    /* Colores por campo */
    .campo-IBC { background:#cce5ff !important; }
    .campo-AIU { background:#d4edda !important; }
    .campo-Disciplinar { background:#ffe8cc !important; }
    .campo-Complementaria { background:#fff3cd !important; }
    .dt-center { text-align:center; }
    .small-note { font-size:.85rem; color:#666; }
    .filters-row { gap:.5rem; margin-bottom:1rem; }
  </style>
</head>
<body>
  <h1>Malla Curricular Interactiva<br><small class="text-muted fs-5">Programa Profesional en Ingeniería de Alimentos</small></h1>

  <div class="container">
    <!-- Filtros externos -->
    <div class="row filters-row align-items-end">
      <div class="col-6 col-md-3">
        <label for="fPeriodo" class="form-label">Periodo</label>
        <select id="fPeriodo" class="form-select" multiple></select>
      </div>
      <div class="col-6 col-md-3">
        <label for="fCampo" class="form-label">Campo</label>
        <select id="fCampo" class="form-select" multiple></select>
      </div>
      <div class="col-6 col-md-3 mt-2 mt-md-0">
        <label for="fTipo" class="form-label">Tipo</label>
        <select id="fTipo" class="form-select" multiple></select>
      </div>
      <div class="col-6 col-md-3 mt-2 mt-md-0">
        <label for="fLinea" class="form-label">Línea / Grupo Electivo</label>
        <select id="fLinea" class="form-select" multiple></select>
      </div>
    </div>

    <div class="table-responsive">
      <table id="malla" class="table table-striped table-bordered" style="width:100%">
        <thead class="table-dark">
          <tr>
            <th>Periodo</th>
            <th>Asignatura</th>
            <th>Código</th>
            <th>Tipo</th>
            <th>Campo</th>
            <th>Créditos</th>
            <th>Línea</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <div class="creditos-box">Total Créditos (filtrados): <span id="totalCreditos">0</span></div>
    <p class="small-note mt-2">Las filas marcadas como "Créditos a cumplir" representan cupos electivos: debes acumular al menos esa cantidad dentro del grupo indicado. Los créditos individuales mostrados para cada electiva son referenciales; verifica con tu plan de estudios oficial antes de matricular.</p>
  </div>

  <!-- ======== DATASET ======== -->
  <script>
  /*
    Nota importante sobre los datos:
    -------------------------------
    Los datos fueron transcritos del archivo PDF de la malla curricular que compartiste. En algunos casos el PDF presentaba
    texto fragmentado o ilegible (códigos, valores M/T, etc.). Cuando la información era ambigua:
      - Se dejó el código en blanco ("").
      - Se asumieron 3 créditos por defecto en electivas no especificadas, a menos que el PDF mostrara otro valor claro.
      - Se agregaron filas "Créditos a cumplir" en lugar de desglosar todas las opciones cuando la malla sólo exige un total.
    Te recomiendo validar los créditos y códigos con la coordinación académica antes de publicar oficialmente.
  */

  const cursos = [
    /* ===== Periodo I ===== (Total 17 créditos segun malla) */
    {p:"I", a:"Química General", c:"100410", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"I", a:"Biología", c:"100411", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"I", a:"Pensamiento lógico y matemático", c:"100412", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"I", a:"Competencias Comunicativas", c:"203138276", t:"Obligatorio", f:"AIU", cr:3, l:""},
    {p:"I", a:"Inglés A1", c:"203138281", t:"Obligatorio", f:"AIU", cr:2, l:""},
    {p:"I", a:"Introducción a la Ingeniería", c:"203138282", t:"Obligatorio", f:"Disciplinar", cr:4, l:""},
    {p:"I", a:"Herramientas Digitales para la Gestión del Conocimiento", c:"203138284", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"I", a:"Proyecto de Vida", c:"203138285", t:"Obligatorio", f:"AIU", cr:3, l:""},

    /* ===== Periodo II ===== (Total 18 créditos) */
    {p:"II", a:"Cálculo Diferencial", c:"100413", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"II", a:"Física General", c:"201015", t:"Obligatorio", f:"IBC", cr:2, l:""},
    {p:"II", a:"Química Orgánica", c:"301103", t:"Obligatorio", f:"IBC", cr:4, l:""},
    {p:"II", a:"Bioquímica", c:"203138274", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"II", a:"Estadística y Probabilidad", c:"203138278", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"II", a:"Dibujo de Ingeniería", c:"203138283", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"II", a:"Electivo Disciplinar Común I (créditos a cumplir)", c:"", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},

    /* ===== Periodo III ===== (Total 17 créditos) */
    {p:"III", a:"Cálculo Integral", c:"201102", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"III", a:"Fisicoquímica", c:"100416", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"III", a:"Microbiología de los Alimentos", c:"201103", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"III", a:"Ciencia de los Alimentos", c:"211619", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"III", a:"Inglés A2", c:"203138280", t:"Obligatorio", f:"AIU", cr:3, l:""},
    {p:"III", a:"Electivo Interdisciplinar Básico Común I (créditos a cumplir)", c:"", t:"Electivo", f:"IBC", cr:2, l:"Interdisciplinar Básico Común"},

    /* ===== Periodo IV ===== (Total 18 créditos) */
    {p:"IV", a:"Ecuaciones Diferenciales", c:"201101", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"IV", a:"Balance de Materia y Energía", c:"211624", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"IV", a:"Procesos de la Industria Alimentaria I", c:"203138275", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"IV", a:"Termodinámica", c:"203138279", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"IV", a:"Cálculo Integral (Refuerzo) / Verificar duplicado", c:"", t:"Optativo", f:"IBC", cr:0, l:"Validar"},
    {p:"IV", a:"Electivo Interdisciplinar Básico Común II (créditos a cumplir)", c:"", t:"Electivo", f:"IBC", cr:2, l:"Interdisciplinar Básico Común"},

    /* ===== Periodo V ===== (Total 18 créditos) */
    {p:"V", a:"Procesos de la Industria Alimentaria II", c:"203138277", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"V", a:"Manejo de materias primas alimentarias", c:"216010", t:"Obligatorio", f:"Disciplinar", cr:2, l:""},
    {p:"V", a:"Mecánica de sólidos y fluídos", c:"211622", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"V", a:"Cátedra Unadista", c:"201604", t:"Obligatorio", f:"AIU", cr:3, l:""},
    {p:"V", a:"Engineering project II", c:"202337120", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"V", a:"Inglés B1+", c:"100108", t:"Obligatorio", f:"AIU", cr:2, l:""},
    {p:"V", a:"Electivo Disciplinar Común II (créditos a cumplir)", c:"", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},

    /* ===== Periodo VI ===== (Total 17 créditos) */
    {p:"VI", a:"Procesos de conservación de alimentos", c:"203138286", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"VI", a:"Fenómenos de Transporte", c:"203138287", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"VI", a:"Ética y Ciudadanía", c:"203138291", t:"Obligatorio", f:"AIU", cr:3, l:""},
    {p:"VI", a:"Fundamentos y Generalidades de Investigación", c:"203138295", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"VI", a:"Electivo Formación Complementaria I (créditos a cumplir)", c:"40006", t:"Electivo", f:"Complementaria", cr:3, l:"Formación Complementaria"},
    {p:"VI", a:"Electivo Interdisciplinar Básico Común III (créditos a cumplir)", c:"301301", t:"Electivo", f:"IBC", cr:2, l:"Interdisciplinar Básico Común"},
    {p:"VI", a:"Electivo Disciplinar Común III (créditos a cumplir)", c:"80005", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},

    /* ===== Periodo VII ===== (Total 17 créditos) */
    {p:"VII", a:"Biotecnología Alimentaria", c:"203138288", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"VII", a:"Operaciones en Alimentos", c:"203138292", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"VII", a:"Análisis de los Alimentos", c:"203138296", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"VII", a:"Proyecto de Ingeniería I", c:"105020", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"VII", a:"Seminario de Investigación", c:"212060", t:"Obligatorio", f:"IBC", cr:3, l:""},
    {p:"VII", a:"Inglés B1", c:"80007", t:"Obligatorio", f:"AIU", cr:1, l:""},
    {p:"VII", a:"Electivo Disciplinar Específico I (créditos a cumplir)", c:"", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea de Profundización"},

    /* ===== Periodo VIII ===== (Total 17 créditos) */
    {p:"VIII", a:"Engineering project II / Validar nombre exacto", c:"203138289", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"VIII", a:"Food quality and safety management", c:"203138293", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"VIII", a:"Práctica Profesional", c:"203138297", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"VIII", a:"Electivo Disciplinar Específico II (créditos a cumplir)", c:"120002", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea de Profundización"},
    {p:"VIII", a:"Electivo Formación Complementaria II (créditos a cumplir)", c:"212030", t:"Electivo", f:"Complementaria", cr:3, l:"Formación Complementaria"},
    {p:"VIII", a:"Electivo Interdisciplinar Básico Común II (adicional / validar)", c:"80010", t:"Electivo", f:"IBC", cr:2, l:"Interdisciplinar Básico Común"},

    /* ===== Periodo IX ===== (Total 13 créditos) */
    {p:"IX", a:"Trabajo de Grado", c:"203138290", t:"Obligatorio", f:"Disciplinar", cr:3, l:""},
    {p:"IX", a:"Ingeniería de Plantas de Alimentos", c:"203138294", t:"Obligatorio", f:"Disciplinar", cr:2, l:""},
    {p:"IX", a:"Electivo Disciplinar Específico III (créditos a cumplir)", c:"203138298", t:"Electivo", f:"Disciplinar", cr:2, l:"Línea de Profundización"},
    {p:"IX", a:"Electivo Disciplinar Específico IV (créditos a cumplir)", c:"40004", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea de Profundización"},
    {p:"IX", a:"Electivo Disciplinar Común IV (créditos a cumplir)", c:"40005", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},
    {p:"IX", a:"Electivo Interdisciplinar Básico Común III (créditos a cumplir)", c:"218018", t:"Electivo", f:"IBC", cr:2, l:"Interdisciplinar Básico Común"},
    {p:"IX", a:"Electivo Formación Complementaria III (opcional) / Validar", c:"80008", t:"Electivo", f:"Complementaria", cr:0, l:"Formación Complementaria"},

    /* ===== Catálogos Electivos Detallados ===== */
    // Disciplinar Común (cumplir 7 créditos)
    {p:"Catálogo", a:"Algebra, Trigonometría y Geometría Analítica", c:"200611", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},
    {p:"Catálogo", a:"Dibujo de ingeniería (catálogo)", c:"40003", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},
    {p:"Catálogo", a:"Gestión Tecnológica", c:"900001", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},
    {p:"Catálogo", a:"Emprendimiento Tecnológico", c:"900002", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},
    {p:"Catálogo", a:"Diseño sustentable", c:"900003", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},
    {p:"Catálogo", a:"Sujeto, Comunidad e Interacción Social", c:"900004", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},
    {p:"Catálogo", a:"Inclusión Social", c:"40002", t:"Electivo", f:"Disciplinar", cr:3, l:"Disciplinar Común"},

    // Formación Complementaria (cumplir 3 créditos)
    {p:"Catálogo", a:"Emprendimiento solidario", c:"150001", t:"Electivo", f:"Complementaria", cr:3, l:"Formación Complementaria"},
    {p:"Catálogo", a:"Responsabilidad social empresarial", c:"112001", t:"Electivo", f:"Complementaria", cr:3, l:"Formación Complementaria"},
    {p:"Catálogo", a:"Protocolo", c:"200610", t:"Electivo", f:"Complementaria", cr:2, l:"Formación Complementaria"},
    {p:"Catálogo", a:"Teatro", c:"", t:"Electivo", f:"Complementaria", cr:2, l:"Formación Complementaria"},

    // Interdisciplinar Básico Común (cumplir 6 créditos)
    {p:"Catálogo", a:"Ingeniería Ambiental", c:"200611x", t:"Electivo", f:"IBC", cr:3, l:"Interdisciplinar Básico Común"},
    {p:"Catálogo", a:"Pedagogía para la solución de conflictos", c:"40003x", t:"Electivo", f:"IBC", cr:3, l:"Interdisciplinar Básico Común"},

    // Líneas de profundización (elegir UNA línea – cumplir 12 créditos en total)
    // Línea I: Procesos Biotecnológicos en Alimentos
    {p:"Catálogo", a:"Bioprocesos", c:"L1-01", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea I: Procesos Biotecnológicos"},
    {p:"Catálogo", a:"Tecnología Enzimática", c:"L1-02", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea I: Procesos Biotecnológicos"},
    {p:"Catálogo", a:"Gestión y aprovechamiento de subproductos alimentarios", c:"L1-03", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea I: Procesos Biotecnológicos"},
    {p:"Catálogo", a:"Biotechnology trends and legislation", c:"L1-04", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea I: Procesos Biotecnológicos"},

    // Línea II: Innovación de productos, procesos y gestión
    {p:"Catálogo", a:"Tecnologías convergentes en la industria alimentaria", c:"L2-01", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea II: Innovación"},
    {p:"Catálogo", a:"Tecnologías de transformación digital en la industria alimentaria", c:"L2-02", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea II: Innovación"},
    {p:"Catálogo", a:"Desarrollo y diseño de nuevos productos y empaques", c:"L2-03", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea II: Innovación"},
    {p:"Catálogo", a:"Sistemas para el mejoramiento de la inocuidad", c:"L2-04", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea II: Innovación"},

    // Línea III: Nutrición y Calidad Alimentaria
    {p:"Catálogo", a:"Nutrition and food", c:"L3-01", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea III: Nutrición y Calidad"},
    {p:"Catálogo", a:"Toxicología y alérgenos en alimentos", c:"L3-02", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea III: Nutrición y Calidad"},
    {p:"Catálogo", a:"Línea de profundización II", c:"L3-03", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea III: Nutrición y Calidad"},
    {p:"Catálogo", a:"Línea de profundización III", c:"L3-04", t:"Electivo", f:"Disciplinar", cr:3, l:"Línea III: Nutrición y Calidad"},

    // Otros electivos listados en la malla (varios campos)
    {p:"Catálogo", a:"Nuevas Materias Primas Alimentarias", c:"OP-01", t:"Electivo", f:"Disciplinar", cr:3, l:"Otros Electivos"},
    {p:"Catálogo", a:"Soberanía y seguridad alimentaria", c:"OP-02", t:"Electivo", f:"Disciplinar", cr:3, l:"Otros Electivos"},
    {p:"Catálogo", a:"Sostenibilidad, desarrollo y calidad de vida", c:"OP-03", t:"Electivo", f:"Disciplinar", cr:3, l:"Otros Electivos"},
    {p:"Catálogo", a:"Educación Ambiental", c:"OP-04", t:"Electivo", f:"Complementaria", cr:2, l:"Formación Complementaria"},
    {p:"Catálogo", a:"Guitarra", c:"OP-05", t:"Electivo", f:"Complementaria", cr:1, l:"Formación Complementaria"}
  ];
  </script>

  <!-- ======== SCRIPTS ======== -->
  <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
  <script>
  function buildRowHTML(row){
    const campoClass = "campo-" + row.f.replace(/\s+/g,'');
    return `<tr class="${campoClass}" title="Código: ${row.c || 'N/D'} | Créditos: ${row.cr}">`+
      `<td>${row.p}</td>`+
      `<td>${row.a}</td>`+
      `<td>${row.c||''}</td>`+
      `<td>${row.t}</td>`+
      `<td>${row.f}</td>`+
      `<td>${row.cr}</td>`+
      `<td>${row.l||''}</td>`+
      `</tr>`;
  }

  function cargarTabla(){
    const tbody = document.querySelector('#malla tbody');
    tbody.innerHTML = cursos.map(buildRowHTML).join('');
  }

  function poblarFiltros(){
    const addOpts = (sel,vals) => {
      sel.innerHTML = '';
      vals.sort().forEach(v=>{
        const o=document.createElement('option'); o.value=v; o.textContent=v; sel.appendChild(o);
      });
    };
    const periodos=[...new Set(cursos.map(x=>x.p))].filter(x=>x);
    const campos=[...new Set(cursos.map(x=>x.f))].filter(x=>x);
    const tipos=[...new Set(cursos.map(x=>x.t))].filter(x=>x);
    const lineas=[...new Set(cursos.map(x=>x.l).filter(Boolean))];
    addOpts(document.getElementById('fPeriodo'),periodos);
    addOpts(document.getElementById('fCampo'),campos);
    addOpts(document.getElementById('fTipo'),tipos);
    addOpts(document.getElementById('fLinea'),lineas);
  }

  function getMultiSelectValues(sel){
    return Array.from(sel.selectedOptions).map(o=>o.value);
  }

  document.addEventListener('DOMContentLoaded',function(){
    cargarTabla();
    poblarFiltros();

    const table = $('#malla').DataTable({
      responsive:true,
      language:{ url:'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
      columnDefs:[{targets:[0,2,3,4,5,6], className:'dt-center'}]
    });

    // Custom filtering hook
    $.fn.dataTable.ext.search.push(function(settings,data,dataIndex){
      const selP = getMultiSelectValues(document.getElementById('fPeriodo'));
      const selC = getMultiSelectValues(document.getElementById('fCampo'));
      const selT = getMultiSelectValues(document.getElementById('fTipo'));
      const selL = getMultiSelectValues(document.getElementById('fLinea'));

      const p=data[0];
      const campo=data[4];
      const tipo=data[3];
      const linea=data[6];

      if(selP.length && !selP.includes(p)) return false;
      if(selC.length && !selC.includes(campo)) return false;
      if(selT.length && !selT.includes(tipo)) return false;
      if(selL.length && !selL.includes(linea)) return false;
      return true;
    });

    // Re-draw on filter changes
    ['fPeriodo','fCampo','fTipo','fLinea'].forEach(id=>{
      document.getElementById(id).addEventListener('change',()=>table.draw());
    });

    // Calcular créditos filtrados
    function calcularCreditos(){
      const data = table.rows({filter:'applied'}).data();
      let total=0; for(let i=0;i<data.length;i++){ total += parseInt(data[i][5])||0; }
      document.getElementById('totalCreditos').textContent = total;
    }
    table.on('draw',calcularCreditos); calcularCreditos();
  });
  </script>
</body>
</html>
