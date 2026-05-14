import { FuelPrice } from "./fuel_price.js";

describe('FuelPrice Class Logic', () => {

    describe('Constructor Initialization', () => {
        
        test('should correctly assign all properties when instantiated', () => {

            // Arrange
            let date = "15-04-2026"
            let province = "Madrid"
            let diesel = 1.99
            let gasoline = 3.23

            // Act

            const result = new FuelPrice(date, province, diesel, gasoline);
            
            // Assert

            expect(result).toBeInstanceOf(FuelPrice);
            expect(result.date).toBe(date);
            expect(result.province).toBe(province);
            expect(result.diesel).toBe(diesel);
            expect(result.gasoline).toBe(gasoline);
        });

        test('should preserve the data types for numeric prices', () => {

            // Arrange

            let diesel = 1.99
            let gasoline = 3.23
            
            // Act

            const result = new FuelPrice("15-05-2026", "Madrid", diesel, gasoline);
            
            // Assert

            expect(typeof result.diesel).toBe('number');
            expect(typeof result.gasoline).toBe('number');
        });

        test('should handle empty or zero values correctly', () => {

            // Arrange

            let noDate = ""
            let noPrice = 0
            
            // Act

            const result = new FuelPrice(noDate, "Madrid", 2.33, noPrice);
            
            // Assert

                expect(result.date).toBe(noDate);
                expect(result.gasoline).toBe(noPrice);
                expect(result.province).toBe("Madrid");
                expect(result.diesel).toBe(2.33)


        });

    });

});