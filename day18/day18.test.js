const { day18A, day18B } = require('./day18');

describe('Day 18 A', () => {
    test('should solve the example', () => {
        const result = day18A('day18/exampleData');
        expect(result).toBe(64);
    });

    test('should solve the puzzle', () => {
        const result = day18A('day18/inputData');
        expect(result).toBe(3496);
    });
});

describe('Day 18 B', () => {
    test('should solve the example', () => {
        const result = day18B('day18/exampleData');
        expect(result).toBe(58);
    });

    xtest('should solve the puzzle', () => {
        const result = day18B('day18/inputData');
        expect(result).toBeGreaterThan(1012);
        expect(result).not.toBe(1998);
        expect(result).not.toBe(2034);
        expect(result).toBeLessThan(3292);
    });
});
