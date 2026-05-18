import { CleanStation } from './interfaces.js';
import { DataExtractor } from './data_extractor.js';

// Config variables with all the data needed to be processed and used

const jsonFile = './Entregable_1/data/all_spain_fuel.json';
const TARGET_PROVINCES = ["28", "15", "06", "38"];

export async function extractData(filePath: string = jsonFile, Provinces: string[] = TARGET_PROVINCES): Promise<CleanStation[]> {
  const extractor = new DataExtractor(Provinces);
  return await extractor.executeExtraction(filePath);
}


// Checking if the program works

extractData().then(datos => {
    console.log("Data correctly read and processed");
    console.log(`Extracted stations: ${datos.length}\n`);
});