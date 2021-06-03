import path from 'path';
import dotenv from 'dotenv';

import { strategies, fans, crawler, storage, util } from '../index';

dotenv.config();

const timeout = 5 * 60 * 1000;
const baseDir = path.join(__dirname, 'data');

describe('index.test.ts', () => {
  test.skip('Resistance & Support Point', async done => {
    const run = async (stock: string) => {
      const strategy = strategies.getStrategy({
        stock,
        baseDir,
        strategy: 'support',
      });

      await crawler.load(strategy);

      if (strategy.screenshot) {
        const assetUrl = await storage.upload(strategy.screenshot.asset, strategy.screenshot.target);
        const postData = {
          title: `${util.format()} - ${stock} - Resistance & Support Point`,
          tag_id: 'd6c6af85-9a2e-4ae5-87b1-eb16c141ff43',
          content: `![](${assetUrl})`,
        };
        await fans.publishPost(postData);
      }
    };

    await run('AMZN');
    await run('TSLA');

    done();
  }, timeout);


  test.skip('Short Volumes', async done => {
    const run = async (stock: string) => {
      const strategy = strategies.getStrategy({
        stock,
        baseDir,
        strategy: 'short',
      });

      await crawler.load(strategy);

      if (strategy.screenshot) {
        const assetUrl = await storage.upload(strategy.screenshot.asset, strategy.screenshot.target);
        const postData = {
          title: `${util.format()} - ${stock} - Short Volumes`,
          tag_id: 'd6c6af85-9a2e-4ae5-87b1-eb16c141ff43',
          content: `![](${assetUrl})`,
        };
        await fans.publishPost(postData);
      }
    };

    await run('AMZN');
    await run('TSLA');

    done();
  }, timeout);

  test.skip('Unusual Volume', async done => {
    const strategy = strategies.getStrategy({      
      baseDir,
      strategy: 'unusualvolume',
    });

    const data = await crawler.load({
      ...strategy,
      // proxy: '--proxy-server=http://127.0.0.1:1087',
    });
    
    if (data) {
      await fans.updateUnusualVolume({
        data,
      });
    }

    done();
  }, timeout);
});

