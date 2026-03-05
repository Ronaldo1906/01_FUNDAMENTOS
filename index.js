// calculadiora de presupuestos mensual
// * registra ingresos y gastos
// * calcula totales, balance
// * Determina SUPERAVIT que es el saldo de la cuenta individual de vivienda del trabajador,
//  que se utiliza para financiar la compra de una vivienda, construcción o mejora de la misma,
//  o para pagar una hipoteca relacionada con la vivienda.
//  EQUILIBRADO  y DEFICIT

// REQUISITOS FUNCIONALES
// * Crear listas  Ingresos[] y Gastos[] con objetos {concepto, monto}
// * Validar: monto debe ser numero finito > = 0
// * Calcular: totalIngresos, totalGastos, balance
// * Clasificar eStdo segun balance
// * Mostrar reporte en consola (TABLA + RESUMEN)

"use strict"; // "use strict" es una directiva que se utiliza en JavaScript para activar el modo estricto,
// lo que ayuda a prevenir errores comunes y mejora la seguridad del código.
//  Al usar "use strict", se aplican reglas más estrictas en la interpretación del código,
// lo que puede ayudar a detectar errores de manera más temprana y evitar comportamientos inesperados.

function validarMonto(monto) {
  const n = Number(monto);
  if (!Number.isFinite(n) || n < 0) {
    throw new Error("El monto debe ser un número finito mayor o igual a cero");
  }
  return n;
}

// MODELAR DTOS DE INGRESOS Y GASTOS

const ingresos = [
  { concepto: "Salario", monto: 500000 },
  { concepto: "Freelance", monto: 200000 },
];

const gastos = [
  { concepto: "Alquiler", monto: 150000 },
  { concepto: "Comida", monto: 50000 },
  { concepto: "Transporte", monto: 30000 },
];

// CALCULAR TOTALES Y BALANCE
function calcularTotal(items) {
  let total = 0;
  for (const item of items) {
    total += validarMonto(item.monto);
  }
  return total;
}

const totalIngresos = calcularTotal(ingresos);
const totalGastos = calcularTotal(gastos);
const balance = totalIngresos - totalGastos;

// CLASIFICAR ESTADO FINANCIERO

function clasificarBalance(balance) {
  if (balance > 0) {
    return "SUPERAVIT";
  } else if (balance === 0) {
    return "EQUILIBRADO";
  } else {
    return "DEFICIT";
  }
}

function mostrarReporte() {
  console.table(ingresos);
  console.table(gastos);
  console.log("Total Ingresos:", totalIngresos);
  console.log("Total Gastos:", totalGastos);
  console.log("Balance:", balance);
  console.log("Estado financiero:", clasificarBalance(balance));
}

mostrarReporte();