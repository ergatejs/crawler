import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { format } from '../lib/util';

import { fans, crawler, client } from '../index';

dotenv.config();

describe('index.test.ts', () => {
  test('run', async done => {

    const baseDir = __dirname;
    const timestamps = Date.now();

    const run = async (stock: string) => {
      const targetName = `${timestamps}.${stock}.png`;
      const targetPath = path.join(baseDir, 'data', targetName);
      const targetAsset = path.join('assets', targetName);
      const targetUrl = `https://www.barchart.com/stocks/quotes/${stock}/cheat-sheet`;

      // const targetSelector = '#main-content-column .column-inner';
      const removeSelector = '#ic_desktop_adhesion';

      await crawler.screenshot({
        targetUrl,
        targetPath,

        // targetSelector,
        removeSelector,

        mediaType: 'print',
      });

      const assetUrl = await client.upload(targetAsset, targetPath);

      const postData = {
        title: `${format()} - ${stock} - Resistance & Support Point`,
        tag_id: 'd6c6af85-9a2e-4ae5-87b1-eb16c141ff43',
        content: `![](${assetUrl})`,
      };

      await fans.publish(postData);
    };

    await run('AMZN');
    await run('TSLA');

    done();
  }, 5 * 60 * 1000);
});

