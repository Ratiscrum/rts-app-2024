'use server';

import { getToken } from '@/lib/utils/auth.utils';
import { PublicUser } from '@/models/public-user.type';

export async function getUserAction(): Promise<PublicUser | null> {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const response = await fetch(`${process.env.API_URL}/me`, {
    cache: 'force-cache',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.statusCode === 401) {
    return null;
  }

  return data as PublicUser;
}
