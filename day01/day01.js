// --- Day 1: Calorie Counting ---

const { getInputData, sum, max } = require('../utils');

function computeElves(data) {
    const elves = [];
    const elfCalories = {
        food: [],
        sum: 0,
    };
    data.forEach(line => {
        if (line === '') {
            elfCalories.sum = sum(elfCalories.food);
            elves.push({ ...elfCalories });

            elfCalories.food = [];
            elfCalories.sum = 0;
        } else {
            elfCalories.food.push(Number(line));
        }
    });
    return elves;
}

function day01A(file) {
    const data = getInputData(file);
    data.push('');

    const elves = computeElves(data);

    const maxCalories = elves.reduce(
        (acc, current) => max([acc, current.sum]),
        0
    );

    return maxCalories;
}

function day01B(file) {
    const data = getInputData(file);
    data.push('');

    const elves = computeElves(data);
    const calories = elves.map(elf => elf.sum);

    const top3 = calories.sort((a, b) => b - a).slice(0, 3);
    return sum(top3);
}

module.exports = {
    day01A,
    day01B,
};
