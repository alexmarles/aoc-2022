const {
    getInputData,
    getInputDataInChunks,
    getRawInputData,
} = require('./getInputData');
const { log } = require('./log');
const { max } = require('./max');
const { min } = require('./min');
const { sum } = require('./sum');
const { toDecimal } = require('./toDecimal');
const { transpose } = require('./transpose');

module.exports = {
    getInputData,
    getInputDataInChunks,
    getRawInputData,
    log,
    max,
    min,
    sum,
    toDecimal,
    transpose,
};
