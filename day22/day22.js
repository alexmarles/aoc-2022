// --- Day 22: Monkey Map ---

const { getRawInputData } = require('../utils');

const VOID = ' ';
const FLOOR = '.';
const WALL = '#';
const CLOCKWISE = 'R';
const COUNTER = 'L';
const FACING = {
    '1_0': 0,
    '0_1': 1,
    '-1_0': 2,
    '0_-1': 3,
};

function day22A(file) {
    const data = getRawInputData(file);
    const steps = data
        .slice(data.length - 2)[0]
        .split(/[RL]+/)
        .map(n => Number(n));
    const turns = data
        .slice(data.length - 2)[0]
        .split(/[\d]+/)
        .filter(d => !!d);
    const board = new Map();
    let position = { x: 0, y: 0 };
    let direction = { x: 1, y: 0 };

    function makeATurn(turn) {
        const current = `${direction.x}_${direction.y}`;
        const directions = Object.keys(FACING);
        const nextI =
            (directions.length +
                directions.indexOf(current) +
                (turn === CLOCKWISE ? 1 : -1)) %
            directions.length;
        const next = directions[nextI].split('_').map(n => Number(n));
        return { x: next[0], y: next[1] };
    }

    function nextPosition(currentPosition, currentDirection) {
        const { left, right } = board.get(`row_${currentPosition.y}`);
        const { up, down } = board.get(`col_${currentPosition.x}`);
        let nextX = currentPosition.x + currentDirection.x;
        let nextY = currentPosition.y + currentDirection.y;
        if (nextX > right) nextX = left;
        if (nextX < left) nextX = right;
        if (nextY > down) nextY = up;
        if (nextY < up) nextY = down;

        return {
            x: nextX,
            y: nextY,
        };
    }

    data.splice(data.length - 3);
    const maxWidth = Math.max.apply(
        Math,
        data.map(r => r.length)
    );
    for (let y in data) {
        let minX = data[y].length;
        let maxX = 0;
        for (let x in data[y].split('')) {
            if (data[y][x] === VOID) continue;
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            board.set(`${x}_${y}`, data[y][x]);
        }
        board.set(`row_${y}`, { left: minX, right: maxX });
    }
    for (let x = 0; x < maxWidth; x++) {
        let minY = data.length;
        let maxY = 0;
        for (let y in data) {
            if (data[y][x] === VOID || data[y][x] === undefined) continue;
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        board.set(`col_${x}`, { up: minY, down: maxY });
    }
    while (!board.has(`${position.x}_${position.y}`)) position.x++;
    while (board.get(`${position.x}_${position.y}`) !== FLOOR) position.x++;

    for (let i = 0; i < steps.length; i++) {
        for (let _ = 0; _ < steps[i]; _++) {
            const next = nextPosition(position, direction);
            if (board.get(`${next.x}_${next.y}`) === WALL) {
                continue;
            }

            position = next;
        }
        if (turns[i]) direction = makeATurn(turns[i]);
    }

    const result =
        1000 * (position.y + 1) +
        4 * (position.x + 1) +
        FACING[`${direction.x}_${direction.y}`];

    return result;
}

module.exports = {
    day22A,
};
