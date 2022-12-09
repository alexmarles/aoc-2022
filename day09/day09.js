// --- Day 9: Rope Bridge ---

const { getInputData } = require('../utils');

const UP = 'U';
const DOWN = 'D';
const RIGHT = 'R';
const LEFT = 'L';

function moveRopeWithKnots(moves, numberOfKnots) {
    const rope = [...new Array(numberOfKnots)].map(() => ({ x: 0, y: 0 }));
    const visitedPositions = new Set();
    visitedPositions.add('0_0');

    function areAdjacent(prev, curr) {
        if (Math.abs(prev.y - curr.y) > 1) return false;
        if (Math.abs(prev.x - curr.x) > 1) return false;
        return true;
    }

    moves.forEach(move => {
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

function day09A(file) {
    const data = getInputData(file);
    return moveRopeWithKnots(data, 2);
}

function day09B(file) {
    const data = getInputData(file);
    return moveRopeWithKnots(data, 10);
}

module.exports = {
    day09A,
    day09B,
};
