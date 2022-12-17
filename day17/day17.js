// --- Day 17: Pyroclastic Flow ---

const { getInputData } = require('../utils');

const ROCKS = [
    [
        // –
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
    ],
    [
        // +
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 2 },
    ],
    [
        // _|
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
    ],
    [
        // |
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
    ],
    [
        // []
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ],
];

const LEFT = '<';
const RIGHT = '>';

const WIDTH = 7;
const FLOOR = 0;
const START = { x: 2, y: 4 };

function checkCollisionLeft(rock, room) {
    let collision = false;
    let i = 0;
    while (!collision && i < rock.length) {
        const { x, y } = rock[i];
        collision = x === 0 || room.has(`${x - 1}_${y}`);
        i++;
    }

    return collision;
}

function checkCollisionRight(rock, room) {
    let collision = false;
    let i = 0;
    while (!collision && i < rock.length) {
        const { x, y } = rock[i];
        collision = x === WIDTH - 1 || room.has(`${x + 1}_${y}`);
        i++;
    }

    return collision;
}

function checkCollisionDown(rock, room) {
    let collision = false;
    let i = 0;
    while (!collision && i < rock.length) {
        const { x, y } = rock[i];
        collision = y - 1 === FLOOR || room.has(`${x}_${y - 1}`);
        i++;
    }

    return collision;
}

function moveLeft(rock) {
    rock.forEach(c => {
        c.x--;
    });
}

function moveRight(rock) {
    rock.forEach(c => {
        c.x++;
    });
}

function moveDown(rock) {
    rock.forEach(c => {
        c.y--;
    });
}

function printRoom(mapping) {
    const room = [...new Array(20)].map(() => [...new Array(7)].map(() => '·'));
    for (let y = 19; y > 0; y--) {
        for (let x = 0; x < 7; x++) {
            room[y][x] = mapping.get(`${x}_${y}`) || '·';
        }
    }
    console.log(
        room
            .reverse()
            .map(r => r.join(''))
            .join('\n')
    );
}

function day17A(file, turns = 2022) {
    const data = getInputData(file)[0].split('');

    const room = new Map();
    let height = FLOOR;
    let step = 0;
    for (let t = 0; t < turns; t++) {
        const rock = JSON.parse(JSON.stringify(ROCKS[t % ROCKS.length]));
        // console.log('Preparing rock', rock);
        rock.forEach(c => {
            c.x = c.x + START.x;
            c.y = c.y + height + START.y;
        });
        // console.log('A new rock begins falling', rock);

        let isFalling = true;
        while (isFalling) {
            const jet = data[step % data.length];
            if (jet === LEFT) {
                if (!checkCollisionLeft(rock, room)) {
                    // console.log('Jet of gas pushes rock left');
                    moveLeft(rock);
                } else {
                    // console.log(
                    //     'Jet of gas pushes rock left, but nothing happens'
                    // );
                }
            } else if (jet === RIGHT) {
                if (!checkCollisionRight(rock, room)) {
                    // console.log('Jet of gas pushes rock right');
                    moveRight(rock);
                } else {
                    // console.log(
                    //     'Jet of gas pushes rock right, but nothing happens'
                    // );
                }
            }
            isFalling = !checkCollisionDown(rock, room);
            if (isFalling) {
                moveDown(rock);
                // console.log('Rock falls 1 unit');
            } else {
                // console.log(
                //     'Rock falls 1 unit, causing it to come to rest',
                //     rock
                // );
            }
            step++;
        }

        rock.forEach(({ x, y }) => {
            room.set(`${x}_${y}`, '#');
        });
        const highestRockPoint = Math.max.apply(
            Math,
            rock.map(r => r.y)
        );

        height = Math.max(height, highestRockPoint);
        // console.log({ height });
        // printRoom(room);
    }

    // console.log(height);

    return height;
}

module.exports = {
    day17A,
};
