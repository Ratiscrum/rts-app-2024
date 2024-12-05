'use server';

import { cookies } from 'next/headers';
import { FormState } from '../../models/form-state.type';
import { LoginResponse } from './login-simple.action';
import { access_token_cookie } from '@/lib/constants';

export async function login2faAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const otpCode = formData.get('otp');

    if (!otpCode) {
      return { message: 'Veuillez remplir tous les champs', success: false };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        otp: otpCode,
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        message: 'Code OTP invalide',
      };
    }

    const userResponse = (await res.json()) as LoginResponse;

    const cookieStore = await cookies();
    cookieStore.set(access_token_cookie, userResponse.token.token);

    return {
      success: true,
      message: 'Connexion réussie',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Une erreur est survenue',
    };
  }
}
