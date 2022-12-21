// --- Day 20: Grove Positioning System ---

const { getInputData } = require('../utils');

function createDLL(data, decryptionKey = 1) {
    const list = data.map(n => ({
        v: Number(n) * decryptionKey,
        prev: null,
        next: null,
    }));
    for (let i = 0; i < list.length; i++) {
        list[i].next = list.at((i + 1) % list.length);
        list[i].prev = list.at((i - 1) % list.length);
    }

    return list;
}

function circleMix(list, times = 1) {
    let zero;
    for (let _ = 0; _ < times; _++) {
        for (let node of list) {
            if (node.v === 0) {
                zero = node;
                continue;
            }

            const mod = list.length - 1;
            let target = node;
            if (node.v > 0) {
                for (let _ = 0; _ < node.v % mod; _++) target = target.next;
                if (target === node) continue;

                node.next.prev = node.prev;
                node.prev.next = node.next;
                target.next.prev = node;
                node.next = target.next;
                target.next = node;
                node.prev = target;
            } else {
                for (let _ = 0; _ > node.v % mod; _--) target = target.prev;
                if (target === node) continue;

                node.prev.next = node.next;
                node.next.prev = node.prev;
                target.prev.next = node;
                node.prev = target.prev;
                target.prev = node;
                node.next = target;
            }
        }
    }

    return zero;
}

function day20A(file) {
    const data = getInputData(file);
    const list = createDLL(data);
    let zeroRef = circleMix(list);

    let total = 0;
    for (let _ = 0; _ < 3; _++) {
        for (let _ = 0; _ < 1000; _++) {
            zeroRef = zeroRef.next;
        }
        total += zeroRef.v;
    }

    return total;
}

function day20B(file) {
    const data = getInputData(file);
    const decryptionKey = 811589153;
    const list = createDLL(data, decryptionKey);
    let zeroRef = circleMix(list, 10);

    let total = 0;
    for (let _ = 0; _ < 3; _++) {
        for (let _ = 0; _ < 1000; _++) {
            zeroRef = zeroRef.next;
        }
        total += zeroRef.v;
    }

    return total;
}

module.exports = {
    day20A,
    day20B,
};
