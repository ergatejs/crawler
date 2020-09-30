import Debug from 'debug';
import puppeteer from 'puppeteer';
const debug = Debug('etf-crawler');

type MediaType = 'screen' | 'print';

export interface Crawler {
  url: string;
  targetPath: string;
  targetAsset: string;

  targetSelector?: string;
  trashSelectors?: any;

  proxy?: string;
  mediaType?: MediaType | null;
}

export const screenshot = async (options: Crawler) => {
  const {
    url,
    targetPath,
    trashSelectors,
    targetSelector,
    proxy,
    mediaType,
  } = options;

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
    // headless: false,
    defaultViewport: {
      width: 1366,
      height: 768,
    },
  });

  try {
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: 'load',
      timeout: 0,
    });

    if (mediaType) {
      await page.emulateMediaType(mediaType);
    }

    if (trashSelectors) {

      if (typeof trashSelectors === 'string') {
        await page.evaluate(sel => {
          const elements = document.querySelectorAll(sel);
          for (let i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
          }
        }, trashSelectors);
      }

      if (Array.isArray(trashSelectors)) {
        for (const item of trashSelectors) {
          await page.evaluate(sel => {
            const elements = document.querySelectorAll(sel);
            for (let i = 0; i < elements.length; i++) {
              elements[i].parentNode.removeChild(elements[i]);
            }
          }, item);
        }
      }
    }

    if (targetSelector) {
      const selector = await page.$(targetSelector);

      if (!selector) return;

      await selector.screenshot({
        path: targetPath,
      });

      debug('screenshot.done');
      await browser.close();
      return;
    }

    await page.screenshot({
      path: targetPath,
      fullPage: true,
    });

    debug('screenshot.done');
    await browser.close();

  } catch (error) {
    debug('screenshot.error', error);
    await browser.close();
  }
};
