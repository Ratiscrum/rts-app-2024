import { UserLoginForm } from '@/components/auth/login-form';
import { Label } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import React from 'react';

export default function Login() {
  return (
    <div className="flex flex-col items-center">
      <div className="sm:2/3 flex w-full flex-col gap-5 px-10 lg:w-1/3">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Oh hey, the rat 🐀 is back !
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password below to login your account
          </p>
        </div>
        <UserLoginForm />
        <Label className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Create one
          </Link>
        </Label>
      </div>
    </div>
  );
}
