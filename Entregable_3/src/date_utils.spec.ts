import { getPast30Days } from "./date_utils.js"; 

describe('date_utils', () => {
    describe('getPast30Days', () => {
        test('it returns an array of 30 date strings', () => {

            // Act
            const result = getPast30Days();

            // Assert
         
            
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(30);

            const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
            expect(result[0]).toMatch(dateRegex);
        });

        test('the first element is today date', () => {

            // Act

            const result = getPast30Days();
            
           // Arrange 

            const d = new Date();
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            const today = `${day}-${month}-${year}`;

            // Assert

            expect(result[0]).toBe(today);
        });
    });
});