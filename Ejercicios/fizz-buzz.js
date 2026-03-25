/**
 * Problema FizzBuzz
 * 
 * Definición:
 * 
 * Queremos hacer un programa que imprima los 30 primeros números naturales (1 al 30)
 * 
 * Pero:
 *   - Si el número es multiplo de 3, en lugar del número imprime "Fizz"
 *   - Si el número es multiplo de 5, en lugar del número imprime "Buzz"
 *   - Si el número es multiplo de 3 y de 5, en lugar del número imprime "FizzBuzz"
 *   - En cualquier otro caso, simplemente imprime el número
 */

// Nota: para saber si un número es múltiplo de 3, se puede usar la condición:  (n % 3 == 0)


// Mi codigo
for (let i = 1; i < 31; i++) {
    if (i % 3 == 0 && i % 5 == 0){
        console.log("FizzBuzz")

    } else if(i % 5 == 0){
        console.log("Buzz")

    } else if(i % 3 == 0){
        console.log("Fizz")

    } else{
        console.log(`${i}`);
    }
}

// Codigo Mejorado

for (let i = 1; i <= 30; i++) {
    let output = "";

    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";

    // If output is still an empty string (falsy), use the number
    console.log(output || i);
}
