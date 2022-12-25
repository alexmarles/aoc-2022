const { day24A } = require('./day24');

describe('Day 24 A', () => {
    test('should solve the example', () => {
        const result = day24A('day24/exampleData');
        expect(result).toBe(18);
    });

    test('should solve the puzzle', () => {
        const result = day24A('day24/inputData');
        expect(result).toBe(264);
    });
});
