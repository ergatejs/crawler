import Debug from 'debug';
import puppeteer from 'puppeteer';

const debug = Debug('etf-crawler');

export type MediaType = "screen" | "print";

interface ScreenshotOptions {
  targetUrl: string;
  targetPath: string;
  mediaType?: MediaType | null;
  targetSelector?: string;
  removeSelector?: string;  
}

export const screenshot = async (options: ScreenshotOptions) => {
  const { targetUrl, targetSelector, targetPath, removeSelector, mediaType } = options;

  const browser = await puppeteer.launch({
    headless: true,
    timeout: 0,    
    defaultViewport: {
      width: 1366,
      height: 768,
    },
    args: [
      // '--proxy-server=http://127.0.0.1:1087',
      '--start-fullscree',
    ],
  });

  try {    
    const page = await browser.newPage();

    await page.goto(targetUrl, {
      waitUntil: 'load',
      timeout: 0,
    });

    if(mediaType) {
      await page.emulateMediaType(mediaType);
    }
    
    if (!!removeSelector) {
      await page.evaluate(sel => {
        const elements = document.querySelectorAll(sel);
        for (let i = 0; i < elements.length; i++) {
          elements[i].parentNode.removeChild(elements[i]);
        }
      }, removeSelector);
    }

    if (!!targetSelector) {
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
