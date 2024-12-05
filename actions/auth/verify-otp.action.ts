'use server';

import { FormState } from '../../models/form-state.type';
import { getToken } from '@/lib/utils/auth.utils';

export interface VerifyOtpResponse {
  message: string;
}

export async function verifyOtpAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Add a delay to simulate a real-world request
  await new Promise((resolve) => setTimeout(resolve, 200));

  try {
    const token = await getToken();

    const otp = formData.get('otp') as string;

    if (!otp) {
      return { message: 'Veuillez remplir tous les champs', success: false };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/2fa/verify`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        otp: otp,
      }),
    });

    const resJson = await res.json();

    if (!res.ok) {
      return { success: false, message: 'Code OTP invalide' };
    }

    return { success: true, message: resJson.message };
  } catch (error) {
    return {
      success: false,
      message: `Une erreur est survenue lors de la connexion. ${error}`,
    };
  }
}
