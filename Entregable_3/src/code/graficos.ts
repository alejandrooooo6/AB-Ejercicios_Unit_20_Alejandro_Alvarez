import { ApiReader } from './api_reader.js';
import { getPast30Days } from './date_utils.js';
import { calculateAverages, saveChart } from './chart_utils.js';
import { FuelPrice } from './fuel_price.js';

async function main() {
  let reader = new ApiReader();
  let pastDates = getPast30Days();
  
  let provinces = [
    { id: "28", name: "Madrid" },
    { id: "15", name: "Coruna" },
    { id: "06", name: "Badajoz" },
    { id: "38", name: "Tenerife" }
  ];

  console.log("Starting the program...\n");

  for (let province of provinces) {
    console.log("--> Downloading data for " + province.name + "...");
    let provinceData: FuelPrice[] = [];

    for (let date of pastDates) {
      let dailyData = await reader.downloadData(date, province.id);
      
      for (let item of dailyData) {
        provinceData.push(item);
      }
      
      await new Promise(r => setTimeout(r, 200)); 
    }

    console.log("Calculating averages and drawing charts for " + province.name + "...\n");
    
    let dieselAverages = calculateAverages(provinceData, "diesel");
    let gasolineAverages = calculateAverages(provinceData, "gasoline");

    await saveChart(
      "grafica_diesel_" + province.name + ".png", 
      "Diesel A - " + province.name, 
      dieselAverages, 
      "rgba(54, 162, 235, 0.7)"
    );
    
    await saveChart(
      "grafica_gasolina_" + province.name + ".png", 
      "Gasolina 95 - " + province.name, 
      gasolineAverages, 
      "rgba(75, 192, 192, 0.7)"
    );
  }

  console.log("All done! You have 8 new images in your folder.");
}

main();