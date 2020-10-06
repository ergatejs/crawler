import path from 'path';
import { LoadOption } from '../crawler';

interface Options {
  stock?: string;
  baseDir: string;
  strategy: string;
}

export const getStrategy = (option: Options): LoadOption => {
  const { stock, strategy, baseDir } = option;

  const timestamps = Date.now();

  if (strategy === 'support') {
    if (!stock) {
      throw (new Error('stock is required.'));
    }

    const targetStock = stock.toUpperCase();

    return {
      url: `https://www.barchart.com/stocks/quotes/${targetStock}/cheat-sheet`,
      script: path.join(__dirname, '../script/support.js'),

      loaddata: {
        target: path.join(baseDir, `${targetStock}.support.${timestamps}.json`),
      },

      screenshot: {
        selector: '#main-content-column',
        asset: path.join('assets', `${targetStock}.support.${timestamps}.png`),
        target: path.join(baseDir, `${targetStock}.support.${timestamps}.png`),
      },
    };
  }

  if (strategy === 'short') {
    if (!stock) {
      throw (new Error('stock is required.'));
    }

    const targetStock = stock.toLocaleLowerCase();

    return {
      url: `http://shortvolumes.com/?t=${targetStock}`,
      script: path.join(__dirname, '../script/short.js'),

      screenshot: {
        selector: '#main',
        asset: path.join('assets', `${targetStock}.support.${timestamps}.png`),
        target: path.join(baseDir, `${targetStock}.support.${timestamps}.png`),
      },
    };
  }

  if (strategy === 'unusualvolume') {
    return {
      url: 'https://app.fdscanner.com/unusualvolume',
      script: path.join(__dirname, '../script/unusualvolume.js'),
      api: 'https://app.fdscanner.com/api/voloi/voloi',
    };
  }

  throw (new Error('not implement'));
};
