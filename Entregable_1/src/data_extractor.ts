import { GasStation, CleanStation } from './interfaces.js';
import { JsonFileReader } from './json_file_reader.js';
import { StationFilter } from './station_filter.js';
import { StationMapper } from './station_mapper.js';

export class DataExtractor {
  private fileReader: JsonFileReader;
  private stationFilter: StationFilter;
  private stationMapper: StationMapper;

  constructor(validProvinces: string[]) {
    this.fileReader = new JsonFileReader();
    this.stationFilter = new StationFilter(validProvinces);
    this.stationMapper = new StationMapper();
  }

  async executeExtraction(filePath: string): Promise<CleanStation[]> {
    try {
      console.log("Reading the big file...");

      // Stopped using a magic string and started using a config variale and paramenters

      const parsed = await this.fileReader.read(filePath);
      const allStations: GasStation[] = parsed.ListaEESSPrecio || [];

      console.log("Filtering and extracting...");
      const filteredStations = this.stationFilter.filter(allStations);
      const extractedData = this.stationMapper.mapMultiple(filteredStations);

      return extractedData;

    } catch (error) {
      console.error("Error processing data:", error);
      return [];
    }
  }
}