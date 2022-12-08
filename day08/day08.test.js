const { day08A } = require('./day08');

describe('Day 08 A', () => {
    test('should solve the example', () => {
        const result = day08A('day08/exampleData');

        expect(result).toBe(21);
    });

    test('should solve the puzzle', () => {
        const result = day08A('day08/inputData');

        expect(result).toBe(1543);
    });
});
