const { day21A } = require('./day21');

describe('Day 20 A', () => {
    test('should solve the example', () => {
        const result = day21A('day21/exampleData');
        expect(result).toBe(152);
    });

    test('should solve the puzzle', () => {
        const result = day21A('day21/inputData');
        expect(result).toBe(84244467642604);
    });
});
