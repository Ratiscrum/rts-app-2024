'use client';

import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Github } from 'lucide-react';
import { registerAccountAction } from '@/actions/auth/register-account.action';
import { useActionState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import ErrorDisplay from '../shared/error-display';
import { useUserContext } from '@/lib/providers/user-provider';
import { Loader } from '../ui/loader';

export function UserRegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAccountAction, {
    success: false,
  });

  // Workaround for form submission - https://github.com/vercel/next.js/issues/72949
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { login } = useUserContext();

  // Workaround for form submission
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (state?.success) {
      //login();
      //setSetup2FADialogOpen(true);
      redirect('/login');
    }
  }, [state, login]);

  return (
    <div className="grid gap-6">
      <form action={formAction}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="" htmlFor="name">
              Full name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange} // Workaround for form submission
              placeholder="Damien Dépied"
              autoComplete="name"
              type="text"
              disabled={isPending}
              errors={state?.errors?.name}
            />
          </div>
          <div className="grid gap-2">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={formData.email}
              onChange={handleChange} // Workaround for form submission
              disabled={isPending}
              errors={state?.errors?.email}
            />
          </div>
          <div className="grid gap-2">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter a secure password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange} // Workaround for form submission
              errors={state?.errors?.password}
              disabled={isPending}
            />
          </div>
          <div className="grid gap-2">
            <Label className="" htmlFor="password">
              Confirm password
            </Label>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Enter your password again"
              type="password"
              autoComplete="new-password"
              value={formData.passwordConfirm}
              onChange={handleChange} // Workaround for form submission
              disabled={isPending}
              errors={state?.errors?.passwordConfirm}
            />
          </div>
          {!state?.success && state.message && (
            <ErrorDisplay errorText={state.message} />
          )}
          <Button type="submit" disabled={isPending}>
            Create account
            {isPending && <Loader className="ml-2" />}
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or sign up with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={true}>
        <Github className="h-4 w-4" />
        GitHub (coming soon)
      </Button>
    </div>
  );
}
