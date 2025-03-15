import { sleep } from '../utils/helpers';
import { randomNumber } from '../utils/helpers';

export async function redditLogin(page: any) {
    const username = process.env.REDDIT_USERNAME as string;
    const password = process.env.REDDIT_PASSWORD as string;

    await page.goto('https://www.reddit.com/login/', {waitUntil: 'domcontentloaded'});
    console.log('Successfully reached reddit');

    // Puppeeteer is unable to see the input for username / password so key presses are used to navigate and enter login info.
    for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab');
        await sleep(600);
    }
    
    for (let char of username) {
        await page.keyboard.press(char);
        await sleep(randomNumber(150, 250));
    }

    await page.keyboard.press('Tab');

    for (let char of password) {
        await page.keyboard.press(char);
        await sleep(randomNumber(150, 250));
    }

    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    console.log('Successfully logged in to Reddit');
}