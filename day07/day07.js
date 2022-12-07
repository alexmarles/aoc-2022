// --- Day 7: No Space Left On Device ---

const { getInputData } = require('../utils');

function parseFileSystem(data) {
    const fileSystem = {
        '/': {
            parent: '',
            children: [],
            size: 0,
        },
    };
    let current = '';
    data.forEach((line, i) => {
        if (line[0] === '$') {
            const [_, command, dir] = line.split(' ');

            if (command === 'cd') {
                if (dir === '..') {
                    current = fileSystem[current].parent;
                    parent = fileSystem[current].parent;
                } else {
                    parent = current;
                    if (current === '') {
                        current = dir;
                    } else if (current === '/') {
                        current = `/${dir}`;
                    } else {
                        current = `${current}/${dir}`;
                    }
                }
            }

            return;
        }

        const [typeOrSize, name] = line.split(' ');
        const path = current === '/' ? `/${name}` : `${current}/${name}`;
        fileSystem[current].children.push(path);
        if (typeOrSize === 'dir') {
            fileSystem[path] = {
                parent: current,
                children: [],
                size: 0,
            };
        } else {
            fileSystem[path] = {
                parent: current,
                size: Number(typeOrSize),
            };
        }
    });

    function calculateSizesOf(current) {
        if (
            fileSystem[current].children &&
            fileSystem[current].children.length > 0
        ) {
            const size = fileSystem[current].children.reduce(
                (acc, child) => acc + calculateSizesOf(child),
                fileSystem[current].size
            );
            fileSystem[current].size = size;

            return size;
        }

        return fileSystem[current].size;
    }

    calculateSizesOf('/');

    return fileSystem;
}

function day07A(file) {
    const data = getInputData(file);
    const fileSystem = parseFileSystem(data);

    const totalSizes = Object.values(fileSystem)
        .map(f => {
            if (f.children) return f.size;
        })
        .filter(size => size <= 100000)
        .reduce((acc, size) => acc + size, 0);

    return totalSizes;
}

function day07B(file) {
    const TOTAL_SPACE = 70000000;
    const REQUIRED_SPACE = 30000000;
    const data = getInputData(file);
    const fileSystem = parseFileSystem(data);
    const usedSpace = fileSystem['/'].size;
    const freeSpace = TOTAL_SPACE - usedSpace;
    const needToDelete = REQUIRED_SPACE - freeSpace;

    const bigEnough = Math.min.apply(
        Math,
        Object.values(fileSystem)
            .map(f => {
                if (f.children) return f.size;
            })
            .filter(size => size > needToDelete)
    );

    return bigEnough;
}

module.exports = {
    day07A,
    day07B,
};
