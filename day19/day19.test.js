const { day19A } = require('./day19');

describe('Day 19 A', () => {
    test('should solve the example', () => {
        const result = day19A('day19/exampleData');
        expect(result).toBe(33);
    });

    test('should solve the puzzle', () => {
        const result = day19A('day19/inputData');
        expect(result).toBe(988);
    });
});
