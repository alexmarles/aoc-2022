// --- Day 12: Hill Climbing Algorithm ---

const { getInputData } = require('../utils');
const dijkstra = require('dijkstrajs');

function day12A(file) {
    const data = getInputData(file);
    const heightMap = data.map(r => r.split('').map(p => p.charCodeAt() - 96));
    let start = {};
    let end = {};
    heightMap.forEach((row, y) => {
        row.forEach((col, x) => {
            if (col === 'S'.charCodeAt() - 96) {
                start = { x, y };
                heightMap[y][x] = 'a'.charCodeAt() - 96;
            }
            if (col === 'E'.charCodeAt() - 96) {
                end = { x, y };
                heightMap[y][x] = 'z'.charCodeAt() - 96;
            }
        });
    });
    const graph = {};
    heightMap.forEach((row, y) => {
        row.forEach((col, x) => {
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
    const path = dijkstra.find_path(
        graph,
        `${start.x}_${start.y}`,
        `${end.x}_${end.y}`
    );
    return path.length - 1;
}

function day12B(file) {
    const data = getInputData(file);
    const heightMap = data.map(r => r.split('').map(p => p.charCodeAt() - 96));
    const starts = [];
    let end = {};
    heightMap.forEach((row, y) => {
        row.forEach((col, x) => {
            if (col === 1) starts.push({ x, y });
            if (col === 'S'.charCodeAt() - 96) {
                starts.push({ x, y });
                heightMap[y][x] = 'a'.charCodeAt() - 96;
            }
            if (col === 'E'.charCodeAt() - 96) {
                end = { x, y };
                heightMap[y][x] = 'z'.charCodeAt() - 96;
            }
        });
    });
    const graph = {};
    heightMap.forEach((row, y) => {
        row.forEach((col, x) => {
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
    const paths = starts.map(start => {
        try {
            return (
                dijkstra.find_path(
                    graph,
                    `${start.x}_${start.y}`,
                    `${end.x}_${end.y}`
                ).length - 1
            );
        } catch {
            return Number.MAX_VALUE;
        }
    });
    return Math.min.apply(Math, paths);
}

module.exports = {
    day12A,
    day12B,
};
