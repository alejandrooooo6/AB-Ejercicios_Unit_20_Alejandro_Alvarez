import fs from 'node:fs/promises';
import { FuelPrice } from './fuel_price.js';

export function calculateAverages(data: FuelPrice[], fuelType: string) {
  let sums = [0, 0, 0, 0, 0, 0, 0];
  let counts = [0, 0, 0, 0, 0, 0, 0];

  for (let item of data) {
    let price = 0;
    
    if (fuelType === "diesel") {
      price = item.diesel;
    } else {
      price = item.gasoline;
    }
    
    if (isNaN(price) == false && price > 0) {
      let parts = item.date.split('-');
      let realDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      let dayOfWeek = realDate.getDay(); 

      sums[dayOfWeek] = sums[dayOfWeek] + price;
      counts[dayOfWeek] = counts[dayOfWeek] + 1;
    }
  }

  let mondayToSundayAverages = [];
  let daysOrder = [1, 2, 3, 4, 5, 6, 0]; 

  for (let day of daysOrder) {
    if (counts[day] > 0) {
      let average = sums[day] / counts[day];
      mondayToSundayAverages.push(parseFloat(average.toFixed(3)));
    } else {
      mondayToSundayAverages.push(0);
    }
  }
  
  return mondayToSundayAverages;
}

export async function saveChart(fileName: string, title: string, averageData: number[], barColor: string) {
  let config = {
    type: 'bar',
    data: {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [{
        label: title,
        data: averageData,
        backgroundColor: barColor
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title
        }
      }
    }
  };

  let configText = JSON.stringify(config);
  let url = "https://quickchart.io/chart?c=" + encodeURIComponent(configText);
  
  try {
    let response = await fetch(url);
    let imageBuffer = await response.arrayBuffer();
    let buffer = Buffer.from(imageBuffer);
    await fs.writeFile(fileName, buffer);
  } catch (error) {
    console.log("Error creating chart for " + title);
  }
}