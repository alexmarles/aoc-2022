const { day07A, day07B } = require('./day07');

describe('Day 07 A', () => {
    test('should solve the example', () => {
        expect(day07A('day07/exampleData')).toBe(95437);
    });

    test('should solve the puzzle', () => {
        const result = day07A('day07/inputData');

        expect(result).toBe(1491614);
    });
});

describe('Day 07 B', () => {
    test('should solve the example', () => {
        expect(day07B('day07/exampleData')).toBe(24933642);
    });

    test('should solve the puzzle', () => {
        const result = day07B('day07/inputData');

        expect(result).toBe(6400111);
    });
});
