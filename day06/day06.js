// --- Day 6: Tuning Trouble ---

const { getInputData } = require('../utils');

function detectPositionOfPatternOf(stream, size) {
    const packet = [];
    const acc = [];
    let found = false;
    let i = 0;
    while (i < stream.length && !found) {
        const c = stream[i];
        if (packet.includes(c)) {
            acc.push.apply(acc, packet.splice(0, packet.indexOf(c) + 1));
            packet.push(c);
        } else {
            packet.push(c);
            if (packet.length === size) {
                found = true;
                acc.push.apply(acc, packet);
            }
        }
        i++;
    }

    return acc.length;
}

function day06A(file) {
    const data = getInputData(file)[0];

    const stream = data.split('');

    const position = detectPositionOfPatternOf(stream, 4);

    return position;
}

module.exports = {
    day06A,
};
