const { day12A, day12B } = require('./day12');

describe('Day 12 A', () => {
    test('should solve the example', () => {
        const result = day12A('day12/exampleData');

        expect(result).toBe(31);
    });

    test('should solve the puzzle', () => {
        const result = day12A('day12/inputData');

        expect(result).toBe(339);
    });
});

describe('Day 12 B', () => {
    test('should solve the example', () => {
        const result = day12B('day12/exampleData');

        expect(result).toBe(29);
    });

    test('should solve the puzzle', () => {
        const result = day12B('day12/inputData');

        expect(result).toBe(332);
    });
});
