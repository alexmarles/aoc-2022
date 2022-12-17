// --- Day 15: Beacon Exclusion Zone ---

const { getInputData } = require('../utils');

function getTaxicabDistance({ p, q }) {
    return Math.abs(p.x - q.x) + Math.abs(p.y - q.y);
}

function parseSensorsFrom(data) {
    return data.map(line => {
        const sensor = {};
        const beacon = {};
        const [_s, _a, x1, y1, _c, _b, _i, _at, x2, y2] = line.split(' ');
        sensor.x = Number(x1.split('=')[1].replace(',', ''));
        sensor.y = Number(y1.split('=')[1].replace(':', ''));
        beacon.x = Number(x2.split('=')[1].replace(',', ''));
        beacon.y = Number(y2.split('=')[1]);
        sensor.radius = getTaxicabDistance({ p: sensor, q: beacon });
        sensor.beacon = beacon;

        return sensor;
    });
}

function mergeIntervals(intervals) {
    const mergedIntervals = [[...intervals[0]]];
    for (let i = 0; i < intervals.length; i++) {
        const current = intervals[i];
        const previous = mergedIntervals[mergedIntervals.length - 1];
        if (current[0] - 1 <= previous[1]) {
            previous[1] = Math.max(previous[1], current[1]);
        } else {
            mergedIntervals.push(current);
        }
    }

    return mergedIntervals;
}

function getOccupiedPositionsInRow(sensors, rowToCheck) {
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
                if (leftX <= rightX) intervals.push([leftX, rightX]);
            }
        });

    const mergedIntervals = mergeIntervals(
        intervals.sort((a, b) => a[0] - b[0])
    );

    return mergedIntervals;
}

function day15A(file, rowToCheck = 10) {
    const data = getInputData(file);
    const sensors = parseSensorsFrom(data);
    const intervals = getOccupiedPositionsInRow(sensors, rowToCheck);

    return intervals.map(i => i[1] - i[0]).reduce((acc, curr) => acc + curr, 0);
}

function day15B(file, maxCoord = 20) {
    const data = getInputData(file);
    const sensors = parseSensorsFrom(data);
    const freePositions = [];
    for (let y = 0; y < maxCoord; y++) {
        const intervals = getOccupiedPositionsInRow(sensors, y);
        let x = 0;
        while (x <= maxCoord) {
            intervals.forEach(([left, right]) => {
                while (x < left) {
                    freePositions.push([x, y]);
                    x++;
                }
                x = right + 1;
            });
        }
        while (x <= maxCoord) {
            freePositions.push([x, y]);
            x++;
        }
    }
    const [x, y] = freePositions[0];
    const frequency = x * 4000000 + y;

    return frequency;
}

module.exports = {
    day15A,
    day15B,
};
