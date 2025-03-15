import fs from 'fs';
import util from 'util';

const logfile = fs.createWriteStream('../console.log');

export function overrideConsoleLog() {
    console.log = function(message) {
        logfile.write(util.format(message) + '\n');
        process.stdout.write(util.format(message) + '\n');
    };
}