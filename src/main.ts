import puppeteer from 'puppeteer';
import { overrideConsoleLog } from './utils/logger';
import { redditLogin } from './modules/login';
import { sleep } from './utils/helpers';
require('dotenv').config();

async function main() {
    overrideConsoleLog();

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1080, height: 1024});

    await redditLogin(page);
    await sleep(2500);

    await browser.close();
}

main();