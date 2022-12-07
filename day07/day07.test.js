const { day07A } = require('./day07');

describe('Day 07 A', () => {
    test('should solve the example', () => {
        expect(day07A('day07/exampleData')).toBe(95437);
    });

    test('should solve the puzzle', () => {
        const result = day07A('day07/inputData');

        expect(result).toBe(1491614);
    });
});
