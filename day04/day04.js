// --- Day 4: Camp Cleanup ---

const { getInputData } = require('../utils');

function day04A(file) {
    const data = getInputData(file);
    const pairs = data.map(pairing =>
        pairing.split(',').map(pair => pair.split('-').map(a => Number(a)))
    );
    const contained = pairs.map(([e1, e2]) => {
        return (
            (e1[0] >= e2[0] && e1[1] <= e2[1]) ||
            (e2[0] >= e1[0] && e2[1] <= e1[1])
        );
    });

    return contained.filter(c => c).length;
}

function day04B(file) {
    const data = getInputData(file);
}

module.exports = {
    day04A,
    day04B,
};
