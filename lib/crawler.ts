import fs from 'fs';
import Debug from 'debug';
import puppeteer from 'puppeteer';

const debug = Debug('@ergatejs/crawler');

export interface LoadOption {
  url: string;
  script: string;
  proxy?: string;

  // loaddata
  loaddata?: {
    target: string;
  };

  // screenshot
  screenshot?: {
    selector?: string;
    asset: string;
    target: string;
  };

  // api
  api?: any;
}

export const load = async (options: LoadOption) => {
  const { url, script, proxy, screenshot, loaddata, api } = options;

  // launch args
  const args = [
    '--start-fullscree',
  ];

  if (proxy) {
    args.push(proxy);
  }
  
  const browser = await puppeteer.launch({
    args,
    timeout: 0,
    headless: true,
    // devtools: true,
    defaultViewport: {
      width: 1366,
      height: 768,
    },
  });

  try {

    let result;

    const page = await browser.newPage();

    page.on('response', async response => {
      const url = response.url();
      debug('===response.url', url);

      if (url === api) {
        result = await response.json();
      }
    });

    await page.goto(url, {
      waitUntil: 'load',      
      timeout: 0,
    });

    // add custom script
    const content = fs.readFileSync(script).toString();
    debug('===content', content);

    await page.addScriptTag({
      content,
    });

    // run custom script
    const execHandle = await page.evaluateHandle(() => (window as any).execStrategy);
    const dataHandle = await page.evaluateHandle(exec => exec(), execHandle);
    const data = await dataHandle.jsonValue();

    debug('===data', data);

    await execHandle.dispose();
    await dataHandle.dispose();

    // screenshot
    if (screenshot) {
      const selector = screenshot.selector ? await page.$(screenshot.selector) : page;

      if (!selector) return;

      await selector.screenshot({
        path: screenshot.target,
        // fullPage: !(!!screenshot.selector),
      });
    }

    // loaddata
    if (loaddata) {
      if (loaddata.target) {
        fs.writeFileSync(loaddata.target, JSON.stringify(data, null, 2));
      }
    }

    await browser.close();

    return result || data;
  } catch (error) {
    debug('crawler.load.error', error);
    await browser.close();
    return [];
  }
};
