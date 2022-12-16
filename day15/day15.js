// --- Day 15: Beacon Exclusion Zone ---

const { getInputData } = require('../utils');

function getTaxicabDistance({ p, q }) {
    return Math.abs(p.x - q.x) + Math.abs(p.y - q.y);
}

function day15A(file, rowToCheck = 10) {
    const data = getInputData(file);
    const sensors = data.map(line => {
        const sensor = {};
        const beacon = {};
        const [_s, _a, x1, y1, _c, _b, _i, _at, x2, y2] = line.split(' ');
        sensor.x = Number(x1.split('=')[1].replace(',', ''));
        sensor.y = Number(y1.split('=')[1].replace(':', ''));
        beacon.x = Number(x2.split('=')[1].replace(',', ''));
        beacon.y = Number(y2.split('=')[1]);
        sensor.radius = getTaxicabDistance({ p: sensor, q: beacon });

        return sensor;
    });

    const y = rowToCheck;
    const intervals = [];
    sensors
        .sort((a, b) => a.x - a.radius - (b.x - b.radius))
        .forEach(sensor => {
            const topY = sensor.y - sensor.radius;
            const bottomY = sensor.y + sensor.radius;
            if (y >= topY && y <= bottomY) {
                const span = Math.abs(sensor.y - y);
                const leftX = sensor.x - sensor.radius + span;
                const rightX = sensor.x + sensor.radius - span;
                if (leftX < rightX) intervals.push([leftX, rightX]);
            }
        });
    intervals.sort((a, b) => a[0] - b[0]);
    const mergedIntervals = [intervals[0]];
    for (let i = 0; i < intervals.length; i++) {
        const current = intervals[i];
        const previous = mergedIntervals[mergedIntervals.length - 1];
        if (current[0] <= previous[1]) {
            previous[1] = Math.max(previous[1], current[1]);
        } else {
            mergedIntervals.push(current);
        }
    }
    return mergedIntervals
        .map(i => i[1] - i[0])
        .reduce((acc, curr) => acc + curr, 0);
}

module.exports = {
    day15A,
};