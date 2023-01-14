const { day17A } = require('./day17');

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
    xtest('should solve the example', () => {
        const result = day17A('day17/exampleData', 1000000000000);
        expect(result).toBe(1514285714288);
    });

    xtest('should solve the puzzle', () => {
        const result = day17A('day17/inputData', 1000000000000);
        expect(result).toBeGreaterThan(1523615158156);
        expect(result).not.toBe(1523615158178);
        expect(result).not.toBe(1523615158613);
        expect(result).not.toBe(1523615159288);
        expect(result).not.toBe(1523615159591);
        expect(result).not.toBe(1523615159767);
        expect(result).not.toBe(1523615159769);
        expect(result).not.toBe(1523615160769);
        expect(result).toBeLessThan(1523615163814);
    });
});
