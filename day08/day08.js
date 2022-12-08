// --- Day 8: Treetop Tree House ---

const { getInputData, max, transpose } = require('../utils');

function day08A(file) {
    const data = getInputData(file).map(row =>
        row.split('').map(n => Number(n))
    );
    let visibleCount = data.length * 2 + (data[0].length - 2) * 2; // Trees around the edge
    const alreadyCounted = [];

    data.forEach((row, y) => {
        if (y === 0 || y === data.length - 1) return; // Skip edges
        row.forEach((el, x) => {
            if (x === 0 || x === row.length - 1) return; // Skip edges
            if (
                el > max(row.slice(0, x)) ||
                el > max(row.slice(x + 1, row.length))
            ) {
                visibleCount++;
                alreadyCounted.push(`x${x}y${y}`);
            }
        });
    });

    const transposed = transpose(data);
    transposed.forEach((row, y) => {
        if (y === 0 || y === transposed.length - 1) return; // Skip edges
        row.forEach((el, x) => {
            if (x === 0 || x === row.length - 1) return; // Skip edges
            if (alreadyCounted.includes(`x${y}y${x}`)) return;
            if (
                el > max(row.slice(0, x)) ||
                el > max(row.slice(x + 1, row.length))
            )
                visibleCount++;
        });
    });

    return visibleCount;
}

module.exports = {
    day08A,
};
