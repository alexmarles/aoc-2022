// --- Day 23: Unstable Diffusion ---

const { getInputData } = require('../utils');

const ELF = '#';
const NEIGHBOURHOOD = {
    NW: { x: -1, y: -1 },
    N: { x: 0, y: -1 },
    NE: { x: 1, y: -1 },
    W: { x: -1, y: 0 },
    E: { x: 1, y: 0 },
    SW: { x: -1, y: 1 },
    S: { x: 0, y: 1 },
    SE: { x: 1, y: 1 },
};
const DIRECTIONS = [
    Object.keys(NEIGHBOURHOOD).filter(k => k.includes('N')),
    Object.keys(NEIGHBOURHOOD).filter(k => k.includes('S')),
    Object.keys(NEIGHBOURHOOD).filter(k => k.includes('W')),
    Object.keys(NEIGHBOURHOOD).filter(k => k.includes('E')),
];

function gatherElves(data) {
    const elves = new Set();

    for (let y in data)
        for (let x in data[y].split(''))
            if (data[y][x] === ELF) elves.add(`${x}_${y}`);

    return elves;
}

function proposeMovement(elves, { x, y }, r) {
    const hasElf = p =>
        elves.has(`${x + NEIGHBOURHOOD[p].x}_${y + NEIGHBOURHOOD[p].y}`);

    if (!Object.keys(NEIGHBOURHOOD).some(hasElf)) {
        return null;
    }

    for (let i = r; i < r + 4; i++) {
        const index = i % DIRECTIONS.length;
        if (!DIRECTIONS[index].some(hasElf)) return DIRECTIONS[index][1];
    }
}

function turnToMove(elves, round) {
    const destinations = new Map();

    for (let elf of elves) {
        const [x, y] = elf.split('_').map(n => Number(n));
        const move = proposeMovement(elves, { x, y }, round);
        if (!move) continue;

        const newCoords = {
            x: x + NEIGHBOURHOOD[move].x,
            y: y + NEIGHBOURHOOD[move].y,
        };
        const coord = `${newCoords.x}_${newCoords.y}`;
        const candidates = destinations.get(coord) || [];
        candidates.push(elf);
        destinations.set(coord, candidates);
    }
    for (let [destination, candidates] of destinations) {
        if (candidates.length > 1) continue;

        elves.delete(candidates[0]);
        elves.add(destination);
    }
}

function day23A(file) {
    const data = getInputData(file);
    const elves = gatherElves(data);

    for (let round = 0; round < 10; round++) {
        turnToMove(elves, round);
    }

    let { minX, maxX, minY, maxY } = Array.from(elves).reduce(
        (acc, curr) => ({
            minX: Math.min(acc.minX, Number(curr.split('_')[0])),
            maxX: Math.max(acc.maxX, Number(curr.split('_')[0])),
            minY: Math.min(acc.minY, Number(curr.split('_')[1])),
            maxY: Math.max(acc.maxY, Number(curr.split('_')[1])),
        }),
        { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
    );
    if (minX < 0) minX--;
    if (minY < 0) minY--;
    const totalPositions = Math.abs(maxX - minX) * Math.abs(maxY - minY);

    return totalPositions - elves.size;
}

function day23B(file) {
    const data = getInputData(file);
    const elves = gatherElves(data);

    let elvesMoved = true;
    let round = 0;
    while (elvesMoved) {
        const pastElves = new Set(elves);
        turnToMove(elves, round);
        elvesMoved = Array.from(elves).join() !== Array.from(pastElves).join();
        round++;
    }

    return round;
}

module.exports = {
    day23A,
    day23B,
};
