// --- Day 16: Proboscidea Volcanium ---

const { getInputData, max, sum } = require('../utils');
const dijkstra = require('dijkstrajs');

function parseValves(data) {
    const valves = {};
    data.forEach(l => {
        const [valve, _] = l.split(';');
        const [_v, name, _h, _f, r] = valve.split(' ');
        const rate = Number(r.split('=')[1]);
        const tunnels = l.split(/valve[s]*\s/)[1].split(', ');

        valves[name] = {
            rate,
            tunnels,
        };
    });

    return valves;
}

function buildGraph(valves) {
    const graph = {};
    for (const name of valves.keys()) {
        graph[name] = {};
        valves.get(name).tunnels.forEach(t => {
            graph[name][t] = 2;
        });
    }

    return graph;
}

function moveTo(valve, all, currentRate, available, time, path) {
    time--;
    if (time === 0)
        return {
            path,
            currentRate,
        };

    if (available.length === 0)
        return {
            path,
            currentRate,
        };
}

function day16A(file) {
    const data = getInputData(file);
    const valves = parseValves(data);
    const graph = buildGraph(valves);
    const available = Object.keys(valves);
    const rate = moveTo('AA', valves, visited, 30);
    console.log({ rate, time });

    return data;
}

module.exports = {
    day16A,
};
