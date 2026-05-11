// Array of strings with the id of the target provinces
const TARGET_PROVINCES = ["28", "15", "06", "38"];

// Define the structure for the data object that will sotre the details for each gas station
interface GasStation {
  "Rótulo": string;
  "IDProvincia": string;
  "Provincia": string;
  "Municipio": string;
  "Dirección": string;
  "Precio Gasoleo A": string;
  "Precio Gasolina 95 E5": string;
}

export interface CleanStation {
  estacion: string;
  provincia: string;
  municipio: string;
  direccion: string;
  diesel_A: string;
  gasolina_95: string;
}

// Async function to read the JSON file from the disk
export async function extractData(): Promise<CleanStation[]> { 
  try {
    console.log("Reading the big file...");
    const rawData = await fs.readFile('./Entregable_1/src/data/all_spain_fuel.json', 'utf8');
    const parsed = JSON.parse(rawData);
    
    const allStations: GasStation[] = parsed.ListaEESSPrecio;

    console.log("Filtering and extracting...");
    
    // Filter by the provinces we want by cheking all gas stations province id to sleect only the provinces we want
    const extractedData = allStations
      .filter(station => TARGET_PROVINCES.includes(station.IDProvincia))
      .map(station => ({
        // Extracting the dara needed for each gas station object
        estacion: station["Rótulo"],
        provincia: station["Provincia"],
        municipio: station["Municipio"],
        direccion: station["Dirección"],
        diesel_A: station["Precio Gasoleo A"],
        gasolina_95: station["Precio Gasolina 95 E5"]
      }));

    console.log("Data correctly read and processed");
    console.log(`Original stations: ${allStations.length}`);
    console.log(`Extracted stations: ${extractedData.length}`);
    console.log();

    return extractedData;

    // catching any possible errors
  } catch (error) {
    console.error("Error processing data:", error);
    return [];
  }
}