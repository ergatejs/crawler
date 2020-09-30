import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { crawler } from '../../index';

dotenv.config();

describe('crawler.test.ts', () => {
  test('screenshot', async (done) => {

    const targetUrl = 'https://www.google.com';
    const targetPath = path.join(__dirname, '..', 'data/google.png');

    await crawler.screenshot({
      targetUrl,
      targetPath,
    });

    expect(fs.existsSync(targetPath)).toEqual(true);
    done();
  }, 60*1000);
});
