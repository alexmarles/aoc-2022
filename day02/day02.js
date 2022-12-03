// --- Day 2: Rock Paper Scissors ---

const { getInputData, sum } = require('../utils');

// ROCK: A / X
// PAPER: B / Y
// SCISSORS: C / Z

const S = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
    LOSE: 0,
    DRAW: 3,
    WIN: 6,
};

const R = {
    A: {
        X: S.ROCK + S.DRAW,
        Y: S.PAPER + S.WIN,
        Z: S.SCISSORS + S.LOSE,
    },
    B: {
        X: S.ROCK + S.LOSE,
        Y: S.PAPER + S.DRAW,
        Z: S.SCISSORS + S.WIN,
    },
    C: {
        X: S.ROCK + S.WIN,
        Y: S.PAPER + S.LOSE,
        Z: S.SCISSORS + S.DRAW,
    },
};

function day02A(file) {
    const data = getInputData(file);

    const rounds = data.map(round => {
        const [opponent, me] = round.split(' ');
        return R[opponent][me];
    });

    return sum(rounds);
}

function day02B(file) {
    const data = getInputData(file);

    return data;
}

module.exports = {
    day02A,
    day02B,
};
