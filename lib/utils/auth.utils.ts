'use server';

import { cookies } from 'next/headers';
import { access_token_cookie } from '../constants';

// TODO : refactor this by finding a way to retrieve the token everywhere inside the app
export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(access_token_cookie)?.value;

  if (!token) {
    return null;
  }

  return token;
};

export async function deleteTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(access_token_cookie);
}
