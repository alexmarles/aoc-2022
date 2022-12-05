const { day05A, day05B } = require('./day05');

describe('Day 05 A', () => {
    test('should solve the example', () => {
        const result = day05A('day05/exampleData');

        expect(result).toBe('CMZ');
    });

    test('should solve the puzzle', () => {
        const result = day05A('day05/inputData');

        expect(result).toBe('JCMHLVGMG');
    });
});

describe('Day 05 B', () => {
    test('should solve the example', () => {
        const result = day05B('day05/exampleData');

        expect(result).toBe('MCD');
    });

    test('should solve the puzzle', () => {
        const result = day05B('day05/inputData');

        expect(result).toBe('LVMRWSSPZ');
    });
});
