// --- Day 3: Rucksack Reorganization ---

const { getInputData, sum } = require('../utils');

const code_Z = 'Z'.charCodeAt();
const lowerCaseOffset = 'z'.charCodeAt() - 26;
const upperCaseOffset = 'Z'.charCodeAt() - 52;

function day03A(file) {
    const data = getInputData(file);

    const rucksacks = data.map(sack => {
        return [
            sack.slice(0, sack.length / 2),
            sack.slice(sack.length / 2, sack.length),
        ];
    });
    const commons = rucksacks.map(([c1, c2]) => {
        let common;
        c1.split('').forEach(item => {
            if (c2.indexOf(item) > -1) common = item;
        });
        return common;
    });
    const values = commons.map(item => {
        p = item.charCodeAt();
        return p > code_Z ? p - lowerCaseOffset : p - upperCaseOffset;
    });
    return sum(values);
}

function day03B(file) {
    const data = getInputData(file);

    return data;
}

module.exports = {
    day03A,
    day03B,
};
