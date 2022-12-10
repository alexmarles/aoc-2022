// --- Day 10: Cathode-Ray Tube ---

const { getInputData, sum } = require('../utils');

function runDeviceWith(instructions, whatDoYouWant = 'strengts') {
    const INTERVAL = 40;
    const LIT = '#';
    const DARK = '.';
    const CRT = [...new Array(6)].map(() => [...new Array(40)]);
    const STRENGTHS = [];

    let x = 1;
    let cycle = 1;

    function printScreen() {
        return CRT.map(line => line.join('')).join('\n');
    }

    function startCycle() {
        if (cycle === 20 || (cycle + 20) % INTERVAL === 0)
            STRENGTHS.push({ strenght: cycle * x, cycle });

        const row = Math.floor((cycle - 1) / INTERVAL);
        const col = (cycle - 1) % INTERVAL;
        if ([x - 1, x, x + 1].includes(col)) CRT[row][col] = LIT;
        else CRT[row][col] = DARK;
    }

    function endCycle(v) {
        x = x + v;
        cycle++;
    }

    instructions.forEach(instruction => {
        const [op, value] = instruction.split(' ');
        const v = Number(value) || null;

        startCycle();
        endCycle(0);
        if (op === 'noop') return;

        startCycle();
        endCycle(v);
    });

    if (whatDoYouWant === 'strengths')
        return sum(STRENGTHS.map(s => s.strenght));
    if (whatDoYouWant === 'CRT') return printScreen();
}

function day10A(file) {
    const instructions = getInputData(file);
    return runDeviceWith(instructions, 'strengths');
}

function day10B(file) {
    const instructions = getInputData(file);
    return runDeviceWith(instructions, 'CRT');
}

module.exports = {
    day10A,
    day10B,
};
