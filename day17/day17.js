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

const MOVES = {
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    down: { x: 0, y: -1 },
};

const WIDTH = 7;
const FLOOR = 0;
const START = { x: 2, y: 4 };

function checkCollision(dir, rock, room) {
    let collision = false;
    let i = 0;
    while (!collision && i < rock.length) {
        const { x, y } = rock[i];
        switch (dir) {
            case 'left':
                collision = x === 0 || room.has(`${x - 1}_${y}`);
                break;
            case 'right':
                collision = x === WIDTH - 1 || room.has(`${x + 1}_${y}`);
                break;
            case 'down':
                collision = y === FLOOR + 1 || room.has(`${x}_${y - 1}`);
                break;
            default:
                break;
        }
        i++;
    }

    return collision;
}

function move(dir, rock) {
    rock.forEach(c => {
        c.x = c.x + MOVES[dir].x;
        c.y = c.y + MOVES[dir].y;
    });
}

function runForNTurns(nTurns, jets) {
    const room = new Map();
    const heights = new Set();
    let height = FLOOR;
    let rockCount = 0;
    let step = 0;

    while (rockCount < nTurns) {
        const rockIndex = rockCount % ROCKS.length;
        const rock = JSON.parse(JSON.stringify(ROCKS[rockIndex]));
        rock.forEach(c => {
            c.x = c.x + START.x;
            c.y = c.y + height + START.y;
        });

        let isFalling = true;
        let jetIndex;
        while (isFalling) {
            jetIndex = step % jets.length;
            const jet = jets[jetIndex];
            if (jet === LEFT && !checkCollision('left', rock, room))
                move('left', rock);
            else if (jet === RIGHT && !checkCollision('right', rock, room))
                move('right', rock);
            isFalling = !checkCollision('down', rock, room);
            if (isFalling) move('down', rock);
            step++;
        }

        rock.forEach(({ x, y }) => {
            room.set(`${x}_${y}`, '#');
            heights.add(y);
        });
        height = Math.max.apply(Math, [...heights]);

        rockCount++;
    }

    return height;
}

function day17A(file) {
    const data = getInputData(file)[0].split('');

    let result = runForNTurns(2022, data);

    return result;
}

module.exports = {
    day17A,
};
