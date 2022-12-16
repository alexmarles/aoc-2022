const { day15A } = require('./day15');

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
