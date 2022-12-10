const { day10A, day10B } = require('./day10');

describe('Day 10 A', () => {
    test('should solve the example', () => {
        const result = day10A('day10/exampleData');

        expect(result).toBe(13140);
    });

    test('should solve the puzzle', () => {
        const result = day10A('day10/inputData');

        expect(result).toBe(13220);
    });
});

describe('Day 10 B', () => {
    test('should solve the example', () => {
        const result = day10B('day10/exampleData');

        expect(result).toBe(`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`);
    });

    test('should solve the puzzle', () => {
        const result = day10B('day10/inputData');

        expect(result).toBe(`###..#..#..##..#..#.#..#.###..####.#..#.
#..#.#..#.#..#.#.#..#..#.#..#.#....#.#..
#..#.#..#.#..#.##...####.###..###..##...
###..#..#.####.#.#..#..#.#..#.#....#.#..
#.#..#..#.#..#.#.#..#..#.#..#.#....#.#..
#..#..##..#..#.#..#.#..#.###..####.#..#.`);
    });
});
