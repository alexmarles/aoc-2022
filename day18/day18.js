// --- Day 18: Boiling Boulders ---

const { getInputData, max, min } = require('../utils');

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
    return data.length * CUBE_SIDES - getContactSides(data);
}

function day18B(file) {
    const data = getInputData(file);
    let expSides = data.length * CUBE_SIDES - getContactSides(data);

    let maxX = max(data.map(l => Number(l.split(',')[0])));
    let maxY = max(data.map(l => Number(l.split(',')[1])));
    let maxZ = max(data.map(l => Number(l.split(',')[2])));
    let minX = min(data.map(l => Number(l.split(',')[0])));
    let minY = min(data.map(l => Number(l.split(',')[1])));
    let minZ = min(data.map(l => Number(l.split(',')[2])));

    const graph = {};
    for (let x = minX + 1; x <= maxX - 1; x++) {
        for (let y = minY + 1; y <= maxY - 1; y++) {
            for (let z = minZ + 1; z <= maxZ - 1; z++) {
                const key = [x, y, z].join(',');
                if (!data.includes(key)) {
                    const neighbours = [];
                    if (!data.includes(`${x + 1},${y},${z}`)) {
                        neighbours.push(`${x + 1},${y},${z}`);
                    }
                    if (!data.includes(`${x - 1},${y},${z}`)) {
                        neighbours.push(`${x - 1},${y},${z}`);
                    }
                    if (!data.includes(`${x},${y + 1},${z}`)) {
                        neighbours.push(`${x},${y + 1},${z}`);
                    }
                    if (!data.includes(`${x},${y - 1},${z}`)) {
                        neighbours.push(`${x},${y - 1},${z}`);
                    }
                    if (!data.includes(`${x},${y},${z + 1}`)) {
                        neighbours.push(`${x},${y},${z + 1}`);
                    }
                    if (!data.includes(`${x},${y},${z - 1}`)) {
                        neighbours.push(`${x},${y},${z - 1}`);
                    }
                    graph[key] = neighbours;
                }
            }
        }
    }

    const pockets = Object.keys(graph);
    const toRemove = new Set();
    pockets.forEach(p => {
        const neighbours = graph[p];
        neighbours.forEach(neighbour => {
            const [x, y, z] = neighbour.split(',').map(n => Number(n));
            if (
                x === minX ||
                x === maxX ||
                y === minY ||
                y === maxY ||
                z === minZ ||
                z === maxZ
            )
                toRemove.add(p);
        });
    });
    let prevSize;
    do {
        prevSize = toRemove.size;
        pockets.forEach(p => {
            const neighbours = graph[p];
            neighbours.forEach(neighbour => {
                if (toRemove.has(neighbour)) toRemove.add(p);
            });
        });
    } while (prevSize !== toRemove.size);

    const isolated = pockets.filter(p => !toRemove.has(p));
    const internalCollidingSides = getContactSides(isolated);
    return expSides - (isolated.length * CUBE_SIDES - internalCollidingSides);
}

module.exports = {
    day18A,
    day18B,
};
