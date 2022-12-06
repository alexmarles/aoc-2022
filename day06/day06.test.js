const { day06A } = require('./day06');

describe('Day 06 A', () => {
    test('should solve the example', () => {
        expect(day06A('day06/exampleData1')).toBe(7);
        expect(day06A('day06/exampleData2')).toBe(5);
        expect(day06A('day06/exampleData3')).toBe(6);
        expect(day06A('day06/exampleData4')).toBe(10);
        expect(day06A('day06/exampleData5')).toBe(11);
    });

    test('should solve the puzzle', () => {
        const result = day06A('day06/inputData');

        expect(result).toBe(1804);
    });
});
