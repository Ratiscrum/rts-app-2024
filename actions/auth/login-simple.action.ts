'use server';

import { z } from 'zod';
import { FormState } from '../../models/form-state.type';
import { cookies } from 'next/headers';
import { access_token_cookie } from '@/lib/constants';
import { PublicUser } from '@/models/public-user.type';
import { Token } from '@/models/token.type';

const validationLoginFormSchema = z.object({
  email: z.string().email({ message: "L'email n'est pas valide" }),
  password: z.string().min(1, { message: 'Le mot de passe est requis' }),
});

export interface LoginResponse {
  user: PublicUser;
  token: Token;
}

export interface FormStateLogin extends FormState {
  loginResponse?: LoginResponse;
  isRequiredOTP?: boolean;
}

export async function loginSimpleAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormStateLogin> {
  // Add a delay to simulate a real-world request
  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    const validatedLoginForm = validationLoginFormSchema.safeParse({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (!validatedLoginForm.success) {
      return {
        success: false,
        errors: validatedLoginForm.error.flatten().fieldErrors,
      };
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
      }),
    });

    if (res.status === 422) {
      return {
        success: true,
        message: 'Saisir le code OTP pour finaliser la connexion',
        isRequiredOTP: true,
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message: 'Email ou mot de passe invalide... Force à toi mon rat.',
      };
    }

    const userResponse = (await res.json()) as LoginResponse;

    const cookieStore = await cookies();
    cookieStore.set(access_token_cookie, userResponse.token.token);

    return {
      success: true,
      message: 'Connexion réussie',
      loginResponse: userResponse,
    };
  } catch (error) {
    return {
      success: false,
      message: `Une erreur est survenue lors de la connexion. ${error}`,
    };
  }
}
