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

function day08B(file) {
    const data = getInputData(file).map(row =>
        row.split('').map(n => Number(n))
    );
    const scores = {};

    data.forEach((row, y) => {
        if (y === 0 || y === data.length - 1) return; // Skip edges
        row.forEach((el, x) => {
            if (x === 0 || x === row.length - 1) return; // Skip edges
            const rowL = row.slice(0, x);
            const rowR = row.slice(x + 1, row.length);
            let scoreL = 0;
            let scoreR = 0;

            while (scoreL < x && el > rowL[rowL.length - 1 - scoreL]) scoreL++;
            scoreL += scoreL < x ? 1 : 0;

            while (scoreR < rowR.length && el > rowR[scoreR]) scoreR++;
            scoreR += scoreR < rowR.length ? 1 : 0;

            if (scores[y] === undefined) scores[y] = {};
            scores[y][x] = scoreL * scoreR;
        });
    });

    const transposed = transpose(data);
    transposed.forEach((col, x) => {
        if (x === 0 || x === transposed.length - 1) return; // Skip edges
        col.forEach((el, y) => {
            if (y === 0 || y === col.length - 1) return; // Skip edges
            const colU = col.slice(0, y);
            const colD = col.slice(y + 1, col.length);
            let scoreU = 0;
            let scoreD = 0;

            while (scoreU < y && el > colU[colU.length - 1 - scoreU]) scoreU++;
            scoreU += scoreU < y ? 1 : 0;

            while (scoreD < colD.length && el > colD[scoreD]) scoreD++;
            scoreD += scoreD < colD.length ? 1 : 0;

            scores[y][x] *= scoreU * scoreD;
        });
    });

    const result = Object.values(scores)
        .map(s => Object.values(s))
        .join()
        .split(',')
        .map(n => Number(n));
    return max(result);
}

module.exports = {
    day08A,
    day08B,
};
