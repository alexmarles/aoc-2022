const { day10A } = require('./day10');

describe('Day 10 A', () => {
    test('should solve the example', () => {
        const result = day10A('day10/exampleData');

        expect(result).toBe(13140);
    });

    test('should solve the puzzle', () => {
        const result = day10A('day10/inputData');

        expect(result).toBe(13220);
    });
});
