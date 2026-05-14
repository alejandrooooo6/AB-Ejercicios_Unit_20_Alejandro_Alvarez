import { FuelPrice } from './fuel_price.js';

export class ApiReader {
  async downloadData(date: string, province: string) {
    let url = "https://energia.serviciosmin.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/FiltroProvincia/" + date + "/" + province;
    
    try {
      let response = await fetch(url);
      let json = await response.json();
      
      let stations = [];
      if (json.ListaEESSPrecio) {
         stations = json.ListaEESSPrecio;
      }

      let cleanList = [];

      for (let station of stations) {
        let textDiesel = station["Precio Gasoleo A"];
        let textGasoline = station["Precio Gasolina 95 E5"];

        let priceDiesel = 0;
        let priceGasoline = 0;

        if (textDiesel) {
          priceDiesel = parseFloat(textDiesel.replace(',', '.'));
        }
        if (textGasoline) {
          priceGasoline = parseFloat(textGasoline.replace(',', '.'));
        }

        let newPrice = new FuelPrice(date, province, priceDiesel, priceGasoline);
        cleanList.push(newPrice);
      }

      return cleanList;

    } catch (error) {
      return []; 
    }
  }
}