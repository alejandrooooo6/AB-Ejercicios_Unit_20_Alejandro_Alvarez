import { jest, describe, test, expect } from '@jest/globals';
import { DataExtractor } from "./data_extractor.js";
import { JsonFileReader } from "./json_file_reader.js";

describe('DataExtractor Class Logic', () => {

    describe('executeExtraction Method', () => {
        
        test('should orchestrate reading, filtering, and mapping correctly', async () => {

            // Arrange
            const validProvinces = ["28"];
            const extractor = new DataExtractor(validProvinces);
            
            const mockJsonContent = {
                ListaEESSPrecio: [
                    {
                        "Rótulo": "BP MADRID",
                        "IDProvincia": "28",
                        "Provincia": "Madrid",
                        "Municipio": "Móstoles",
                        "Dirección": "Calle Mayor",
                        "Precio Gasoleo A": "1,42",
                        "Precio Gasolina 95 E5": "1,55"
                    },
                    {
                        "Rótulo": "REPSOL BARCELONA",
                        "IDProvincia": "08",
                        "Provincia": "Barcelona",
                        "Municipio": "Sabadell",
                        "Dirección": "Av. Diagonal",
                        "Precio Gasoleo A": "1,48",
                        "Precio Gasolina 95 E5": "1,60"
                    }
                ]
            };

            // Mock the file reader method to return our predefined sample data
            jest.spyOn(JsonFileReader.prototype, 'read').mockResolvedValue(mockJsonContent);

            // Act

            const result = await extractor.executeExtraction("./dummy_path.json");
            
            // Assert

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(1);
            expect(result[0].estacion).toBe("BP MADRID");
            expect(result[0].provincia).toBe("Madrid");
        });

        test('should return an empty array and catch the error if file reading fails', async () => {

            // Arrange

            const extractor = new DataExtractor(["28"]);

            // Mock the file reader method to simulate a system crash or missing file error
            jest.spyOn(JsonFileReader.prototype, 'read').mockRejectedValue(new Error("File not found"));
            
            // Act

            const result = await extractor.executeExtraction("./wrong_path.json");
            
            // Assert

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(0);
        });

    });

});