const fs = require('fs');
const util = require('util');
const logfile = fs.createWriteStream('console.log');

function overrideConsoleLog() {
    console.log = function(message) {
        logfile.write(util.format(message) + '\n');
        process.stdout.write(util.format(message) + '\n');
    };
}

module.exports = {overrideConsoleLog};