'use server';

import { z } from 'zod';
import { FormState } from '../../models/form-state.type';

// Minimum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/,
);

const validationRegisterFormSchema = z
  .object({
    name: z
      .string()
      .max(64, { message: 'Le nom doit contenir au maximum 64 caractères' })
      .min(3, { message: 'Le nom doit contenir au moins 2 caractères' }),
    email: z.string().email({ message: "L'email n'est pas valide" }),
    password: z.string().regex(passwordValidation, {
      message:
        'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial et doit contenir au moins 12 caractères',
    }),
    passwordConfirm: z
      .string()
      .min(1, { message: 'Le mot de passe de confirmation est requis' }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Les mots de passe ne correspondent pas',
        path: ['passwordConfirm'],
      });
    }
  });

export async function registerAccountAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Add a delay to simulate a real-world request
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const validatedRegisterForm = validationRegisterFormSchema.safeParse({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      passwordConfirm: formData.get('passwordConfirm') as string,
    });

    if (!validatedRegisterForm.success) {
      return {
        success: false,
        errors: validatedRegisterForm.error.flatten().fieldErrors,
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      },
    );

    const jsonData = await res.json();
    console.log(jsonData);

    if (res.ok) {
      return {
        success: true,
        message: 'Félécitations, votre compte a été créé avec succès',
      };
    } else {
      return {
        success: false,
        message: `Une erreur est survenue lors de la création de votre compte.`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Une erreur est survenue lors de la création de votre compte. ${error}`,
    };
  }
}
