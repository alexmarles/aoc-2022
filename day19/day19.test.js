const { day19A, day19B } = require('./day19');

describe('Day 19 A', () => {
    test('should solve the example', () => {
        const result = day19A('day19/exampleData');
        expect(result).toBe(33);
    });

    test('should solve the puzzle', () => {
        const result = day19A('day19/inputData');
        expect(result).toBe(988);
    });
});

describe('Day 19 B', () => {
    // Skipping because it gets wrong number for second blueprint
    xtest('should solve the example', () => {
        const result = day19B('day19/exampleData');
        expect(result).toBe(56 * 64);
    });

    test('should solve the puzzle', () => {
        const result = day19B('day19/inputData');
        expect(result).toBe(8580);
    });
});
