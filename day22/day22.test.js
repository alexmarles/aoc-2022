const { day22A } = require('./day22');

describe('Day 22 A', () => {
    test('should solve the example', () => {
        const result = day22A('day22/exampleData');
        expect(result).toBe(6032);
    });

    test('should solve the puzzle', () => {
        const result = day22A('day22/inputData');
        expect(result).toBe(123046);
    });
});
