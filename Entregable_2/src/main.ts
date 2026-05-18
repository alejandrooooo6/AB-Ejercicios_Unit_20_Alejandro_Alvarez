import { extractData } from '../../Entregable_1/src/json_data_extractor.js';
import { FuelStatsProcessor } from './fuel_stats_processor.js';
import { FuelTopFinder } from './fuel_top_finder.js';

async function runAnalysis() {
  const extractedData = await extractData();

  // Instantiate our fresh single-responsibility classes
  const statsProcessor = new FuelStatsProcessor();
  const topFinder = new FuelTopFinder();

  // 1. Process and print mean averages
  const meanResults = statsProcessor.calculateMeans(extractedData);
  console.log("\nMean Prices per Province:");
  console.table(meanResults);

  // 2. Process and print top rankings
  const tops = topFinder.findTops(extractedData);

  // rint the tables
  console.log("\n--- TOP 5 MÁS BARATAS: DIESEL A ---");
  console.table(tops.dieselBarato);

  console.log("\n--- TOP 5 MÁS CARAS: DIESEL A ---");
  console.table(tops.dieselCaro);

  console.log("\n--- TOP 5 MÁS BARATAS: GASOLINA 95 E5 ---");
  console.table(tops.gasolinaBarata);

  console.log("\n--- TOP 5 MÁS CARAS: GASOLINA 95 E5 ---");
  console.table(tops.gasolinaCara);
}

// Execute the analysis functions
runAnalysis();