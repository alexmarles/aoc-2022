// --- Day 11: Monkey in the Middle ---

const { getInputDataInChunks } = require('../utils');

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

function parseMonkey(raw) {
    const monkey = {};
    monkey.inspected = 0;
    monkey.items = raw
        .match(/^\s*Starting\sitems: ([0-9,\s]*)$/m)[1]
        .split(',')
        .map(i => Number(i));
    monkey.op = old => eval(raw.match(/^\s*Operation:\snew\s=\s(.*)$/m)[1]);
    monkey.test = Number(raw.match(/^\s*Test.*\s([0-9]*)$/m)[1]);
    monkey.ifTrue = Number(raw.match(/^\s*If\strue.*\s([0-9])/m)[1]);
    monkey.ifFalse = Number(raw.match(/^\s*If\sfalse.*\s([0-9])/m)[1]);

    return monkey;
}

function monkeysTurn({ monkey, allMonkeys, relief = false, factor = false }) {
    monkey.items.forEach(item => {
        let worry = monkey.op(item);
        if (relief) worry = Math.floor(worry / relief);
        else worry = worry % factor;
        const { ifTrue, ifFalse } = monkey;
        const to = worry % monkey.test === 0 ? ifTrue : ifFalse;
        allMonkeys[to].items.push(worry);
        monkey.inspected++;
    });
    monkey.items = [];
}

function monkeyBusiness(arr) {
    return arr
        .map(m => m.inspected)
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((acc, curr) => acc * curr, 1);
}

function day11A(file) {
    const ROUNDS = 20;
    const RELIEF = 3;
    const data = getInputDataInChunks(file);
    const monkeys = data.map(parseMonkey);

    for (let i = 0; i < ROUNDS; i++) {
        monkeys.forEach(monkey => {
            monkeysTurn({
                monkey,
                allMonkeys: monkeys,
                relief: RELIEF,
            });
        });
    }

    return monkeyBusiness(monkeys);
}

function day11B(file) {
    const ROUNDS = 10000;
    const data = getInputDataInChunks(file);
    const monkeys = data.map(parseMonkey);
    const factor = monkeys.map(m => m.test).reduce(lcm);

    for (let i = 0; i < ROUNDS; i++) {
        monkeys.forEach(monkey => {
            monkeysTurn({
                monkey,
                allMonkeys: monkeys,
                factor,
            });
        });
    }

    return monkeyBusiness(monkeys);
}

module.exports = {
    day11A,
    day11B,
};
