/* script.js - Malla Curricular Interactiva – Ingeniería de Alimentos
 * Requisitos: jQuery, DataTables, Bootstrap 5 (ya incluidos en index.html)
 * Edita el arreglo DATASET para actualizar información.
 * TOTAL_PROGRAMA = 152 créditos (meta de avance).
 */

/* =========================
 *  DATASET
 * =========================
 * Cada objeto:
 * {
 *   periodo: "I" | "II" | ... | "IX" | "-" (si es electiva sin periodo fijo),
 *   asignatura: "Nombre",
 *   codigo: "####",
 *   tipo: "Obligatorio" | "Electivo",
 *   campo: "IBC" | "AIU" | "Disciplinar" | "Complementaria",
 *   creditos: número,
 *   linea: "" | "Disciplinar Común" | "Formación Complementaria" | "Línea I – Procesos Biotecnológicos" | ...
 * }
 */

const DATASET = [
  /* ---------- PERIODO I (17 crédito*

