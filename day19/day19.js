// --- Day 19: Not Enough Minerals ---

const { getInputData } = require('../utils');

const MINUTES = 24;

function collectGeodes(data, initialTime) {
    const blueprints = data.map(line => {
        const [_, bp] = line.split(':');
        const steps = bp.split('.');
        const maxSpend = {
            ore: 0,
            clay: 0,
            obsidian: 0,
        };
        const ore = {
            ore: Number(steps[0].match(/\s(\d+)\sore$/)[1]),
        };
        maxSpend.ore = Math.max(maxSpend.ore, ore.ore);
        const clay = {
            ore: Number(steps[1].match(/\s(\d+)\sore$/)[1]),
        };
        maxSpend.ore = Math.max(maxSpend.ore, clay.ore);
        const obsidian = {
            ore: Number(steps[2].match(/\s(\d+)\sore/)[1]),
            clay: Number(steps[2].match(/\s(\d+)\sclay$/)[1]),
        };
        maxSpend.ore = Math.max(maxSpend.ore, obsidian.ore);
        maxSpend.clay = Math.max(maxSpend.clay, obsidian.clay);
        const geode = {
            ore: Number(steps[3].match(/\s(\d+)\sore/)[1]),
            obsidian: Number(steps[3].match(/\s(\d+)\sobsidian$/)[1]),
        };
        maxSpend.ore = Math.max(maxSpend.ore, geode.ore);
        maxSpend.obsidian = Math.max(maxSpend.obsidian, geode.obsidian);

        return {
            ore,
            clay,
            obsidian,
            geode,
            maxSpend,
            openGeodes: 0,
        };
    });

    const initialMaterials = {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geode: 0,
    };
    const initialRobots = {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0,
    };

    function checkScenario(bp, cache, time, robots, materials) {
        if (time === 0) return materials.geode;

        const key = [
            time,
            ...Object.values(robots),
            ...Object.values(materials),
        ].join();
        if (cache[key]) return cache[key];

        let maxGeodes = materials.geode + robots.geode * time;

        for (let type of Object.keys(robots)) {
            if (type !== 'geode' && robots[type] >= bp.maxSpend[type]) continue;

            let wait = 0;
            let canContinue = true;
            for (let [need, amount] of Object.entries(bp[type])) {
                if (robots[need] === 0) {
                    canContinue = false;
                    break;
                }

                const timeToBuild = Math.ceil(
                    (amount - materials[need]) / robots[need]
                );
                wait = Math.max(wait, timeToBuild);
            }
            if (canContinue) {
                const remainingTime = time - wait - 1;
                if (remainingTime <= 0) continue;

                const robots_ = { ...robots };
                const materials_ = { ...materials };
                for (let produced of Object.keys(robots)) {
                    materials_[produced] =
                        materials[produced] + robots[produced] * (wait + 1);
                }
                for (let [need, amount] of Object.entries(bp[type])) {
                    materials_[need] -= amount;
                }
                robots_[type]++;
                for (let toDispose of Object.keys(bp.maxSpend)) {
                    materials_[toDispose] = Math.min(
                        materials_[toDispose],
                        bp.maxSpend[toDispose] * remainingTime
                    );
                }
                maxGeodes = Math.max(
                    maxGeodes,
                    checkScenario(bp, cache, remainingTime, robots_, materials_)
                );
            }
        }

        cache[key] = maxGeodes;
        return maxGeodes;
    }

    const totalGeodes = blueprints.map(bp => {
        return checkScenario(
            bp,
            {},
            initialTime,
            initialRobots,
            initialMaterials
        );
    });

    return totalGeodes;
}

function day19A(file) {
    const data = getInputData(file);
    const totalGeodes = collectGeodes(data, MINUTES);

    return totalGeodes.reduce((acc, curr, i) => acc + curr * (i + 1), 0);
}

function day19B(file) {
    const data = getInputData(file);
    const totalGeodes = collectGeodes(data.slice(0, 3), 32);

    console.log({ totalGeodes });
    return totalGeodes.reduce((acc, curr) => acc * curr, 1);
}

module.exports = {
    day19A,
    day19B,
};
