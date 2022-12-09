// --- Day 9: Rope Bridge ---

const { getInputData } = require('../utils');

const UP = 'U';
const DOWN = 'D';
const RIGHT = 'R';
const LEFT = 'L';

function day09A(file) {
    const data = getInputData(file);
    const head = {
        x: 0,
        y: 0,
    };
    const tail = {
        x: 0,
        y: 0,
    };
    const visitedPositions = new Set();
    visitedPositions.add('0_0');

    function areAdjacent(head, tail) {
        if (Math.abs(head.y - tail.y) > 1) return false;
        if (Math.abs(head.x - tail.x) > 1) return false;
        return true;
    }

    data.forEach(move => {
        const [direction, steps] = move.split(' ');
        for (let i = 0; i < steps; i++) {
            if (direction === UP) head.y++;
            if (direction === DOWN) head.y--;
            if (direction === RIGHT) head.x++;
            if (direction === LEFT) head.x--;

            if (!areAdjacent(head, tail)) {
                const vertical = head.y - tail.y;
                const horizontal = head.x - tail.x;

                tail.y += Math.sign(vertical);
                tail.x += Math.sign(horizontal);
            }

            visitedPositions.add(`${tail.x}_${tail.y}`);
        }
    });

    return visitedPositions.size;
}

function day09B(file) {
    const data = getInputData(file);
    const rope = [...new Array(10)].map(() => ({ x: 0, y: 0 }));
    const visitedPositions = new Set();
    visitedPositions.add('0_0');

    function areAdjacent(prev, curr) {
        if (Math.abs(prev.y - curr.y) > 1) return false;
        if (Math.abs(prev.x - curr.x) > 1) return false;
        return true;
    }

    data.forEach(move => {
        const [direction, totalSteps] = move.split(' ');
        for (let step = 0; step < totalSteps; step++) {
            rope.forEach((knot, i) => {
                if (i === 0) {
                    if (direction === UP) knot.y++;
                    if (direction === DOWN) knot.y--;
                    if (direction === RIGHT) knot.x++;
                    if (direction === LEFT) knot.x--;
                } else {
                    const prev = rope[i - 1];
                    if (!areAdjacent(prev, knot)) {
                        const vertical = prev.y - knot.y;
                        const horizontal = prev.x - knot.x;

                        knot.y += Math.sign(vertical);
                        knot.x += Math.sign(horizontal);

                        if (i === rope.length - 1) {
                            visitedPositions.add(`${knot.x}_${knot.y}`);
                        }
                    }
                }
            });
        }
    });

    return visitedPositions.size;
}

module.exports = {
    day09A,
    day09B,
};
