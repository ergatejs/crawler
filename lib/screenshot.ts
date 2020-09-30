import puppeteer from 'puppeteer';

export default async (options: any) => {
  const { targetUrl, targetSelector, targetPath, removeSelector } = options;

  try {
    const browser = await puppeteer.launch({
      headless: false,
      timeout: 0,
      defaultViewport: {
        width: 1366,
        height: 768,
      },
      args: [
        '--proxy-server=http://127.0.0.1:1087',
        '--start-fullscree',
      ],
    });

    const page = await browser.newPage();

    page.once('load', async () => {
      console.log('screenshot.page.load');
    });

    await page.goto(targetUrl, {
      waitUntil: 'load',
      timeout: 0,
    });

    await page.emulateMediaType('print');

    if (removeSelector) {
      await page.evaluate(sel => {
        const elements = document.querySelectorAll(sel);
        for (let i = 0; i < elements.length; i++) {
          elements[i].parentNode.removeChild(elements[i]);
        }
      }, removeSelector);
    }

    if (targetSelector) {
      const selector = await page.$(targetSelector);

      if (!selector) return;

      await selector.screenshot({
        path: targetPath,
      });

      await browser.close();

      console.log('===screenshot.done');

      return;
    }

    await page.screenshot({
      path: targetPath,
      fullPage: true,
    });

    await browser.close();

    console.log('===screenshot.done');

  } catch (error) {
    console.log('===screenshot.error', error);
  }
};
