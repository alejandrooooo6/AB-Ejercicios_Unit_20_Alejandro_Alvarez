import { StationMapper } from "./station_mapper.js";
import { GasStation } from "./interfaces.js";

describe('StationMapper Class Logic', () => {

    describe('mapSingle Method', () => {
        
        test('should correctly map all fields from GasStation to CleanStation', () => {

            // Arrange
            const mapper = new StationMapper();
            
            const rawStation: GasStation = {
                "Rótulo": "CEPSA",
                "IDProvincia": "28",
                "Provincia": "Madrid",
                "Municipio": "Alcorcon",
                "Dirección": "Av. America",
                "Precio Gasoleo A": "1,459",
                "Precio Gasolina 95 E5": "1,529"
            };

            // Act

            const result = mapper.mapSingle(rawStation);
            
            // Assert

            expect(result.estacion).toBe("CEPSA");
            expect(result.provincia).toBe("Madrid");
            expect(result.municipio).toBe("Alcorcon");
            expect(result.direccion).toBe("Av. America");
            expect(result.diesel_A).toBe("1,459");
            expect(result.gasolina_95).toBe("1,529");
        });

    });

    describe('mapMultiple Method', () => {

        test('should correctly map an array of GasStation objects', () => {

            // Arrange
            const mapper = new StationMapper();

            const rawStationsList: GasStation[] = [
                {
                    "Rótulo": "REPSOL",
                    "IDProvincia": "15",
                    "Provincia": "Coruna",
                    "Municipio": "Oleiros",
                    "Dirección": "Rúa Principal",
                    "Precio Gasoleo A": "1,440",
                    "Precio Gasolina 95 E5": "1,510"
                }
            ];

            // Act

            const result = mapper.mapMultiple(rawStationsList);

            // Assert

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(1);
            expect(result[0].estacion).toBe("REPSOL");
            expect(result[0].provincia).toBe("Coruna");
        });

    });

});