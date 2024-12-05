import { UserRegisterForm } from '@/components/auth/register-form';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React from 'react';

export default function Register() {
  return (
    <div className="flex flex-col items-center">
      <div className="sm:2/3 flex w-full flex-col gap-5 px-10 lg:w-1/3">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Let&apos;s get started 🚀
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password below to create your account
          </p>
        </div>
        <UserRegisterForm />
        <Label className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login here
          </Link>
        </Label>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Ratiscrum policy.
          </Link>{' '}
        </p>
      </div>
    </div>
  );
}
