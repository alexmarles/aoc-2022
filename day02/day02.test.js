const { day02A, day02B } = require('./day02');

describe('Day 01 A', () => {
    test('should solve the example', () => {
        const result = day02A('day02/exampleData');

        expect(result).toBe(15);
    });

    test('should solve the puzzle', () => {
        const result = day02A('day02/inputData');

        expect(result).toBe(9759);
    });
});
