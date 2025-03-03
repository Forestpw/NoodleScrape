const puppeteer = require('puppeteer');
const { overrideConsoleLog } = require('./utils/logger.js');
const { redditLogin } = require('./modules/login.js');
const sleep = require('./utils/helpers.js');
require('dotenv').config();

async function main() {
    overrideConsoleLog();

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1080, height: 1024});

    await redditLogin(page);
    await sleep(2500);
    console.info('Successfully logged in!');

    await browser.close();
}

main();