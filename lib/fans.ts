import Debug from 'debug';
import urllib from 'urllib';

const debug = Debug('@ergatejs/crawler');

const auth = () => {
  const HOST = process.env.F_ACCOUNT_HOST || 'http://localhost:7001';
  const authResult = await urllib.request(`${HOST}/auth/login`, {
    method: 'POST',
    data: {
      email: process.env.F_ACCOUNT_EMAIL || '',
      password: process.env.F_ACCOUNT_PASSWORD || '',
    },
    dataType: 'json',
    contentType: 'json',
  });

  debug('authResult', authResult);

  return authResult;
};

export const publishPost = async (data: any) => {
  const authResult = await auth();
  const { data: { token } } = authResult.data;

  if (!token) {
    return;
  }

  const HOST = process.env.F_ACCOUNT_HOST || 'http://localhost:7001';
  const result = await urllib.request(`${HOST}/api/post/create`, {
    data,
    method: 'POST',
    dataType: 'json',
    contentType: 'json',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  debug('result', result);
  return result;
};

export const updateUnusualVolume = async (data: any) => {
  const authResult = await auth();
  const { data: { token } } = authResult.data;

  if (!token) {
    return;
  }

  const HOST = process.env.F_ACCOUNT_HOST || 'http://localhost:7001';
  const result = await urllib.request(`${HOST}/api/trade/updateUnusualVolume`, {
    data,
    method: 'POST',
    dataType: 'json',
    contentType: 'json',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  debug('result', result);
  return result;
};
