const TOTAL_PROGRAMA = 152;

const SEMESTER_TO_YEAR = {
  "I": "Primero",
  "II": "Primero",
  "III": "Segundo",
  "IV": "Segundo",
  "V": "Tercero",
  "VI": "Tercero",
  "VII": "Cuarto",
  "VIII": "Cuarto",
  "IX": "Quinto",
};

const CURSOS = [
  {periodo:"I", asignatura:"Química General", creditos:3},
  {periodo:"I", asignatura:"Biología", creditos:3},
  {periodo:"I", asignatura:"Pensamiento lógico y matemático", creditos:3},
  {periodo:"I", asignatura:"Competencias Comunicativas", creditos:3},
  {periodo:"I", asignatura:"Inglés A1", creditos:2},
  {periodo:"I", asignatura:"Introducción a la Ingeniería", creditos:4},
  {periodo:"I", asignatura:"Herramientas Digitales", creditos:3},
  {periodo:"I", asignatura:"Proyecto de Vida", creditos:3},

  {periodo:"II", asignatura:"Cálculo Diferencial", creditos:3},
  {periodo:"II", asignatura:"Física General", creditos:2},
  {periodo:"II", asignatura:"Química Orgánica", creditos:4},
  {periodo:"II", asignatura:"Bioquímica", creditos:3},
  {periodo:"II", asignatura:"Estadística y Probabilidad", creditos:3},
  {periodo:"II", asignatura:"Dibujo de Ingeniería", creditos:3},

  {periodo:"III", asignatura:"Cálculo Integral", creditos:3},
  {periodo:"III", asignatura:"Fisicoquímica", creditos:3},
  {periodo:"III", asignatura:"Microbiología de los Alimentos", creditos:3},
  {periodo:"III", asignatura:"Ciencia de los Alimentos", creditos:3},
  {periodo:"III", asignatura:"Inglés A2", creditos:3},

  {periodo:"IV", asignatura:"Ecuaciones Diferenciales", creditos:3},
  {periodo:"IV", asignatura:"Balance de Materia y Energía", creditos:3},
  {periodo:"IV", asignatura:"Procesos de la Industria Alimentaria I", creditos:3},
  {periodo:"IV", asignatura:"Termodinámica", creditos:3},
  {periodo:"IV", asignatura:"Procesos de la Industria Alimentaria II", creditos:3},
  {periodo:"IV", asignatura:"Inglés B1+", creditos:3},

  {periodo:"V", asignatura:"Manejo de materias primas", creditos:2},
  {periodo:"V", asignatura:"Mecánica de sólidos y fluídos", creditos:3},
  {periodo:"V", asignatura:"Cátedra Unadista", creditos:3},
  {periodo:"V", asignatura:"Engineering Project II", creditos:3},
  {periodo:"V", asignatura:"Inglés B1", creditos:2},

  {periodo:"VI", asignatura:"Procesos de conservación de alimentos", creditos:3},
  {periodo:"VI", asignatura:"Fenómenos de Transporte", creditos:3},
  {periodo:"VI", asignatura:"Ética y Ciudadanía", creditos:3},
  {periodo:"VI", asignatura:"Fundamentos de Investigación", creditos:3},

  {periodo:"VII", asignatura:"Biotecnología Alimentaria", creditos:3},
  {periodo:"VII", asignatura:"Operaciones en Alimentos", creditos:3},
  {periodo:"VII", asignatura:"Análisis de los Alimentos", creditos:3},
  {periodo:"VII", asignatura:"Proyecto de Ingeniería I", creditos:3},
  {periodo:"VII", asignatura:"Seminario de Investigación", creditos:3},

  {periodo:"VIII", asignatura:"Práctica Profesional", creditos:3},
  {periodo:"VIII", asignatura:"Ingeniería de Plantas", creditos:3},
  {periodo:"VIII", asignatura:"Food Quality and Safety", creditos:3},

  {periodo:"IX", asignatura:"Trabajo de Grado", creditos:3},
  {periodo:"IX", asignatura:"Ingeniería Ambiental", creditos:2},
  {periodo:"IX", asignatura:"Pedagogía para la solución de conflictos", creditos:2},
];

let seleccionados = new Set();
function itemId(c){return `${c.periodo}-${c.asignatura}`;}

function renderYears(){
  const years = {};
  CURSOS.forEach(c=>{
    const year = SEMESTER_TO_YEAR[c.periodo] || "Otro";
    years[year] = years[year] || [];
    years[year].push(c);
  });

  const order = ["Primero","Segundo","Tercero","Cuarto","Quinto"];
  const cont = document.getElementById('yearsGrid');
  cont.innerHTML = order.map(y=>{
    const semestres = groupByPeriod(years[y]||[]);
    return `<div class="year-col"><h2 class="year-title">${y}</h2>
      ${semestres.map(s=>buildSemesterCard(s.periodo,s.cursos,y)).join("")}
    </div>`;
  }).join("");
  attachClicks();
}

function groupByPeriod(cursos){
  const map={};
  cursos.forEach(c=>{map[c.periodo]=map[c.periodo]||[];map[c.periodo].push(c);});
  const order=["I","II","III","IV","V","VI","VII","VIII","IX"];
  return Object.keys(map).sort((a,b)=>order.indexOf(a)-order.indexOf(b))
    .map(p=>({periodo:p,cursos:map[p]}));
}

function buildSemesterCard(periodo,cursos,year){
  const pills=cursos.map(c=>{
    const sel=seleccionados.has(itemId(c))?"selected":"";
    return `<div class="course-pill ${sel}" data-id="${itemId(c)}">
      ${c.asignatura}<span class="credits-badge">(${c.creditos})</span>
    </div>`;
  }).join("");
  return `<div class="sem-card" data-year="${year}">
    <h3 class="sem-title">${romano(periodo)}° semestre</h3>
    <div class="courses-list">${pills}</div>
  </div>`;
}

function attachClicks(){
  document.querySelectorAll('.course-pill').forEach(el=>{
    el.addEventListener('click',()=>{
      const id=el.getAttribute('data-id');
      if(seleccionados.has(id))seleccionados.delete(id);
      else seleccionados.add(id);
      updateCreditos();
      renderYears();
    });
  });
}

function romano(p){const r={"I":1,"II":2,"III":3,"IV":4,"V":5,"VI":6,"VII":7,"VIII":8,"IX":9};return r[p]||"?";}

function updateCreditos(){
  let total=0;
  CURSOS.forEach(c=>{
    if(seleccionados.has(itemId(c)))total+=c.creditos;
  });
  document.getElementById('creditosMarcados').textContent=total;
}

document.addEventListener('DOMContentLoaded',()=>{
  renderYears();
  updateCreditos();
});


   
