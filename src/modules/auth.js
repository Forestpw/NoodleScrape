const puppeteer = require('puppeteer');
const sleep = require('./../utils/helpers.js');

async function redditLogin(page) {
    await page.goto('https://www.reddit.com/login/', {waitUntil: 'domcontentloaded'});
    console.info('Successfully reached reddit');

    // Puppeeteer is unable to see the input for username / password so key presses are used to navigate and enter login info.
    for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab');
        await sleep(400);
    }
    
    for (let char of process.env.REDDIT_USERNAME) {
        await page.keyboard.press(char);
        await sleep(200);
    }

    await page.keyboard.press('Tab');

    for (let char of process.env.REDDIT_PASSWORD) {
        await page.keyboard.press(char);
        await sleep(200);
    }

    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
}

module.exports = {redditLogin};