const { day20A, day20B } = require('./day20');

describe('Day 20 A', () => {
    test('should solve the example', () => {
        const result = day20A('day20/exampleData');
        expect(result).toBe(3);
    });

    test('should solve the puzzle', () => {
        const result = day20A('day20/inputData');
        expect(result).toBe(3700);
    });
});

describe('Day 20 B', () => {
    test('should solve the example', () => {
        const result = day20B('day20/exampleData');
        expect(result).toBe(1623178306);
    });

    test('should solve the puzzle', () => {
        const result = day20B('day20/inputData');
        expect(result).toBe(10626948369382);
    });
});
