import { sleep } from '../utils/helpers';
import { randomNumber } from '../utils/helpers';

export async function redditLogin(page: any) {
    const username = process.env.REDDIT_USERNAME as string;
    const password = process.env.REDDIT_PASSWORD as string;

    await page.goto('https://www.reddit.com/login/', {waitUntil: 'domcontentloaded'});
    console.log('Successfully reached reddit');

    // Locate username input within shadow dom and enter username.
    let shadowHost = await page.waitForSelector('#login-username');
    let shadowRoot = await page.evaluateHandle((element) => element.shadowRoot, shadowHost);
    const usernameInput = await shadowRoot.$('input[name="username"]');
    await usernameInput.type(username);
    await sleep(1000);

    // Locate password input within shadow dom and enter password.
    shadowHost = await page.waitForSelector('#login-password');
    shadowRoot = await page.evaluateHandle((element) => element.shadowRoot, shadowHost);
    const passwordInput = await shadowRoot.$('input[name="password"]');
    await passwordInput.type(password);
    await sleep(1000);

    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    console.log('Successfully logged in to Reddit');
}