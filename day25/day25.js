// --- Day 25: Full of Hot Air ---

const { getInputData } = require('../utils');

const SNAFU = {
    2: 2,
    1: 1,
    0: 0,
    '-': -1,
    '=': -2,
};

const OFFSET = {
    0: 0,
    1: 1,
    2: 2,
    3: -2,
    4: -1,
};

const SYMBOLS = {
    2: 2,
    1: 1,
    0: 0,
    '-1': '-',
    '-2': '=',
};

function snafuToDecimal(snafu) {
    return snafu
        .split('')
        .reverse()
        .reduce((acc, curr, i) => acc + Number(SNAFU[curr]) * 5 ** i, 0);
}

function decimalToSnafu(decimal) {
    const snafu = [];
    while (decimal > 0) {
        let v = OFFSET[decimal % 5];
        if (v < 0) decimal += 5;
        snafu.push(SYMBOLS[v]);
        decimal = Math.floor(decimal / 5);
    }
    return snafu.reverse().join('') || '0';
}

function day25A(file) {
    const data = getInputData(file);
    const snafus = data.map(l => snafuToDecimal(l));
    const totalD = snafus.reduce((acc, curr) => acc + curr, 0);
    const totalS = decimalToSnafu(totalD);

    return totalS;
}

module.exports = {
    day25A,
};
