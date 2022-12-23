// --- Day 23: Unstable Diffusion ---

const { getInputData } = require('../utils');

const ELF = '#';
const EMPTY = '.';
const NEIGHBOURHOOD = {
    NW: { x: -1, y: -1 },
    N: { x: 0, y: -1 },
    NE: { x: 1, y: -1 },
    W: { x: -1, y: 0 },
    E: { x: +1, y: 0 },
    SW: { x: -1, y: 1 },
    S: { x: 0, y: 1 },
    SE: { x: 1, y: 1 },
};

function day23A(file) {
    const data = getInputData(file);
    const elves = new Set();
    const proposedDirections = [
        ['NW', 'N', 'NE'],
        ['SW', 'S', 'SE'],
        ['NW', 'W', 'SW'],
        ['NE', 'E', 'SE'],
    ];
    let minX = 0;
    let maxX = data.length - 1;
    let minY = 0;
    let maxY = data.length - 1;

    function updateBoundaries({ x, y }) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }

    function proposeMovement({ x, y }, r) {
        if (
            !['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE'].some(p =>
                elves.has(`${x + NEIGHBOURHOOD[p].x}_${y + NEIGHBOURHOOD[p].y}`)
            )
        ) {
            return null; // No neighbours, no movement
        }

        for (let i = r; i < r + 4; i++) {
            if (
                !proposedDirections[i % proposedDirections.length].some(p =>
                    elves.has(
                        `${x + NEIGHBOURHOOD[p].x}_${y + NEIGHBOURHOOD[p].y}`
                    )
                )
            ) {
                return proposedDirections[i % proposedDirections.length][1];
            }
        }
    }

    for (let y in data) {
        for (let x in data[y].split('')) {
            if (data[y][x] === ELF) {
                elves.add(`${x}_${y}`);
                updateBoundaries({ x, y });
            }
        }
    }

    for (let round = 0; round < 10; round++) {
        const destinations = new Map();
        for (let elf of elves) {
            const [x, y] = elf.split('_').map(n => Number(n));
            const move = proposeMovement({ x, y }, round);
            if (move) {
                const newCoords = {
                    x: x + NEIGHBOURHOOD[move].x,
                    y: y + NEIGHBOURHOOD[move].y,
                };
                const candidates =
                    destinations.get(`${newCoords.x}_${newCoords.y}`) || [];
                candidates.push(elf);
                destinations.set(`${newCoords.x}_${newCoords.y}`, candidates);
            }
        }
        for (let [destination, candidates] of destinations) {
            if (candidates.length > 1) continue;

            const [x, y] = destination.split('_').map(n => Number(n));
            elves.delete(candidates[0]);
            elves.add(destination);
            updateBoundaries({ x, y });
        }
    }
    if (minX < 0) minX--;
    if (minY < 0) minY--;
    const totalPositions = Math.abs(maxX - minX) * Math.abs(maxY - minY);

    return totalPositions - elves.size;
}

module.exports = {
    day23A,
};
