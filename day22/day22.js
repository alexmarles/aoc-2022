// --- Day 22: Monkey Map ---

const { getRawInputData } = require('../utils');

const VOID = ' ';
const FLOOR = '.';
const WALL = '#';
const CLOCKWISE = 'R';
const COUNTER = 'L';
const FACING = {
    '1_0': 0, // Right
    '0_1': 1, // Down
    '-1_0': 2, // Left
    '0_-1': 3, // Up
};

function makeATurn(turn, currentDirection) {
    const key = `${currentDirection.x}_${currentDirection.y}`;
    const directions = Object.keys(FACING);
    const nextI =
        (directions.length +
            directions.indexOf(key) +
            (turn === CLOCKWISE ? 1 : -1)) %
        directions.length;
    const next = directions[nextI].split('_').map(n => Number(n));
    return { x: next[0], y: next[1] };
}

// Cube edges
//            1-----5-----3
//            |     |     |
//            |     |     |
//            2-----+-----4
//            |     |
//            |     |
//      2-----+-----4
//      |     |     |
//      |     |     |
//      1-----+-----3
//      |     |
//      |     |
//      5-----3

function nextPosition(currentPosition, currentDirection, board, flat) {
    let nc = currentPosition.x + currentDirection.x;
    let nr = currentPosition.y + currentDirection.y;
    let newDirection = { ...currentDirection };
    if (flat) {
        const { left, right } = board.get(`row_${currentPosition.y}`);
        const { top, bottom } = board.get(`col_${currentPosition.x}`);
        if (nc > right) nc = left;
        if (nc < left) nc = right;
        if (nr > bottom) nr = top;
        if (nr < top) nr = bottom;
    } else {
        // Edge 1-5
        if (nr < 0 && nc >= 50 && nc < 100 && currentDirection.y === -1) {
            newDirection = makeATurn(CLOCKWISE, currentDirection);
            nr = nc + 100;
            nc = 0;
        } else if (
            nc < 0 &&
            nr >= 150 &&
            nr < 200 &&
            currentDirection.x === -1
        ) {
            newDirection = makeATurn(COUNTER, currentDirection);
            nc = nr - 100;
            nr = 0;
        }
        // Edge 5-3
        else if (nr < 0 && nc >= 100 && nc < 150 && currentDirection.y === -1) {
            nc = nc - 100;
            nr = 199;
        } else if (
            nr >= 200 &&
            nc >= 0 &&
            nc < 50 &&
            currentDirection.y === 1
        ) {
            nc = nc + 100;
            nr = 0;
        }
        // Edge 3-4
        else if (nc >= 150 && nr >= 0 && nr < 50 && currentDirection.x === 1) {
            newDirection = makeATurn(
                CLOCKWISE,
                makeATurn(CLOCKWISE, currentDirection)
            );
            nc = 99;
            nr = 149 - nr;
        } else if (
            nc === 100 &&
            nr >= 100 &&
            nr < 150 &&
            currentDirection.x === 1
        ) {
            newDirection = makeATurn(
                CLOCKWISE,
                makeATurn(CLOCKWISE, currentDirection)
            );
            nc = 149;
            nr = 149 - nr;
        }
        // Edge 4-+
        else if (
            nr === 50 &&
            nc >= 100 &&
            nc < 150 &&
            currentDirection.y === 1
        ) {
            newDirection = makeATurn(CLOCKWISE, currentDirection);
            nr = nc - 50;
            nc = 99;
        } else if (
            nc === 100 &&
            nr >= 50 &&
            nr < 100 &&
            currentDirection.x === 1
        ) {
            newDirection = makeATurn(COUNTER, currentDirection);
            nc = nr + 50;
            nr = 49;
        }
        // Edge 3-+
        else if (
            nr === 150 &&
            nc >= 50 &&
            nc < 100 &&
            currentDirection.y === 1
        ) {
            newDirection = makeATurn(CLOCKWISE, currentDirection);
            nr = nc + 100;
            nc = 49;
        } else if (
            nc === 50 &&
            nr >= 150 &&
            nr < 200 &&
            currentDirection.x === 1
        ) {
            newDirection = makeATurn(COUNTER, currentDirection);
            nc = nr - 100;
            nr = 149;
        }
        // Edge 2-+
        else if (nr === 99 && nc >= 0 && nc < 50 && currentDirection.y === -1) {
            newDirection = makeATurn(CLOCKWISE, currentDirection);
            nr = nc + 50;
            nc = 50;
        } else if (
            nc === 49 &&
            nr >= 50 &&
            nr < 100 &&
            currentDirection.x === -1
        ) {
            newDirection = makeATurn(COUNTER, currentDirection);
            nc = nr - 50;
            nr = 100;
        }
        // Edge 1-2
        else if (nc === 49 && nr >= 0 && nr < 50 && currentDirection.x === -1) {
            newDirection = makeATurn(
                CLOCKWISE,
                makeATurn(CLOCKWISE, currentDirection)
            );
            nc = 0;
            nr = 149 - nr;
        } else if (
            nc < 0 &&
            nr >= 100 &&
            nr < 150 &&
            currentDirection.x === -1
        ) {
            newDirection = makeATurn(
                CLOCKWISE,
                makeATurn(CLOCKWISE, currentDirection)
            );
            nc = 50;
            nr = 149 - nr;
        }
    }

    return {
        position: {
            x: nc,
            y: nr,
        },
        direction: newDirection,
    };
}

function traverse(data, flat = true) {
    const numbers = data
        .slice(data.length - 2)[0]
        .split(/[RL]+/)
        .map(n => Number(n));
    const letters = data
        .slice(data.length - 2)[0]
        .split(/[\d]+/)
        .filter(d => !!d);
    const board = new Map();
    let position = { x: 0, y: 0 };
    let direction = { x: 1, y: 0 };

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
        board.set(`col_${x}`, { top: minY, bottom: maxY });
    }
    while (board.get(`${position.x}_${position.y}`) !== FLOOR) position.x++;

    for (let i = 0; i < numbers.length; i++) {
        for (let _ = 0; _ < numbers[i]; _++) {
            const next = nextPosition(position, direction, board, flat);
            if (board.get(`${next.position.x}_${next.position.y}`) === WALL)
                continue;

            position = next.position;
            direction = next.direction;
        }

        if (letters[i]) direction = makeATurn(letters[i], direction);
    }

    return {
        position,
        direction,
    };
}

function day22A(file) {
    const data = getRawInputData(file);
    const { position, direction } = traverse(data);

    const result =
        1000 * (position.y + 1) +
        4 * (position.x + 1) +
        FACING[`${direction.x}_${direction.y}`];

    return result;
}

function day22B(file) {
    const data = getRawInputData(file);
    const { position, direction } = traverse(data, false);

    const result =
        1000 * (position.y + 1) +
        4 * (position.x + 1) +
        FACING[`${direction.x}_${direction.y}`];

    return result;
}

module.exports = {
    day22A,
    day22B,
};
