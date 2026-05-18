import { GasStation, CleanStation } from './interfaces.js';

export class StationMapper {
  mapSingle(station: GasStation): CleanStation {
    return {
      estacion: station["Rótulo"],
      provincia: station["Provincia"],
      municipio: station["Municipio"],
      direccion: station["Dirección"],
      diesel_A: station["Precio Gasoleo A"],
      gasolina_95: station["Precio Gasolina 95 E5"]
    };
  }

  mapMultiple(stations: GasStation[]): CleanStation[] {
    return stations.map(station => this.mapSingle(station));
  }
}