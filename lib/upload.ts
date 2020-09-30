import oss from 'ali-oss';

export default async (targetAsset: string, targetPath: string) => {
  const client = new oss({
    region: process.env.OSS_REGION || '',
    accessKeyId: process.env.OSS_ACCESS_ID || '',
    accessKeySecret: process.env.OSS_ACCESS_SECRET || '',
    bucket: process.env.OSS_BUCKET || '',
    secure: true,
  });

  const uploadResult = await client.put(targetAsset, targetPath);
  // console.log('===uploadResult', uploadResult);

  return uploadResult.url;
};
