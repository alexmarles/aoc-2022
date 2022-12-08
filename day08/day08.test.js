const { day08A, day08B } = require('./day08');

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

describe('Day 08 B', () => {
    test('should solve the example', () => {
        const result = day08B('day08/exampleData');

        expect(result).toBe(8);
    });

    test('should solve the puzzle', () => {
        const result = day08B('day08/inputData');

        expect(result).toBe(595080);
    });
});
