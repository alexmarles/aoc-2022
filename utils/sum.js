function sum (arr) {
    return arr.reduce((total, current) => total + current, 0);
}

module.exports = {
    sum,
};
