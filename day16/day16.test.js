const { day16A, day16B } = require('./day16');

describe('Day 16 A', () => {
    test('should solve the example', () => {
        const result = day16A('day16/exampleData');
        expect(result).toBe(1651);
    });

    test('should solve the puzzle', () => {
        const result = day16A('day16/inputData');
        expect(result).toBe(1862);
    });
});

describe('Day 16 B', () => {
    test('should solve the example', () => {
        const result = day16B('day16/exampleData');
        expect(result).toBe(1707);
    });

    test('should solve the puzzle', () => {
        const result = day16B('day16/inputData');
        expect(result).toBe(2422);
    });
});
