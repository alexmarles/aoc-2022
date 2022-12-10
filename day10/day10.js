// --- Day 10: Cathode-Ray Tube ---

const { getInputData, sum } = require('../utils');
const INTERVAL = 40;

function day10A(file) {
    const instructions = getInputData(file);
    let x = 1;
    let cycle = 1;
    const strengths = [];

    function startCycle() {
        if (cycle === 20 || (cycle + 20) % INTERVAL === 0)
            strengths.push({ strenght: cycle * x, cycle });
    }

    function endCycle() {
        cycle++;
    }

    function endOpCycle(V) {
        x = x + V;
        cycle++;
    }

    instructions.forEach(instruction => {
        const [op, value] = instruction.split(' ');
        const V = Number(value) || null;

        startCycle();
        endCycle();
        if (op === 'noop') return;

        startCycle();
        endOpCycle(V);
    });

    return sum(strengths.map(s => s.strenght));
}

function day10B(file) {
    const instructions = getInputData(file);

    const LIT = '#';
    const DARK = '.';
    const CRT = [...new Array(6)].map(() => [...new Array(40)]);
    let x = 1;
    let cycle = 1;

    function printScreen() {
        return CRT.map(line => line.join('')).join('\n');
    }

    function startCycle() {
        const row = Math.floor((cycle - 1) / INTERVAL);
        const col = (cycle - 1) % INTERVAL;
        if ([x - 1, x, x + 1].includes(col)) {
            CRT[row][col] = LIT;
        } else {
            CRT[row][col] = DARK;
        }
    }

    function endCycle() {
        cycle++;
    }

    function endOpCycle(v) {
        x = x + v;
        cycle++;
    }

    instructions.forEach(instruction => {
        const [op, rawValue] = instruction.split(' ');
        const v = Number(rawValue) || null;

        startCycle();
        endCycle();
        if (op === 'noop') return;

        startCycle();
        endOpCycle(v);
    });

    return printScreen();
}

module.exports = {
    day10A,
    day10B,
};
