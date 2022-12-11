// --- Day 11: Monkey in the Middle ---

const { getInputDataInChunks } = require('../utils');

function parseMonkey(monkey) {
    const items = monkey
        .match(/^\s*Starting\sitems: ([0-9,\s]*)$/m)[1]
        .split(',')
        .map(i => Number(i));
    const op = old => eval(monkey.match(/^\s*Operation:\snew\s=\s(.*)$/m)[1]);
    const test = Number(monkey.match(/^\s*Test.*\s([0-9]*)$/m)[1]);
    const ifTrue = Number(monkey.match(/^\s*If\strue.*\s([0-9])/m)[1]);
    const ifFalse = Number(monkey.match(/^\s*If\sfalse.*\s([0-9])/m)[1]);

    return {
        items,
        op,
        test,
        ifTrue,
        ifFalse,
        inspected: 0,
    };
}

function day11A(file) {
    const ROUNDS = 20;
    const RELIEF = 3;
    const data = getInputDataInChunks(file);
    const monkeys = data.map(parseMonkey);

    function monkeysTurn(monkey) {
        monkey.items.forEach(item => {
            let worry = monkey.op(item);
            worry = Math.floor(worry / RELIEF);
            const to =
                worry % monkey.test === 0 ? monkey.ifTrue : monkey.ifFalse;
            monkeys[to].items.push(worry);
            monkey.inspected++;
        });
        monkey.items = [];
    }

    for (let i = 0; i < ROUNDS; i++) {
        monkeys.forEach(monkeysTurn);
    }

    const top2 = monkeys
        .map(m => m.inspected)
        .sort((a, b) => b - a)
        .slice(0, 2);
    const monkeyBusiness = top2.reduce((acc, curr) => acc * curr, 1);

    return monkeyBusiness;
}

module.exports = {
    day11A,
};
