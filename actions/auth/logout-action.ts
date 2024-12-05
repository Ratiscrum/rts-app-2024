'use server';

import { getToken } from '@/lib/utils/auth.utils';

export async function logoutAction(): Promise<boolean> {
  const accessToken = await getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 200) {
    console.log('Logout successful');
    return true;
  } else {
    return false;
  }
}
