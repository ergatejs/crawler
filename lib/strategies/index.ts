import path from 'path';
import { Crawler } from '../crawler';

interface Options {
  stock: string;
  strategy: string;
  baseDir: string;
}

export const getStrategy = (option: Options): Crawler => {
  const { stock, strategy, baseDir } = option;

  const timestamps = Date.now();

  if (strategy === 'short') {

    const targetStock = stock.toLocaleLowerCase();
    const targetName = `${timestamps}.short.${targetStock}.png`;

    return {
      url: `http://shortvolumes.com/?t=${targetStock}`,
      targetSelector: '#main',
      trashSelectors: [
        '.adsbygoogle',
        '#amzn_assoc_ad_div_adunit0_0',
        '#footer',
      ],
      targetPath: path.join(baseDir, targetName),
      targetAsset: path.join('assets', targetName),
      // proxy: '--proxy-server=http://127.0.0.1:1087',
    };
  }

  if (strategy === 'support') {

    const targetStock = stock.toUpperCase();
    const targetName = `${timestamps}.support.${targetStock}.png`;

    return {
      url: `https://www.barchart.com/stocks/quotes/${targetStock}/cheat-sheet`,
      targetSelector: '',
      trashSelectors: [
        '#ic_desktop_adhesion',
        '#customAd1763340958',
        '#customAd1330188159',
      ],
      mediaType: 'print',
      targetPath: path.join(baseDir, targetName),
      targetAsset: path.join('assets', targetName),
      // proxy: '--proxy-server=http://127.0.0.1:1087',
    };
  }

  throw (new Error('not implement'));
};
