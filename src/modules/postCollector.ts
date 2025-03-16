import {sleep} from "../utils/helpers";

export async function postCollector(page: any): Promise<string[]>  {
    let results: string[] = [];
    let targetCount = 10;
    let previousHeight;
    const keywords = ['noodle', 'ramen', 'spaghetti', 'orzo', 'ravioli', 'linguine', 'macaroni',
                     'fettuccine', 'penne', 'ziti', 'lasagna', "mac and cheese", 'rigatoni', 'pasta'];

    await page.goto('https://www.reddit.com/r/FoodPorn/new/', {waitUntil: 'domcontentloaded'});
    console.log('Now browsing r/FoodPorn');

    await page.waitForSelector('shreddit-post');

    while (results.length < targetCount) {
        const permalinks = await page.evaluate(() => {
            const posts = Array.from(document.querySelectorAll('shreddit-post'));
            return posts.map(post => post.getAttribute('permalink'));
        });

        permalinks.forEach((permalink) => {
            if (keywords.some(noodle => permalink.includes(noodle))) {
                if (!results.includes(permalink)) {
                    results.push(permalink);
                }
            }
        });

        if (results.length >= targetCount ) {
            break;
        }

        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');

        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`, { timeout: 5000 }).catch(() => {
            console.log('No more content loaded.');
            return;
        });

        await sleep(1000);
    }

    return results;
}