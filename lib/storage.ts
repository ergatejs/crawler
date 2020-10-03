import Debug from 'debug';
import oss from 'ali-oss';

const debug = Debug('@ergatejs/crawler');

export const upload = async (targetAsset: string, targetPath: string) => {
  const client = new oss({
    bucket: process.env.ALIYUN_OSS_BUCKET || '',
    region: process.env.ALIYUN_OSS_REGION || '',
    accessKeyId: process.env.ALIYUN_OSS_ACCESS_ID || '',
    accessKeySecret: process.env.ALIYUN_OSS_ACCESS_SECRET || '',
    secure: true,
  });

  const uploadResult = await client.put(targetAsset, targetPath);
  debug('uploadResult', uploadResult);

  return uploadResult.url;
};
