// --- Day 9: Rope Bridge ---

const { getInputData } = require('../utils');

function moveRopeWithKnots(moves, numberOfKnots) {
    const rope = [...new Array(numberOfKnots)].map(() => ({ x: 0, y: 0 }));
    const visitedPositions = new Set();

    function areAdjacent(prev, curr) {
        return Math.abs(prev.y - curr.y) <= 1 && Math.abs(prev.x - curr.x) <= 1;
    }

    moves.forEach(move => {
        const [direction, totalSteps] = move.split(' ');
        for (let step = 0; step < totalSteps; step++) {
            rope.forEach((knot, i) => {
                if (i === 0) {
                    if (direction === 'U') knot.y++;
                    if (direction === 'D') knot.y--;
                    if (direction === 'R') knot.x++;
                    if (direction === 'L') knot.x--;
                } else {
                    const prev = rope[i - 1];
                    if (!areAdjacent(prev, knot)) {
                        knot.y += Math.sign(prev.y - knot.y);
                        knot.x += Math.sign(prev.x - knot.x);

                        if (i === rope.length - 1)
                            visitedPositions.add(`${knot.x}_${knot.y}`);
                    }
                }
            });
        }
    });

    return visitedPositions.size + 1;
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
