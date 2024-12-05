'use server';

import { getToken } from '@/lib/utils/auth.utils';
import { FormState } from '@/models/form-state.type';

export interface GenerateQrCodeResponse {
  secret: string;
  uri: string;
  qr: string;
}

interface FormStateGenerateQrCode extends FormState {
  generateQrCodeResponse?: GenerateQrCodeResponse;
}

export async function generateQrCodeAction(): Promise<FormStateGenerateQrCode> {
  try {
    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/2fa/generate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resJson = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: 'Une erreur est survenue lors de la génération du code QR',
      };
    }

    return {
      success: true,
      generateQrCodeResponse: resJson as GenerateQrCodeResponse,
    };
  } catch (error) {
    return { success: false };
  }
}
