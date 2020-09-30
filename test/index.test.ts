import path from 'path';
import dotenv from 'dotenv';

import { strategies, fans, crawler, client, util } from '../index';

dotenv.config();

const timeout = 5 * 60 * 1000;
const baseDir = path.join(__dirname, 'data');

describe('index.test.ts', () => {
  test('support', async done => {
    const run = async (stock: string) => {
      const strategy = strategies.getStrategy({
        stock,
        baseDir,
        strategy: 'support',
      });

      await crawler.screenshot(strategy);

      const assetUrl = await client.upload(strategy.targetAsset, strategy.targetPath);

      const postData = {
        title: `${util.format()} - ${stock} - Resistance & Support Point`,
        tag_id: 'd6c6af85-9a2e-4ae5-87b1-eb16c141ff43',
        content: `![](${assetUrl})`,
      };

      await fans.publish(postData);
    };

    await run('AMZN');
    await run('TSLA');

    done();
  }, timeout);


  test('Short Volumes', async done => {
    const run = async (stock: string) => {
      const strategy = strategies.getStrategy({
        stock,
        baseDir,
        strategy: 'short',
      });

      await crawler.screenshot(strategy);

      const assetUrl = await client.upload(strategy.targetAsset, strategy.targetPath);

      const postData = {
        title: `${util.format()} - ${stock} - Short Volumes`,
        tag_id: 'd6c6af85-9a2e-4ae5-87b1-eb16c141ff43',
        content: `![](${assetUrl})`,
      };

      await fans.publish(postData);
    };

    await run('AMZN');
    await run('TSLA');

    done();
  }, timeout);
});

