// --- Day 14: Regolith Reservoir ---

const { getInputData, max, min } = require('../utils');

const ROCK = '#';
const SAND = 'o';
const AIR = '.';
const START = [500, 0];

function printCave(cave) {
    const blueprint = [];
    for (let i = 0; i < cave.get('depth'); i++) {
        blueprint[i] = [];
        for (
            let j = cave.get('minWidth') - 10;
            j <= cave.get('maxWidth') + 10;
            j++
        ) {
            blueprint[i][j] = cave.get(`${j}_${i}`) || AIR;
        }
    }

    console.log(blueprint.map((row, i) => [...row].join('')).join('\n'));
}

function createCave({ data, hasFloor = false }) {
    const traces = data.map(path => {
        return path
            .split(' -> ')
            .map(coord => coord.split(',').map(n => Number(n)));
    });

    const cave = new Map();
    cave.set(
        'depth',
        max(traces.map(trace => trace.map(([_, y]) => y)).flat()) + 1
    );
    cave.set(
        'minWidth',
        min(traces.map(trace => trace.map(([x, _]) => x)).flat())
    );
    cave.set(
        'maxWidth',
        max(traces.map(trace => trace.map(([x, _]) => x)).flat())
    );
    cave.set('500_0', 'x');

    traces.forEach(trace => {
        for (let i = 0; i < trace.length - 1; i++) {
            const from = trace[i];
            const to = trace[i + 1];

            const dirX = Math.sign(to[0] - from[0]);
            const dirY = Math.sign(to[1] - from[1]);
            let distX = Math.abs(to[0] - from[0]);
            let distY = Math.abs(to[1] - from[1]);
            let [x, y] = from;

            while (distX > 0 || distY > 0) {
                cave.set(`${x}_${y}`, ROCK);
                x += dirX;
                y += dirY;
                if (distX > 0) distX--;
                if (distY > 0) distY--;
            }
            cave.set(`${x}_${y}`, ROCK);
        }
    });
    if (hasFloor) {
        cave.set('depth', cave.get('depth') + 2);
        for (let i = cave.get('minWidth'); i <= cave.get('maxWidth'); i++) {
            cave.set(`${i}_${cave.get('depth') - 1}`, ROCK);
        }
    }

    return cave;
}

function getSandPouredIn({ cave, hasFloor = false }) {
    const depth = cave.get('depth');
    const minWidth = hasFloor ? -Infinity : cave.get('minWidth');
    const maxWidth = hasFloor ? Infinity : cave.get('maxWidth');
    let producedSand = 0;
    let shouldStop = false;
    const steps = [];

    while (!shouldStop) {
        producedSand++;
        let [x, y] = steps.length ? steps.pop() : START;
        cave.set(`${x}_${y}`, 'x');
        let isSandMoving = true;

        while (isSandMoving) {
            if (hasFloor) {
                cave.set(`${x}_${depth - 1}`, ROCK);
                cave.set(`${x - 1}_${depth - 1}`, ROCK);
                cave.set(`${x + 1}_${depth - 1}`, ROCK);
            }

            if (y + 1 >= depth) {
                shouldStop = true;
                isSandMoving = false;
            } else {
                steps.push([x, y]);
                if (!cave.has(`${x}_${y + 1}`)) {
                    y++;
                } else if (!cave.has(`${x - 1}_${y + 1}`)) {
                    y++;
                    x--;
                } else if (!cave.has(`${x + 1}_${y + 1}`)) {
                    y++;
                    x++;
                } else {
                    if (x >= minWidth && x <= maxWidth && y < depth - 1) {
                        cave.set(`${x}_${y}`, SAND);
                        steps.pop();
                        shouldStop = steps.length === 0 && producedSand++;
                    } else {
                        shouldStop = true;
                    }
                    isSandMoving = false;
                }
            }
        }
    }

    return producedSand - 1;
}

function day14A(file) {
    const data = getInputData(file);
    const cave = createCave({ data });

    return getSandPouredIn({ cave });
}

function day14B(file) {
    const data = getInputData(file);
    const cave = createCave({ data, hasFloor: true });

    return getSandPouredIn({ cave, hasFloor: true });
}

module.exports = {
    day14A,
    day14B,
};
