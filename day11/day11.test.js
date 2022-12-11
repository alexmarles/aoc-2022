const { day11A, day11B } = require('./day11');

describe('Day 11 A', () => {
    test('should solve the example', () => {
        const result = day11A('day11/exampleData');

        expect(result).toBe(10605);
    });

    test('should solve the puzzle', () => {
        const result = day11A('day11/inputData');

        expect(result).toBe(58322);
    });
});
