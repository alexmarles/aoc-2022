const fs = require('fs');
const path = require('path');

function getInputData (file) {
    return fs.readFileSync(path.join(__dirname, '..', file))
            .toString()
            .trim()
            .split('\n');
}

module.exports = {
    getInputData,
};
