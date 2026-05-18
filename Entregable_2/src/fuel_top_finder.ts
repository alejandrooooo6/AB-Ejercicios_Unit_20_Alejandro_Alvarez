import { CleanStation } from '../../Entregable_1/src/interfaces.js';

export class FuelTopFinder {
  findTops(extractedData: CleanStation[]) {
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

    return {
      dieselBarato,
      dieselCaro,
      gasolinaBarata,
      gasolinaCara
    };
  }
}