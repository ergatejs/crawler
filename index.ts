import path from 'path';
import dayjs from 'dayjs';
import dotenv from 'dotenv';

import upload from './lib/upload';
import publish from './lib/publish';
import screenshot from './lib/screenshot';

dotenv.config();

const run = async (stock: string) => {
  const targetName = `${Date.now()}.${stock}.png`;
  const targetPath = path.join('data', targetName);
  const targetAsset = path.join('assets', targetName);

  const removeSelector = '#ic_desktop_adhesion';
  // const targetSelector = '#main-content-column .column-inner';
  const targetUrl = `https://www.barchart.com/stocks/quotes/${stock}/cheat-sheet`;

  await screenshot({
    targetUrl,
    targetPath,
    removeSelector,
    // targetSelector,
  });

  const assetUrl = await upload(targetAsset, targetPath);

  const postData = {
    title: `${dayjs().format('YYYY-MM-DD HH:mm:ss')} - ${stock} - Resistance & Support Point`,
    tag_id: 'd6c6af85-9a2e-4ae5-87b1-eb16c141ff43',
    content: `![](${assetUrl})`,
  };

  await publish(postData);
};

(async () => {
  await run('AMZN');
  await run('TSLA');
})();
