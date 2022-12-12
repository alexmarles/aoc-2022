// --- Day 12: Hill Climbing Algorithm ---

const { getInputData } = require('../utils');
const dijkstra = require('dijkstrajs');

function getAllTrails(input) {
    const heightMap = input.map(r =>
        r
            .replace('S', 'a')
            .replace('E', 'z')
            .split('')
            .map(p => p.charCodeAt() - 96)
    );
    const end = {
        x: input.join('').indexOf('E') % input[0].length,
        y: Math.floor(input.join('').indexOf('E') / input[0].length),
    };
    const starts = [];

    const graph = {};
    heightMap.forEach((row, y) => {
        row.forEach((col, x) => {
            if (col === 1) starts.push({ x, y });

            const coords = `${x}_${y}`;
            graph[coords] = {};
            if (heightMap[y - 1]) {
                const newCoords = `${x}_${y - 1}`;
                const diff = heightMap[y - 1][x] - col;
                if (diff <= 1) graph[coords][newCoords] = diff + 1;
            }
            if (heightMap[y + 1]) {
                const newCoords = `${x}_${y + 1}`;
                const diff = heightMap[y + 1][x] - col;
                if (diff <= 1) graph[coords][newCoords] = diff + 1;
            }
            if (heightMap[y][x - 1]) {
                const newCoords = `${x - 1}_${y}`;
                const diff = heightMap[y][x - 1] - col;
                if (diff <= 1) graph[coords][newCoords] = diff + 1;
            }
            if (heightMap[y][x + 1]) {
                const newCoords = `${x + 1}_${y}`;
                const diff = heightMap[y][x + 1] - col;
                if (diff <= 1) graph[coords][newCoords] = diff + 1;
            }
        });
    });

    const trails = new Map();
    starts.forEach(start => {
        try {
            const path = dijkstra.find_path(
                graph,
                `${start.x}_${start.y}`,
                `${end.x}_${end.y}`
            );
            trails.set(`${start.x}_${start.y}`, path.length - 1);
        } catch {
            trails.set(`${start.x}_${start.y}`, Number.MAX_VALUE);
        }
    });

    return trails;
}

function day12A(file) {
    const data = getInputData(file);
    const trails = getAllTrails(data);
    const start = {
        x: data.join('').indexOf('S') % data[0].length,
        y: Math.floor(data.join('').indexOf('S') / data[0].length),
    };

    return trails.get(`${start.x}_${start.y}`);
}

function day12B(file) {
    const data = getInputData(file);
    const trails = getAllTrails(data);

    return Math.min.apply(Math, [...trails.values()]);
}

module.exports = {
    day12A,
    day12B,
};
