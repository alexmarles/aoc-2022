const { day09A } = require('./day09');

describe('Day 09 A', () => {
    test('should solve the example', () => {
        const result = day09A('day09/exampleData');

        expect(result).toBe(13);
    });

    test('should solve the puzzle', () => {
        const result = day09A('day09/inputData');

        expect(result).toBe(5930);
    });
});
