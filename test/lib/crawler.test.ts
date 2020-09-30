import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import { crawler, strategies } from '../../index';

const timeout = 5 * 60 * 1000;
const baseDir = path.join(__dirname, '../data');

dotenv.config();

describe('crawler.test.ts', () => {
  test.skip('support', async done => {
    const strategy = strategies.getStrategy({
      stock: 'TSLA',
      baseDir,
      strategy: 'support',
    });

    await crawler.screenshot(strategy);

    expect(fs.existsSync(strategy.targetPath)).toEqual(true);
    done();
  }, timeout);

  test.skip('short', async done => {
    const strategy = strategies.getStrategy({
      stock: 'TSLA',
      baseDir,
      strategy: 'short',
    });

    await crawler.screenshot(strategy);

    expect(fs.existsSync(strategy.targetPath)).toEqual(true);
    done();
  }, timeout);
});
