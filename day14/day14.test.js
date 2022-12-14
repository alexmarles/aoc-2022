const { day14A, day14B } = require('./day14');

describe('Day 14 A', () => {
    test('should solve the example', () => {
        const result = day14A('day14/exampleData');
        expect(result).toBe(24);
    });

    test('should solve the puzzle', () => {
        const result = day14A('day14/inputData');
        expect(result).toBe(799);
    });
});

describe('Day 14 B', () => {
    test('should solve the example', () => {
        const result = day14B('day14/exampleData');
        expect(result).toBe(93);
    });

    test('should solve the puzzle', () => {
        const result = day14B('day14/inputData');
        expect(result).toBe(29076);
    });
});
