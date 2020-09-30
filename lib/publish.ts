import urllib from 'urllib';
import { HOST } from './constants';

export default async (data: any) => {

  const authResult = await urllib.request(`${HOST}/auth/login`, {
    method: 'POST',
    data: {
      email: process.env.ACCOUNT_EMAIL || '',
      password: process.env.ACCOUNT_PASSWORD || '',
    },
    dataType: 'json',
    contentType: 'json',
  });

  // console.log('===authResult', authResult);
  console.log('===authResult', authResult.data);

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

  // console.log('===publishResult', publishResult);
  console.log('===publishResult', publishResult.data);
};
