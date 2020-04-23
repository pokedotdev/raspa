import puppeteer from 'puppeteer';
import UserAgent from 'user-agents';
import pretty from 'pretty';
import clc from 'cli-color';
import isUrl from 'is-url';
import path from 'path'

const Raspa = (URL, config) => {
  if (!isUrl(URL)) {
    console.log(`${clc.redBright.bold('[Raspa]')} ${clc.yellowBright('The url is not valid! ⚠️')}`);
    return
  }

  console.log(`${clc.greenBright('[Raspa]')} ${clc.yellowBright('loading page ⏳')}`);

  const viewConfig = config ? config : {
    width: 1280,
    height: 720,
    deviceScaleFactor: 1
  };

  return (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport(viewConfig);

    // deny loading images, styles, fonts
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.setUserAgent(new UserAgent().toString())
    await page.goto(URL, { waitUntil: 'networkidle2' });
    // await page.screenshot({ path: path.resolve(__dirname, '../dist/screenshot.png') });

    // get HTML content and set a good format 
    const prettyHTML = pretty(await page.evaluate(() => document.documentElement.outerHTML));

    await page.close();
    await browser.close();

    console.log(`${clc.greenBright('[Raspa]')} ${clc.yellowBright('content obtained! 👍')}`);

    return prettyHTML;
  })();
}

export default Raspa;