import Debug from 'debug';
import urllib from 'urllib';

const debug = Debug('@ergatejs/crawler');

export const publish = async (data: any) => {
  const HOST = process.env.F_ACCOUNT_HOST || 'https://f.implements.io';

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
  const { data: { token } } = authResult.data;

  if (!token) {
    return;
  }

  const publishResult = await urllib.request(`${HOST}/api/post/create`, {
    data,
    method: 'POST',
    dataType: 'json',
    contentType: 'json',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  debug('publishResult', publishResult);
  return publishResult;
};
