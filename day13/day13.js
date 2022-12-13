// --- Day 13: Distress Signal ---

const { getInputData } = require('../utils');

const OK = 1;
const WRONG = -1;
const CONTINUE = 0;

function compare({ left, right }) {
    if (typeof left === 'number' && typeof right === 'number') {
        if (left < right) return OK;
        if (left > right) return WRONG;
        if (left === right) return CONTINUE;
    }

    if (typeof left === 'number' && Array.isArray(right)) {
        return compare({
            left: [left],
            right,
        });
    }
    if (Array.isArray(left) && typeof right === 'number') {
        return compare({
            left,
            right: [right],
        });
    }

    let i = 0;
    let correct = CONTINUE;
    while (correct === CONTINUE && i < left.length) {
        if (right[i] === undefined) correct = WRONG;
        else {
            correct = compare({
                left: left[i],
                right: right[i],
            });
            i++;
        }
    }
    if (correct === CONTINUE && left.length < right.length) correct = OK;
    return correct;
}

function day13A(file) {
    const data = getInputData(file).map(p => (p === '' ? '' : JSON.parse(p)));
    const pairs = [];
    let i = -1;
    while (i++ < data.length) {
        pairs.push({
            left: data[i],
            right: data[i + 1],
            correct: false,
        });
        i += 2;
    }

    pairs.forEach((pair, i) => {
        pairs[i].correct = compare(pair) === OK;
    });

    const result = pairs
        .map((p, i) => (p.correct ? i + 1 : null))
        .filter(p => p !== null)
        .reduce((acc, curr) => acc + curr, 0);

    return result;
}

function day13B(file) {
    const dividers = [[[2]], [[6]]];
    const data = getInputData(file)
        .filter(e => e !== '')
        .map(e => JSON.parse(e))
        .concat(dividers);

    for (let i = 0; i < data.length; i++) {
        for (j = 0; j < data.length - i - 1; j++) {
            if (compare({ left: data[j], right: data[j + 1] }) !== OK) {
                const temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            }
        }
    }

    const result =
        (data.indexOf(dividers[0]) + 1) * (data.indexOf(dividers[1]) + 1);

    return result;
}

module.exports = {
    day13A,
    day13B,
};
