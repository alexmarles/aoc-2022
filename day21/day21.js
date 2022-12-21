// --- Day 21: Monkey Math ---

const { getInputData } = require('../utils');

function parseMonkeys(data) {
    const monkeys = {};
    for (let l of data) {
        const [name, rawOp] = l.split(': ');
        if (rawOp.match(/\d+/)) {
            monkeys[name] = () => Number(rawOp);
            continue;
        }
        const [left, right] = rawOp.split(/\s.\s/);
        monkeys[name] = () =>
            eval(
                rawOp
                    .replace(left, `monkeys['${left}']()`)
                    .replace(right, `monkeys['${right}']()`)
            );
    }
    return monkeys;
}

function day21A(file) {
    const data = getInputData(file);
    const monkeys = parseMonkeys(data);

    return monkeys['root']();
}

module.exports = {
    day21A,
};
