import { extractData } from '../../../Entregable_1/src/code/json_data_extractor.js';

async function calculateBothMeans() {
  const extractedData = await extractData();

  // simple object to store sums and counts
  const estadisticas: any = {};

  // Standard loop to go through the gas stations
  for (const gasolinera of extractedData) {
    const provincia = gasolinera.provincia;

    // If its the first time we see this province, we initialize it
    if (estadisticas[provincia] === undefined) {
      estadisticas[provincia] = {
        sumaDiesel: 0, 
        cantidadDiesel: 0,
        sumaGasolina: 0, 
        cantidadGasolina: 0
      };
    }

    // Clean the prices (change comma to dot)
    const precioDiesel = parseFloat(gasolinera.diesel_A.replace(',', '.'));
    const precioGasolina = parseFloat(gasolinera.gasolina_95.replace(',', '.'));

    // If the price is a valid number, we add it up
    if (isNaN(precioDiesel) == false) {
      estadisticas[provincia].sumaDiesel += precioDiesel;
      estadisticas[provincia].cantidadDiesel++;
    }

    if (isNaN(precioGasolina) == false) {
      estadisticas[provincia].sumaGasolina += precioGasolina;
      estadisticas[provincia].cantidadGasolina++;
    }
  }

  // Prepare the final table
  const resultados = [];

  // Loop through the saved provinces
  for (const prov in estadisticas) {
    const datos = estadisticas[prov];
    
    // Calculate diesel average
    let mediaDiesel = "N/A";
    if (datos.cantidadDiesel > 0) {
      mediaDiesel = (datos.sumaDiesel / datos.cantidadDiesel).toFixed(3) + " €";
    }

    // Calculate gasoline average
    let mediaGasolina = "N/A";
    if (datos.cantidadGasolina > 0) {
      mediaGasolina = (datos.sumaGasolina / datos.cantidadGasolina).toFixed(3) + " €";
    }

    // Add the result to our list
    resultados.push({
      Provincia: prov,
      'Media Diesel A': mediaDiesel,
      'Media Gasolina 95': mediaGasolina
    });
  }

  console.log("\nMean Prices per Province:");
  console.table(resultados);
}

async function calculateTops() {
  const extractedData = await extractData();

  const listaDiesel = [];
  const listaGasolina = [];

  //Separate and clean the data with a standard loop
  for (const gasolinera of extractedData) {
    const precioD = parseFloat(gasolinera.diesel_A.replace(',', '.'));
    const precioG = parseFloat(gasolinera.gasolina_95.replace(',', '.'));

    // If diesel price is valid, add it to the diesel list
    if (isNaN(precioD) == false) {
      listaDiesel.push({
        Rótulo: gasolinera.estacion,
        Provincia: gasolinera.provincia,
        Municipio: gasolinera.municipio,
        Precio: precioD
      });
    }

    // If gasoline price is valid, add it to the gasoline list
    if (isNaN(precioG) == false) {
      listaGasolina.push({
        Rótulo: gasolinera.estacion,
        Provincia: gasolinera.provincia,
        Municipio: gasolinera.municipio,
        Precio: precioG
      });
    }
  }

  // Sort the lists
  // We use .slice() to make a quick copy so we don't mess up the original arrays
  // a.Precio - b.Precio sorts from cheapest to most expensive
  
  const dieselBarato = listaDiesel.slice().sort((a, b) => a.Precio - b.Precio).slice(0, 5);
  const dieselCaro = listaDiesel.slice().sort((a, b) => b.Precio - a.Precio).slice(0, 5);

  const gasolinaBarata = listaGasolina.slice().sort((a, b) => a.Precio - b.Precio).slice(0, 5);
  const gasolinaCara = listaGasolina.slice().sort((a, b) => b.Precio - a.Precio).slice(0, 5);

  // rint the tables
  console.log("\n--- TOP 5 MÁS BARATAS: DIESEL A ---");
  console.table(dieselBarato);

  console.log("\n--- TOP 5 MÁS CARAS: DIESEL A ---");
  console.table(dieselCaro);

  console.log("\n--- TOP 5 MÁS BARATAS: GASOLINA 95 E5 ---");
  console.table(gasolinaBarata);

  console.log("\n--- TOP 5 MÁS CARAS: GASOLINA 95 E5 ---");
  console.table(gasolinaCara);
}

calculateTops();
calculateBothMeans();