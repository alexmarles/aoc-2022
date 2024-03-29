const { day17A, day17B } = require('./day17');

describe('Day 17 A', () => {
    test('should solve the example', () => {
        const result = day17A('day17/exampleData');
        expect(result).toBe(3068);
    });

    test('should solve the puzzle', () => {
        const result = day17A('day17/inputData');
        expect(result).toBe(3071);
    });
});

describe('Day 17 B', () => {
    test('should solve the example', () => {
        const result = day17B('day17/exampleData');
        expect(result).toBe(1514285714288);
    });

    test('should solve the puzzle', () => {
        const result = day17B('day17/inputData');
        expect(result).toBe(1523615160362);
    });
});
