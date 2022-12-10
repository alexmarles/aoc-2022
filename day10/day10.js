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

module.exports = {
    day10A,
};
