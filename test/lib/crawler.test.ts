import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import { crawler, strategies } from '../../index';

const timeout = 5 * 60 * 1000;
const baseDir = path.join(__dirname, '../data');

dotenv.config();


describe('crawler.test.ts', () => {

  test('support', async done => {
    const strategy = strategies.getStrategy({
      baseDir,
      stock: 'TSLA',
      strategy: 'support',
    });

    const data = await crawler.load({
      ...strategy,
      proxy: process.env.RPOXY,
    });

    expect(Array.isArray(data)).toEqual(true);

    if (strategy.loaddata) {
      expect(fs.existsSync(strategy.loaddata.target)).toEqual(true);
    }

    if (strategy.screenshot) {
      expect(fs.existsSync(strategy.screenshot.target)).toEqual(true);
    }

    done();
  }, timeout);

  test.skip('short', async done => {
    const strategy = strategies.getStrategy({
      baseDir,
      stock: 'TSLA',
      strategy: 'short',
    });

    const data = await crawler.load({
      ...strategy,
      proxy: process.env.RPOXY,
    });

    expect(Array.isArray(data)).toEqual(true);

    if (strategy.loaddata) {
      expect(fs.existsSync(strategy.loaddata.target)).toEqual(true);
    }

    if (strategy.screenshot) {
      expect(fs.existsSync(strategy.screenshot.target)).toEqual(true);
    }

    done();
  }, timeout);

});
