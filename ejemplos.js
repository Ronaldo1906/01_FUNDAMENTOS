// tipos de dstos en js

const s = "hola mundo"; // string
const n = 123; // number
const b = true; // boolean
const a = [1, 2, 3]; // array
const o = { nombre: "juan", edad: 30 }; // object

let u; // undefined

const big = 1234567890123456789012345678901234567890n; // bigint

console.log(typeof s); // string
console.log(typeof n); // number
console.log(typeof b); // boolean
console.log(typeof a); // object
console.log(typeof o); // object
console.log(typeof u); // undefined
console.log(typeof big); // bigint

// let vs const

// const no permite reasignar el valor de una variable, mientras que let sí lo permite

const x = 10;
// x = 20; // error: Assignment to constant variable.

const user = { name: "Alice", age: 25 };
user.name = "Bob"; // esto es permitido, ya que no estamos reasignando la variable user, sino modificando su propiedad name

let saldo = 0;
saldo = 100; // esto es permitido, ya que let permite reasignar el valor de la variable saldo

// cONVERSION DE TIPOS (coercion) VS  conversion explicita

// Coercion (implicita)

console.log("5" + 10); // concatena "5" y "10" para dar "510"|
console.log("5" - 10); // convierte "5" a número y resta 10 para dar -5
console.log(true + 1); // convierte true a 1

// coercion explicita

const input = "12.5";
const value = Number(input);

if (!Number.isFinite(value)) {
  console.log("El valor no es un número válido");
} else {
  console.log("El valor es un número válido:", value);
}

function toNumberStrict(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new Error("El valor no es un número válido");

  return n;
}

console.log(toNumberStrict("12.5")); // 12.5
//console.log(toNumberStrict("abc")); // Error: El valor no es un número válido

// Operdores clave

// 1)  ===  vs ==
console.log(5 == "5"); // true (coercion)
console.log(5 === "5"); // false (sin coercion)
// !== vs !=
console.log(5 !== "5"); // true (sin coercion)
console.log(5 != "5"); // false (coercion)

//2) || / && / ??
//  Falsy:false, 0, "", null, undefined, NaN

const name = "";
console.log(name || "Invitado"); // "Invitado" (name es falsy)

console.log(name && "Invitado"); // "" (name es falsy, devuelve name)

console.log(name ?? "Invitado"); // "" (name no es null ni undefined, devuelve name)

// template literal

const ingreso = 1200000;
const gasto = 800000;
const mensaje = `El ingreso es de ${ingreso} y el gasto es de ${gasto}. El balance es de ${ingreso - gasto}.`;

console.log(mensaje);

// usar +  cuando queremos concatenar strings sin variables o con variables que no sean strings, y usar template literals cuando queremos incluir variables dentro de un string de forma más legible y fácil de mantener.

const firstName = "Alice";
const lastName = "Smith";

// Concatenación con +
const fullName1 = firstName + " " + lastName;
console.log(fullName1); // "Alice Smith"

// Template literal
const fullName2 = `${firstName} ${lastName}`;
console.log(fullName2); // "Alice Smith"

// Control de flujo: if, else, switch, for, while

// if, else

function calcularBalance(ingreso, gasto) {
  if (!Number.isFinite(ingreso) || !Number.isFinite(gasto)) {
    throw new Error("Ingreso y gasto deben ser números válidos");
  }
  return ingreso - gasto;
}

console.log(calcularBalance(1200000, 800000)); // 400000

// ejemplp if else
function evaluarBalance(balance) {
  if (balance > 0) {
    return "Balance positivo";
  } else if (balance < 0) {
    return "Balance negativo";
  } else {
    return "Balance neutro";
  }
}

console.log(evaluarBalance(400000)); // "Balance positivo"

// switch 

function evaluarBalanceSwitch(balance) {
  switch (true) { // switch con expresión true para evaluar condiciones
    case balance > 0:
      return "Balance positivo";
    case balance < 0:
      return "Balance negativo";
    default:
      return "Balance neutro";
  }
}


// operador ternario

function evaluarBalanceTernario(balance) {
     return balance > 0 ? "Balance positivo" : balance < 0 ? "Balance negativo" : "Balance neutro";
}

console.log(evaluarBalanceTernario(400000)); // "Balance positivo"

// while 

function contarHasta(n) {
  let i = 1;
    while (i <= n) {
      console.log(i);
      i++;
    }
}

console.log(contarHasta(5)); // 1, 2, 3, 4, 5

// bucles for, for... of. while

const gastos = [200000, 150000, 300000];
let totalGastos = 0;

for (let i = 0; i < gastos.length; i++) {
  totalGastos += gastos[i];
}

console.log("Total de gastos:", totalGastos); // Total de gastos: 650000


// ERRORES Y MANEJO BASICO  SIN ROMPER PROGRAMA


// eje,mplo rompiendo el programa   

function dividir(a, b) {
  return a / b;
}

//rompe el programa si b es 0
console.log(dividir(10, 0)); // Infinity

// manejo de errores con try...catch
function dividirSeguro(a, b) {
  try {
    if (b === 0) {
      throw new Error("No se puede dividir por cero");
    }
    return a / b;
  } catch (error) {
    console.error("Error:", error.message);
    return null; // o algún valor por defecto
  }
}

console.log(dividirSeguro(10, 0)); // Error: No se puede dividir por cero, null

// depuración con console.log

const report = { ingreso: 1200000, gasto: 800000, balance: 400000 };

console.table(report); // muestra el objeto report en formato de tabla para facilitar su lectura

console.time("calculoBalance");
const balance = calcularBalance(report.ingreso, report.gasto);
console.timeEnd("calculoBalance"); // muestra el tiempo que tomó ejecutar el cálculo del balance

console.group("Reporte financiero");
console.log("Ingreso:", report.ingreso);
console.log("Gasto:", report.gasto);
console.log("Balance:", report.balance);
console.groupEnd(); // agrupa los logs relacionados con el reporte financiero para mejorar la organización en la consola