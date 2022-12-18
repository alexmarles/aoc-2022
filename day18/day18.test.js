const { day18A } = require('./day18');

describe('Dau 18 A', () => {
    test('should solve the example', () => {
        const result = day18A('day18/exampleData');
        expect(result).toBe(64);
    });

    test('should solve the puzzle', () => {
        const result = day18A('day18/inputData');
        expect(result).toBe(3496);
    });
});
