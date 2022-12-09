const { day09A, day09B } = require('./day09');

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

describe('Day 09 B', () => {
    test('should solve the example', () => {
        expect(day09B('day09/exampleData')).toBe(1);
        expect(day09B('day09/exampleData2')).toBe(36);
    });

    test('should solve the puzzle', () => {
        const result = day09B('day09/inputData');

        expect(result).toBe(2443);
    });
});
