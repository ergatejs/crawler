import { util } from '../../';

describe('util.test.ts', () => {
  test('format', async () => {
    const date = 1601473926902;
    const dateFormatted = util.format(date);
    expect(dateFormatted).toEqual('2020-09-30 21:52:06');
  });
});
