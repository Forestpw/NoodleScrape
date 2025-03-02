const puppeteer = require('puppeteer');
const { overrideConsoleLog } = require('./utils/logger.js');

async function main() {
    await overrideConsoleLog();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.php.net/docs.php');
    await page.setViewport({width: 1080, height: 1024});
    await page.locator('.navbar__search-button').click();
    await page.locator('.search-modal__input').fill('string');
    await page.waitForSelector('.search-modal__result-content');
    await page.locator('#search-modal__result-name-0').click();

    const textSelector = await page.locator('text/String Oper').waitHandle();
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    console.log('The title of the blog post is: ' + fullTitle);

    await browser.close();
}

main();