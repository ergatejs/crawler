import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const format = (date?: number) => {
  const dateToFormat = date || Date.now();
  return dayjs.tz(dateToFormat, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
};
