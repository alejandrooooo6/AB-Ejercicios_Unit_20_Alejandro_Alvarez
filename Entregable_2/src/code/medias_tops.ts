import { extractData } from '../../../Entregable_1/src/code/json_data_extractor.js';

async function calculateBothMeans() {
  const extractedData = await extractData();

  // Storage setup
  const stats: Record<string, { 
    diesel_A: { total: number; count: number };
    gasolina_95: { total: number; count: number };
  }> = {};

  // Loop through the stations
  for (const station of extractedData) {
    const provName = station.provincia;

    // If we haven't seen this province, initialize its structure for both fuels
    if (!stats[provName]) {
      stats[provName] = {
        diesel_A: { total: 0, count: 0 },
        gasolina_95: { total: 0, count: 0 }
      };
    }

    // Clean and convert BOTH prices
    const priceDiesel = parseFloat(station.diesel_A.replace(',', '.'));
    const priceGasolina = parseFloat(station.gasolina_95.replace(',', '.'));

    // If Diesel A is a valid number, add it to the diesel totals
    if (!isNaN(priceDiesel)) {
      stats[provName].diesel_A.total += priceDiesel;
      stats[provName].diesel_A.count++;
    }

    // If Gasolina 95 is a valid number, add it to the gasolina totals
    if (!isNaN(priceGasolina)) {
      stats[provName].gasolina_95.total += priceGasolina;
      stats[provName].gasolina_95.count++;
    }
  }

  // Calculate final means and format for the table
  const results = Object.keys(stats).map(prov => {
    const dStats = stats[prov].diesel_A;
    const gStats = stats[prov].gasolina_95;

    // Calculate averages (checking if count > 0, to  prevent "NaN" errors )
    const meanDiesel = dStats.count > 0 
      ? (dStats.total / dStats.count).toFixed(3) + " €" 
      : "N/A";
      
    const meanGasolina = gStats.count > 0 
      ? (gStats.total / gStats.count).toFixed(3) + " €" 
      : "N/A";

    return {
      Provincia: prov,
      'Media Diesel A': meanDiesel,
      'Media Gasolina 95': meanGasolina
    };
  });

  // Print the final combined table
  console.log("\nMean Prices per Province:");
  console.table(results);
}

async function calculateTops() {
  const extractedData = await extractData();

  // Helper function to clean data and grab only stations that sell the requested fuel
  const getCleanFuelData = (fuelKey: 'diesel_A' | 'gasolina_95') => {
    return extractedData
      .map(station => ({
        Rótulo: station.estacion,
        Provincia: station.provincia,
        Municipio: station.municipio,
        // Swap comma for dot and turn into a number
        Precio: parseFloat(station[fuelKey].replace(',', '.')) 
      }))
      .filter(station => !isNaN(station.Precio)); 
  };

  // Prepare the clean lists for both fuels
  const dieselData = getCleanFuelData('diesel_A');
  const gasolinaData = getCleanFuelData('gasolina_95');

  // Helper functions for sorting
  // Ascending (Smallest to Largest) -> Cheapest
  const sortCheapest = (a: { Precio: number }, b: { Precio: number }) => a.Precio - b.Precio;
  // Descending (Largest to Smallest) -> Most Expensive
  const sortExpensive = (a: { Precio: number }, b: { Precio: number }) => b.Precio - a.Precio;

  // Calculate the Top 5s using sort() and slice(0, 5)
  const cheapDiesel = [...dieselData].sort(sortCheapest).slice(0, 5);
  const expDiesel = [...dieselData].sort(sortExpensive).slice(0, 5);

  const cheapGasolina = [...gasolinaData].sort(sortCheapest).slice(0, 5);
  const expGasolina = [...gasolinaData].sort(sortExpensive).slice(0, 5);

  // Print the results
  console.log("\n--- TOP 5 MÁS BARATAS: DIESEL A ---");
  console.table(cheapDiesel);

  console.log("\n--- TOP 5 MÁS CARAS: DIESEL A ---");
  console.table(expDiesel);

  console.log("\n--- TOP 5 MÁS BARATAS: GASOLINA 95 E5 ---");
  console.table(cheapGasolina);

  console.log("\n--- TOP 5 MÁS CARAS: GASOLINA 95 E5 ---");
  console.table(expGasolina);
}

calculateTops();
calculateBothMeans();