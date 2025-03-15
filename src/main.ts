import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { overrideConsoleLog } from './utils/logger';
import { redditLogin } from './modules/login';
import { postCollector } from './modules/postCollector';
import { sleep } from './utils/helpers';
require('dotenv').config();

async function main() {
    puppeteer.use(StealthPlugin());
    overrideConsoleLog();

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1080, height: 1024});

    await redditLogin(page);
    await sleep(2500);
    await postCollector(page);

    await browser.close();
}

main();