import fs from 'node:fs/promises';
import { FuelPrice } from './fuel_price.js';

export function calculateAverages(data: FuelPrice[], fuelType: string) {
  const sums = [0, 0, 0, 0, 0, 0, 0];
  const counts = [0, 0, 0, 0, 0, 0, 0];

  for (const item of data) {
    let price = 0;
    
    if (fuelType === "diesel") {
      price = item.diesel;
    } else {
      price = item.gasoline;
    }
    
    if (isNaN(price) == false && price > 0) {
      const parts = item.date.split('-');
      const realDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      const dayOfWeek = realDate.getDay(); 

      sums[dayOfWeek] = sums[dayOfWeek] + price;
      counts[dayOfWeek] = counts[dayOfWeek] + 1;
    }
  }

  const mondayToSundayAverages = [];
  const daysOrder = [1, 2, 3, 4, 5, 6, 0]; 

  for (const day of daysOrder) {
    if (counts[day] > 0) {
      const average = sums[day] / counts[day];
      mondayToSundayAverages.push(parseFloat(average.toFixed(3)));
    } else {
      mondayToSundayAverages.push(0);
    }
  }
  
  return mondayToSundayAverages;
}

export async function saveChart(fileName: string, title: string, averageData: number[], barColor: string) {
  const config = {
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

  const configText = JSON.stringify(config);
  const url = "https://quickchart.io/chart?c=" + encodeURIComponent(configText);
  
  try {
    const response = await fetch(url);
    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    await fs.writeFile(fileName, buffer);
  } catch (error) {
    console.log("Error creating chart for " + title);
  }
}