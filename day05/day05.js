// --- Day 5: Supply Stacks ---

const { getRawInputData } = require('../utils');

function day05A(file) {
    const data = getRawInputData(file);
    const groundLvl = data.indexOf('') - 1;
    const ground = data[groundLvl].split('');
    const stacks = [];
    ground.forEach((p, i) => {
        if (p === ' ') return;
        stacks.push({
            index: i,
            crates: [],
        });
    });
    data.slice(0, groundLvl).forEach(level => {
        level.split('').forEach((pos, i) => {
            if (pos === ' ' || pos === '[' || pos === ']') return;
            const stack = stacks.filter(s => s.index === i)[0];
            const stackIndex = stacks.indexOf(stack);

            stacks[stackIndex].crates.push(pos);
        });
    });
    stacks.forEach((stack, i) => {
        stacks[i].crates = stack.crates.reverse();
    });
    // We've got the stacks!

    const moves = [];
    data.slice(groundLvl + 1, data.length).forEach(move => {
        if (move.trim() === '') return;
        moves.push({
            amount: Number(move.match(/move\s(\d*)/)[1]),
            from: Number(move.match(/from\s(\d*)/)[1]),
            to: Number(move.match(/to\s(\d*)/)[1]),
        });
    });

    moves.forEach(move => {
        while (move.amount-- > 0) {
            const element = stacks[move.from - 1].crates.pop();
            stacks[move.to - 1].crates.push(element);
        }
    });

    const result = stacks.reduce((acc, stack) => acc + stack.crates.pop(), '');

    return result;
}

function day05B(file) {
    const data = getRawInputData(file);
    const groundLvl = data.indexOf('') - 1;
    const ground = data[groundLvl].split('');
    const stacks = [];
    ground.forEach((p, i) => {
        if (p === ' ') return;
        stacks.push({
            index: i,
            crates: [],
        });
    });
    data.slice(0, groundLvl).forEach(level => {
        level.split('').forEach((pos, i) => {
            if (pos === ' ' || pos === '[' || pos === ']') return;
            const stack = stacks.filter(s => s.index === i)[0];
            const stackIndex = stacks.indexOf(stack);

            stacks[stackIndex].crates.push(pos);
        });
    });
    stacks.forEach((stack, i) => {
        stacks[i].crates = stack.crates.reverse();
    });
    // We've got the stacks!

    const moves = [];
    data.slice(groundLvl + 1, data.length).forEach(move => {
        if (move.trim() === '') return;
        moves.push({
            amount: Number(move.match(/move\s(\d*)/)[1]),
            from: Number(move.match(/from\s(\d*)/)[1]),
            to: Number(move.match(/to\s(\d*)/)[1]),
        });
    });

    moves.forEach(move => {
        const indexFrom = stacks[move.from - 1].crates.length - move.amount;
        const elements = stacks[move.from - 1].crates.splice(
            indexFrom,
            move.amount
        );
        stacks[move.to - 1].crates.push.apply(
            stacks[move.to - 1].crates,
            elements
        );
    });

    const result = stacks.reduce((acc, stack) => acc + stack.crates.pop(), '');

    return result;
}

module.exports = {
    day05A,
    day05B,
};
