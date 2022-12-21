// --- Day 21: Monkey Math ---

const { getInputData } = require('../utils');

function parseMonkeys(data, part2 = false) {
    const monkeys = {};
    for (let l of data) {
        const [name, rawOp] = l.split(': ');
        if (rawOp.match(/\d+/)) {
            monkeys[name] = () => Number(rawOp);
            continue;
        }
        const [left, op, right] = rawOp.split(' ');
        if (part2 && name === 'root') {
            monkeys[name] = () =>
                eval(`[${monkeys[left]()}, ${monkeys[right]()}]`);
        } else {
            monkeys[name] = () =>
                eval(`${monkeys[left]()} ${op} ${monkeys[right]()}`);
        }
    }
    return monkeys;
}

function day21A(file) {
    const data = getInputData(file);
    const monkeys = parseMonkeys(data);

    return monkeys['root']();
}

function day21B(file) {
    const data = getInputData(file);
    const monkeys = parseMonkeys(data, true);
    let compare = (a, b) => a < b;

    let start = 0;
    let end = Number.MAX_SAFE_INTEGER;
    while (start !== end) {
        const middle = Math.floor((start + end) / 2);
        monkeys.humn = () => middle;
        const [left, right] = monkeys['root']();
        if (left === right) return middle;

        if (left < 0) {
            compare = (a, b) => a > b;
        }

        if (compare(left, right)) start = middle;
        else end = middle;
    }

    return NaN;
}

module.exports = {
    day21A,
    day21B,
};
