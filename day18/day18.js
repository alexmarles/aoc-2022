// --- Day 18: Boiling Boulders ---

const { getInputData, max } = require('../utils');
const dijkstra = require('dijkstrajs');

const CUBE_SIDES = 6;

function getContactSides(data) {
    let contactSides = 0;
    data.forEach(c => {
        const [x, y, z] = c.split(',').map(n => Number(n));
        if (data.includes(`${x + 1},${y},${z}`)) contactSides++;
        if (data.includes(`${x - 1},${y},${z}`)) contactSides++;
        if (data.includes(`${x},${y + 1},${z}`)) contactSides++;
        if (data.includes(`${x},${y - 1},${z}`)) contactSides++;
        if (data.includes(`${x},${y},${z + 1}`)) contactSides++;
        if (data.includes(`${x},${y},${z - 1}`)) contactSides++;
    });
    return contactSides;
}

function day18A(file) {
    const data = getInputData(file);
    const expSides = data.length * CUBE_SIDES;
    return expSides - getContactSides(data);
}

function day18B(file) {
    const data = getInputData(file);
    let expSides = data.length * CUBE_SIDES - getContactSides(data);

    const graph = {};
    let maxX = max(data.map(l => Number(l.split(',')[0])));
    let maxY = max(data.map(l => Number(l.split(',')[1])));
    let maxZ = max(data.map(l => Number(l.split(',')[2])));
    for (let x = 1; x < maxX; x++) {
        for (let y = 1; y < maxY; y++) {
            for (let z = 1; z < maxZ; z++) {
                if (!data.includes(`${x},${y},${z}`)) {
                    const neighbours = [];
                    if (!data.includes(`${x + 1},${y},${z}`) && x < maxX) {
                        neighbours.push(`${x + 1},${y},${z}`);
                    }
                    if (!data.includes(`${x - 1},${y},${z}`) && x > 1) {
                        neighbours.push(`${x - 1},${y},${z}`);
                    }
                    if (!data.includes(`${x},${y + 1},${z}`) && y < maxY) {
                        neighbours.push(`${x},${y + 1},${z}`);
                    }
                    if (!data.includes(`${x},${y - 1},${z}`) && y > 1) {
                        neighbours.push(`${x},${y - 1},${z}`);
                    }
                    if (!data.includes(`${x},${y},${z + 1}`) && z < maxZ) {
                        neighbours.push(`${x},${y},${z + 1}`);
                    }
                    if (!data.includes(`${x},${y},${z - 1}`) && z > 1) {
                        neighbours.push(`${x},${y},${z - 1}`);
                    }
                    graph[`${x},${y},${z}`] = neighbours;
                }
            }
        }
    }

    const pockets = new Set(Object.keys(graph));
    const toRemove = new Set();

    function markForRemoval(neighbours) {
        neighbours.forEach(n => {
            if (!toRemove.has(n) && pockets.has(n)) {
                toRemove.add(n);
                graph[n] && markForRemoval(graph[n]);
            }
        });
    }

    for (let key of pockets.keys()) {
        const [x, y, z] = key.split(',').map(n => Number(n));
        if (x <= 1 || x >= maxX || y <= 1 || y >= maxY || z <= 1 || z >= maxZ) {
            toRemove.add(key);
            markForRemoval(graph[key]);
        }
    }

    // console.log({ pockets: pockets.size });
    // console.log({ toRemove: toRemove.size });
    [...toRemove].forEach(n => {
        pockets.delete(n);
    });
    // console.log({ pockets: pockets.size });

    // TODO Join points in pockets that are in the same pocket of air

    const pocketSides =
        pockets.size * CUBE_SIDES - getContactSides([...pockets]);
    console.log({ result: expSides - pocketSides });

    return expSides - pocketSides;
}

module.exports = {
    day18A,
    day18B,
};
