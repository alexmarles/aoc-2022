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

function day17A(file, turns = 2022) {
    const data = getInputData(file)[0].split('');

    let cache;

    const room = new Map();
    const heightAt = new Map();
    let step = 0;

    let patternFound = false;
    let t = 0;

    function runForNTurns(nTurns, baseHeight = FLOOR) {
        // console.log('RUN FOR', nTurns, 'turns');
        let height = baseHeight;
        let keepRunning = true;
        while (t < nTurns && keepRunning) {
            const rock = JSON.parse(JSON.stringify(ROCKS[t % ROCKS.length]));
            rock.forEach(c => {
                c.x = c.x + START.x;
                c.y = c.y + height + START.y;
            });

            let isFalling = true;
            while (isFalling) {
                const jet = data[step % data.length];
                if (jet === LEFT) {
                    if (!checkCollision('left', rock, room)) move('left', rock);
                } else if (jet === RIGHT) {
                    if (!checkCollision('right', rock, room))
                        move('right', rock);
                }
                isFalling = !checkCollision('down', rock, room);
                if (isFalling) move('down', rock);
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
            heightAt.set(t, height);
            if (t > 4001 && !patternFound && t % ROCKS.length === 0) {
                if (!cache) {
                    cache = {
                        jet: step % data.length,
                        turn: t,
                    };
                    // console.log({ cache });
                } else if (cache.jet === step % data.length) {
                    patternFound = true;
                    keepRunning = false;
                }
            }
            if (keepRunning) t++;
        }
        return height;
    }

    let result = runForNTurns(turns);

    if (patternFound) {
        const previous = cache.turn;
        const pattern = t - previous;
        const baseHeight = heightAt.get(previous);
        const remainder = (turns - previous) % pattern;
        const iterations = (turns - previous - remainder) / pattern;
        const totalHeight = runForNTurns(pattern + remainder, result);
        const patternHeight = heightAt.get(previous + pattern) - baseHeight;
        const remainderHeight = totalHeight - patternHeight - baseHeight;
        // const remainderHeight = runForNTurns(remainder, patternHeight);
        result = baseHeight + patternHeight * iterations + remainderHeight - 1;
    }

    // console.log({ result });
    return result;
}

module.exports = {
    day17A,
};
