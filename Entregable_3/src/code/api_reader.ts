import { FuelPrice } from './fuel_price.js';

export class ApiReader {
  async downloadData(date: string, province: string) {
    const url = "https://energia.serviciosmin.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/FiltroProvincia/" + date + "/" + province;
    
    try {
      const response = await fetch(url);
      const json = await response.json();
      
      let stations = [];
      if (json.ListaEESSPrecio) {
         stations = json.ListaEESSPrecio;
      }

      const cleanList = [];

      for (const station of stations) {
        const textDiesel = station["Precio Gasoleo A"];
        const textGasoline = station["Precio Gasolina 95 E5"];

        let priceDiesel = 0;
        let priceGasoline = 0;

        if (textDiesel) {
          priceDiesel = parseFloat(textDiesel.replace(',', '.'));
        }
        if (textGasoline) {
          priceGasoline = parseFloat(textGasoline.replace(',', '.'));
        }

        const newPrice = new FuelPrice(date, province, priceDiesel, priceGasoline);
        cleanList.push(newPrice);
      }

      return cleanList;

    } catch (error) {
      return []; 
    }
  }
}