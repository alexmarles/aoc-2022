// --- Day 18: Boiling Boulders ---

const { getInputData } = require('../utils');

const CUBE_SIDES = 6;

function day18A(file) {
    const data = getInputData(file);
    let expSides = data.length * CUBE_SIDES;
    data.forEach(c => {
        const [x, y, z] = c.split(',').map(n => Number(n));
        if (data.includes(`${x + 1},${y},${z}`)) expSides--;
        if (data.includes(`${x - 1},${y},${z}`)) expSides--;
        if (data.includes(`${x},${y + 1},${z}`)) expSides--;
        if (data.includes(`${x},${y - 1},${z}`)) expSides--;
        if (data.includes(`${x},${y},${z + 1}`)) expSides--;
        if (data.includes(`${x},${y},${z - 1}`)) expSides--;
    });

    return expSides;
}

module.exports = {
    day18A,
};
