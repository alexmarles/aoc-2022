// --- Day 11: Monkey in the Middle ---

const { getInputDataInChunks } = require('../utils');

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

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

function day11B(file) {
    const ROUNDS = 10000;
    const data = getInputDataInChunks(file);
    const monkeys = data.map(parseMonkey);
    const factor = monkeys.map(m => m.test).reduce(lcm);

    function monkeysTurn(monkey) {
        monkey.items.forEach((item, i) => {
            let worry = monkey.op(item);
            worry = worry % factor;
            const { ifTrue, ifFalse } = monkey;
            const to = worry % monkey.test === 0 ? ifTrue : ifFalse;
            monkeys[to].items.push(worry);
            monkey.inspected++;
        });
        monkey.items = [];
    }

    for (let i = 0; i < ROUNDS; i++) monkeys.forEach(monkeysTurn);

    return monkeys
        .map(m => m.inspected)
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((acc, curr) => acc * curr, 1);
}

module.exports = {
    day11A,
    day11B,
};
