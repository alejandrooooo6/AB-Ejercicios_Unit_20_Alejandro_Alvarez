import { GasStation } from './interfaces.js';

export class StationFilter {
  constructor(private allowedProvinces: string[]) {}

  filter(stations: GasStation[]): GasStation[] {
    return stations.filter(station => this.allowedProvinces.includes(station.IDProvincia));
  }
}