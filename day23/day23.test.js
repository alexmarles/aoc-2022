const { day23A, day23B } = require('./day23');

describe('Day 23 A', () => {
    test('should solve the example', () => {
        const result = day23A('day23/exampleData');
        expect(result).toBe(110);
    });

    test('should solve the puzzle', () => {
        const result = day23A('day23/inputData');
        expect(result).toBe(4045);
    });
});

describe('Day 23 B', () => {
    test('should solve the example', () => {
        const result = day23B('day23/exampleData');
        expect(result).toBe(20);
    });

    test('should solve the puzzle', () => {
        const result = day23B('day23/inputData');
        expect(result).toBe(963);
    });
});
