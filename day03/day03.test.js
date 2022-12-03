const { day03A, day03B } = require('./day03');

describe('Day 03 A', () => {
    test('should solve the example', () => {
        const result = day03A('day03/exampleData');

        expect(result).toBe(157);
    });

    test('should solve the puzzle', () => {
        const result = day03A('day03/inputData');

        expect(result).toBe(7766);
    });
});
