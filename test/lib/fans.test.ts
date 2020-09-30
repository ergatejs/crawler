import dayjs from 'dayjs';
import dotenv from 'dotenv';
import { fans } from '../../index';

dotenv.config();

describe('fans.test.ts', () => {
  test.skip('publish', async () => {
    const postData = {
      title: `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
      tag_id: '1f3a786e-a57a-4563-b2c1-45e0b466d9a4',
      content: 'xxxx',
    };
    const result = await fans.publish(postData);
    expect(result).not.toBeNull;
  });
});
