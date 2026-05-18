import { CleanStation } from '../../Entregable_1/src/interfaces.js';

export class FuelStatsProcessor {
  calculateMeans(extractedData: CleanStation[]) {
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

    return resultados;
  }
}