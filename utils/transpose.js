function transpose (matrix) {
    return matrix.reduce((prev, next) => next.map((_, i) =>
        (prev[i] || []).concat(next[i])
    ), []);
}

module.exports = {
    transpose,
};
