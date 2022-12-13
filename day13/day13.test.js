const { day13A, day13B } = require('./day13');

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

describe('Day 13 B', () => {
    test('should solve the example', () => {
        const result = day13B('day13/exampleData');

        expect(result).toBe(140);
    });

    test('should solve the puzzle', () => {
        const result = day13B('day13/inputData');

        expect(result).toBe(22866);
    });
});
