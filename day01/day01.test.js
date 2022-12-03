const { day01A, day01B } = require('./day01');

describe('Day 01 A', () => {
    test('should solve the example', () => {
        const result = day01A('day01/exampleData');

        expect(result).toBe(24000);
    });

    test('should solve the puzzle', () => {
        const result = day01A('day01/inputData');

        expect(result).toBe(69528);
    });
});

describe('Day 01 B', () => {
    test('should solve the example', () => {
        const result = day01B('day01/exampleData');

        expect(result).toBe(45000);
    });

    test('should solve the puzzle', () => {
        const result = day01B('day01/inputData');

        expect(result).toBe(206152);
    });
});
