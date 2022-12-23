const { day23A } = require('./day23');

describe('Day 23 A', () => {
    test('should solve the example', () => {
        const result = day23A('day23/exampleData');
        expect(result).toBe(110);
    });

    test('should solve the puzzle', () => {
        const result = day23A('day23/inputData');
        expect(result).toBe(4045);
    });
});
