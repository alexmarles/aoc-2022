// --- Day 14: Regolith Reservoir ---

const { getInputData } = require('../utils');

const ROCK = '#';
const SAND = 'o';
const AIR = ' ';
const START = [500, 0];

function printCave(cave) {
    const blueprint = [];
    for (let i = 0; i < cave.get('depth'); i++) {
        blueprint[i] = [];
        for (let j = cave.get('minWidth'); j <= cave.get('maxWidth'); j++) {
            blueprint[i][j] = cave.get(`${j}_${i}`) || AIR;
        }
    }

    return blueprint.map((row, i) => [...row].join('')).join('\n');
}

function getSandPouredIn({ cave, hasFloor = false }) {
    const depth = cave.get('depth');
    const minWidth = cave.get('minWidth');
    const maxWidth = cave.get('maxWidth');
    let producedSand = 0;
    let isSandLost = false;

    while (!isSandLost) {
        producedSand++;
        let [x, y] = START;
        let isSandMoving = true;

        while (isSandMoving) {
            if (y + 1 >= depth) {
                isSandLost = true;
                isSandMoving = false;
            } else if (!cave.has(`${x}_${y + 1}`)) {
                y++;
            } else if (!cave.has(`${x - 1}_${y + 1}`)) {
                y++;
                x--;
            } else if (!cave.has(`${x + 1}_${y + 1}`)) {
                y++;
                x++;
            } else {
                if (x >= minWidth && x <= maxWidth - 1 && y < depth - 1) {
                    cave.set(`${x}_${y}`, SAND);
                } else {
                    isSandLost = true;
                }
                isSandMoving = false;
            }
        }
    }

    return producedSand - 1;
}

function day14A(file) {
    const data = getInputData(file);
    let traces = data.map(path => {
        return path
            .split(' -> ')
            .map(coord => coord.split(',').map(n => Number(n)));
    });
    const depth =
        Math.max.apply(
            Math,
            traces.map(trace => trace.map(([_, y]) => y)).flat()
        ) + 1;
    const minWidth = Math.min.apply(
        Math,
        traces.map(trace => trace.map(([x, _]) => x)).flat()
    );
    const maxWidth = Math.max.apply(
        Math,
        traces.map(trace => trace.map(([x, _]) => x)).flat()
    );
    const cave = new Map();
    cave.set('depth', depth);
    cave.set('minWidth', minWidth);
    cave.set('maxWidth', maxWidth);
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

    return getSandPouredIn({ cave });
}

module.exports = {
    day14A,
};
