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

module.exports = {
    day09A,
};
