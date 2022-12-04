const { day04A, day04B } = require('./day04');

describe('Day 04 A', () => {
    test('should solve the example', () => {
        const result = day04A('day04/exampleData');

        expect(result).toBe(2);
    });

    test('should solve the puzzle', () => {
        const result = day04A('day04/inputData');

        expect(result).toBe(490);
    });
});

describe('Day 04 B', () => {
    test('should solve the example', () => {
        const result = day04B('day04/exampleData');

        expect(result).toBe(4);
    });

    test('should solve the puzzle', () => {
        const result = day04B('day04/inputData');

        expect(result).toBe(921);
    });
});
