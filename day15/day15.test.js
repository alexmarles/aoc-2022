const { day15A, day15B } = require('./day15');

describe('Day 15 A', () => {
    test('should solve the example', () => {
        const result = day15A('day15/exampleData');
        expect(result).toBe(26);
    });

    test('should solve the puzzle', () => {
        const result = day15A('day15/inputData', 2000000);
        expect(result).toBe(5181556);
    });
});

describe('Day 15 B', () => {
    test('should solve the example', () => {
        const result = day15B('day15/exampleData');
        expect(result).toBe(56000011);
    });

    test('should solve the puzzle', () => {
        const result = day15B('day15/inputData', 4000000);
        expect(result).toBe(12817603219131);
    });
});
