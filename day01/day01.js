// --- Day 1: Calorie Counting ---

const { getInputData, sum, max } = require('../utils');

function day01A(file) {
    const data = getInputData(file);

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

    const maxCalories = elves.reduce(
        (acc, current) => max([acc, current.sum]),
        0
    );

    return maxCalories;
}

module.exports = {
    day01A,
};
