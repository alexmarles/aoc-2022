const { day13A } = require('./day13');

describe('Day 13 A', () => {
    test('should solve the example', () => {
        const result = day13A('day13/exampleData');

        expect(result).toBe(13);
    });

    test('should solve the puzzle', () => {
        const result = day13A('day13/inputData');

        expect(result).toBe(6235);
    });
});
