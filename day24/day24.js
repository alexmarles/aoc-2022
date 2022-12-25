// --- Day 24: Blizzard Basin ---

const { getInputData } = require('../utils');
const { lcm } = require('../utils/lcm');

const WALL = '#';
const CLEAR = '.';
const BLIZZARD = ['^', 'v', '<', '>'];

function mod(n, m) {
    return ((n % m) + m) % m;
}

function calculateLimits(data) {
    const top = 0;
    const bottom = data.length - 1;
    const left = 0;
    const right = data[0].length - 1;
    const start = {
        x: data[top].indexOf(CLEAR),
        y: top,
    };
    const end = {
        x: data[bottom].indexOf(CLEAR),
        y: bottom,
    };

    return {
        top,
        bottom,
        left,
        right,
        start,
        end,
    };
}

function mapBlizzards(data) {
    const blizzards = [...new Array(4)].map(() => new Set());

    for (let y in data) {
        for (let x in data[y].split('')) {
            if (data[y][x] === WALL) continue;
            if (data[y][x] === CLEAR) continue;

            blizzards[BLIZZARD.indexOf(data[y][x])].add(`${x}_${y}`);
        }
    }

    return blizzards;
}

function shortestTimeThroughTheValley(
    blizzards,
    { top, bottom, left, right, start, end }
) {
    const queue = [[0, start.x, start.y]];
    const cache = new Set();
    const factor = lcm(right + 1, bottom + 1);

    while (queue.length) {
        let [time, x, y] = queue.shift();
        time += 1;
        const moves = [
            [0, -1], // Up
            [0, 1], // Down
            [-1, 0], // Left
            [1, 0], // Right
            [0, 0], // Wait
        ];
        const blizMoves = [
            [BLIZZARD.indexOf('^'), 0, -1], // Up
            [BLIZZARD.indexOf('v'), 0, 1], // Down
            [BLIZZARD.indexOf('<'), -1, 0], // Left
            [BLIZZARD.indexOf('>'), 1, 0], // Right
        ];

        for (let [dx, dy] of moves) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx === end.x && ny === end.y) return time; // We have arrived!

            if (
                (nx <= left || ny <= top || nx > right || ny > bottom) &&
                !(nx === start.x && ny === start.y)
            )
                continue;

            let canContinue = true;
            if (!(nx === start.x && ny === start.y)) {
                for (let [i, bx, by] of blizMoves) {
                    const tx = mod(nx - 1 - bx * time, right - 1) + 1;
                    const ty = mod(ny - 1 - by * time, bottom - 1) + 1;
                    if (blizzards[i].has(`${tx}_${ty}`)) {
                        canContinue = false;
                        break;
                    }
                }
            }

            if (canContinue) {
                const key = [nx, ny, time % factor].join();
                if (cache.has(key)) continue;
                cache.add(key);
                queue.push([time, nx, ny]);
            }
        }
    }
}

function day24A(file) {
    const data = getInputData(file);
    const limits = calculateLimits(data);
    const blizzards = mapBlizzards(data);
    const minTime = shortestTimeThroughTheValley(blizzards, limits);

    return minTime;
}

module.exports = {
    day24A,
};
