const { day25A } = require('./day25');

describe('Day 25 A', () => {
    test('should solve the example', () => {
        const result = day25A('day25/exampleData');
        expect(result).toBe('2=-1=0');
    });

    test('should solve the puzzle', () => {
        const result = day25A('day25/inputData');
        expect(result).toBe('20-==01-2-=1-2---1-0');
    });
});
