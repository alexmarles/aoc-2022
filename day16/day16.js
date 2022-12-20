// --- Day 16: Proboscidea Volcanium ---

const { getInputData } = require('../utils');

function parseValves(data) {
    const valves = {};
    data.forEach(l => {
        const [valve, _] = l.split(';');
        const [_v, name, _h, _f, r] = valve.split(' ');
        const flow = Number(r.split('=')[1]);
        const tunnels = l.split(/valve[s]*\s/)[1].split(', ');

        valves[name] = {
            flow,
            tunnels,
        };
    });

    return valves;
}

function getDistances(map) {
    const dists = {};
    const nonEmpty = [];

    for (let valve of Object.keys(map)) {
        if (valve !== 'AA' && !map[valve].flow) continue;

        if (valve !== 'AA') nonEmpty.push(valve);

        dists[valve] = { [valve]: 0, AA: 0 };
        const visited = new Set([valve]);
        const queue = [[0, valve]];

        while (queue.length) {
            const [distance, position] = queue.shift();
            for (let neighbour of map[position].tunnels) {
                if (visited.has(neighbour)) continue;

                visited.add(neighbour);
                if (map[neighbour].flow) dists[valve][neighbour] = distance + 1;
                queue.push([distance + 1, neighbour]);
            }
        }

        delete dists[valve][valve];
        if (valve !== 'AA') delete dists[valve]['AA'];
    }

    return [dists, nonEmpty];
}

function calculateFlowRate(time, valve, map, dists, indices, bitmask, cache) {
    const key = [time, valve, bitmask].join();
    if (cache.has(key)) return cache.get(key);

    let maxRate = 0;
    for (let neighbour of Object.keys(dists[valve])) {
        const bit = 1 << indices[neighbour];
        if (bitmask & bit) continue;
        const remainingTime = time - (dists[valve][neighbour] + 1);
        if (remainingTime <= 0) continue;

        const flow = map[neighbour].flow * remainingTime;
        maxRate = Math.max(
            maxRate,
            calculateFlowRate(
                remainingTime,
                neighbour,
                map,
                dists,
                indices,
                bitmask | bit,
                cache
            ) + flow
        );
    }

    cache.set(key, maxRate);
    return maxRate;
}

function day16A(file) {
    const data = getInputData(file);
    const map = parseValves(data);
    const [dists, nonEmpty] = getDistances(map);
    const indices = {};
    nonEmpty.forEach((valve, i) => {
        indices[valve] = i;
    });
    const totalFlow = calculateFlowRate(
        30,
        'AA',
        map,
        dists,
        indices,
        0,
        new Map()
    );

    return totalFlow;
}

module.exports = {
    day16A,
};
