// construit un conversor dque reciba una entrada  (valor +  unidad de origen + unidad de destino)
// validae correctamente la entrada y devolver el valor formateado

const { useSyncExternalStore } = require("react")

// Temperatura: C, F, K
// Longitud: m, cm, km
// Peso: kg, g, lb

// Temperatura
- C a F: (C* 9/5) + 32
- C a K: C + 273.15
- F a C: (F - 32) * 5/9
- F a K: (F - 32) * 5/9 + 273.15
- K a C: K - 273.15
- K a F: (K - 273.15) * 9/5 + 32

// Longitud
- m a cm: m * 100
- m a km: m / 1000
- cm a m: cm / 100
- cm a km: cm / 100000
- km a m: km * 1000
- km a cm: km * 100000

// Peso
- kg a g: kg * 1000
- kg a lb: kg * 2.20462
- g a kg: g / 1000
- g a lb: g / 453.592
- lb a kg: lb / 2.20462
- lb a g: lb * 453.592
// Restricciones
// No usar librerias
//debes validar entradas y manejar errores de forma adecuada
//el programa no debe romperse ante entradas invalidas, 
 //sino que debe informar al usuario de manera clara y amigable sobre el error y cómo corregirlo.
 
 //soluciion de actividad.
 
 /**
 * Conversor Universal de Unidades
 * Soporta: Temperatura (C, F, K), Longitud (m, cm, km) y Peso (kg, g, lb)
 */

function conversorUniversal(valor, origen, destino) {
    // 1. Validaciones iniciales de tipo
    if (typeof valor !== 'number' || isNaN(valor)) {
        return "❌ Error: El valor debe ser un número válido.";
    }

    // Normalizar entradas a minúsculas para evitar errores de capitalización
    const unitO = origen.toLowerCase();
    const unitD = destino.toLowerCase();

    // 2. Definición de Categorías (para asegurar que no convierta kg a Celsius, por ejemplo)
    const categorias = {
        temperatura: ['c', 'f', 'k'],
        longitud: ['m', 'cm', 'km'],
        peso: ['kg', 'g', 'lb']
    };

    // Encontrar a qué categoría pertenecen las unidades
    const catOrigen = Object.keys(categorias).find(cat => categorias[cat].includes(unitO));
    const catDestino = Object.keys(categorias).find(cat => categorias[cat].includes(unitD));

    // 3. Validar existencia y compatibilidad
    if (!catOrigen) return `❌ Error: '${origen}' no es una unidad soportada.`;
    if (!catDestino) return `❌ Error: '${destino}' no es una unidad soportada.`;
    if (catOrigen !== catDestino) {
        return `❌ Error crítico: No se puede convertir ${catOrigen} (${origen}) a ${catDestino} (${destino}).`;
    }

    // Si las unidades son iguales, retornar el mismo valor
    if (unitO === unitD) return `${valor.toFixed(2)} ${unitD}`;

    // 4. Lógica de Conversión
    let resultado;

    try {
        switch (catOrigen) {
            case 'temperatura':
                resultado = convertirTemperatura(valor, unitO, unitD);
                break;
            case 'longitud':
                resultado = convertirLongitud(valor, unitO, unitD);
                break;
            case 'peso':
                resultado = convertirPeso(valor, unitO, unitD);
                break;
        }

        // 5. Formatear salida (limitado a 2 decimales para limpieza)
        return `✅ Resultado: ${valor} ${unitO} equivalen a ${resultado.toFixed(2)} ${unitD}`;

    } catch (error) {
        return "⚠️ Ocurrió un error inesperado al procesar la conversión.";
    }
}

// --- Funciones de Cálculo ---

function convertirTemperatura(v, o, d) {
    // Convertimos todo primero a Celsius como unidad base
    let celsius;
    if (o === 'c') celsius = v;
    else if (o === 'f') celsius = (v - 32) * 5/9;
    else if (o === 'k') celsius = v - 273.15;

    // De Celsius al destino
    if (d === 'c') return celsius;
    if (d === 'f') return (celsius * 9/5) + 32;
    if (d === 'k') return celsius + 273.15;
}

function convertirLongitud(v, o, d) {
    const metros = { m: 1, cm: 0.01, km: 1000 };
    // Convertir a metros, luego a destino
    const valorEnMetros = v * metros[o];
    return valorEnMetros / metros[d];
}

function convertirPeso(v, o, d) {
    const gramos = { g: 1, kg: 1000, lb: 453.592 };
    // Convertir a gramos, luego a destino
    const valorEnGramos = v * gramos[o];
    return valorEnGramos / gramos[d];
}

// --- Pruebas de funcionamiento ---
console.log(conversorUniversal(100, 'C', 'F'));    // Temperatura
console.log(conversorUniversal(10, 'km', 'm'));   // Longitud
console.log(conversorUniversal(1, 'kg', 'lb'));   // Peso
console.log(conversorUniversal(50, 'kg', 'C'));   // Error de mezcla
console.log(conversorUniversal("hola", 'm', 'cm')); // Error de tipo