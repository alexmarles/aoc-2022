// --- Day 14: Regolith Reservoir ---

const { getInputData } = require('../utils');

const ROCK = '#';
const SAND = 'o';
const AIR = '.';

function printCave(cave) {
    return cave.map((row, i) => [i, ...row].join('')).join('\n');
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
    const width = maxWidth - minWidth + 1;
    const cave = [...new Array(depth)].map(() =>
        [...new Array(width)].map(() => AIR)
    );
    traces = traces.map(trace => trace.map(([x, y]) => [x - minWidth, y]));

    traces.forEach(trace => {
        for (let i = 0; i < trace.length - 1; i++) {
            const from = trace[i];
            const to = trace[i + 1];

            let distX = Math.abs(to[0] - from[0]);
            let distY = Math.abs(to[1] - from[1]);
            const dirX = Math.sign(to[0] - from[0]);
            const dirY = Math.sign(to[1] - from[1]);
            let [x, y] = from;
            while (distX > 0 || distY > 0) {
                cave[y][x] = ROCK;
                x += dirX;
                y += dirY;
                if (distX > 0) distX--;
                if (distY > 0) distY--;
            }
            cave[y][x] = ROCK;
        }
    });
    const start = [500 - minWidth, 0];
    cave[start[1]][start[0]] = 'x';

    let producedSand = 0;
    let isSandLost = false;
    while (!isSandLost) {
        producedSand++;
        let [x, y] = start;
        let isSandMoving = true;
        while (isSandMoving) {
            if (cave[y + 1] === undefined) {
                isSandLost = true;
                isSandMoving = false;
            } else if (cave[y + 1][x] === AIR) {
                y++;
            } else if (cave[y + 1][x - 1] === AIR) {
                y++;
                x--;
            } else if (cave[y + 1][x + 1] === AIR) {
                y++;
                x++;
            } else {
                if (x > 0 && x < width - 1 && y < depth - 1) {
                    cave[y][x] = SAND;
                } else {
                    isSandLost = true;
                }
                isSandMoving = false;
            }
        }
    }

    return producedSand - 1;
}

module.exports = {
    day14A,
};
