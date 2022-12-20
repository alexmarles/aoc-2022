const { day19A, day19B } = require('./day19');

xdescribe('Day 19 A', () => {
    test('should solve the example', () => {
        const result = day19A('day19/exampleData');
        expect(result).toBe(33);
    });

    test('should solve the puzzle', () => {
        const result = day19A('day19/inputData');
        expect(result).toBe(988);
    });
});

xdescribe('Day 19 B', () => {
    test('should solve the example', () => {
        const result = day19B('day19/exampleData');
        expect(result).toBe(56 * 64);
    });

    xtest('should solve the puzzle', () => {
        const result = day19B('day19/inputData');
        expect(result).toBe(988);
    });
});
