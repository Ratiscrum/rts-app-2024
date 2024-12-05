'use client';

import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Github } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import Setup2faDialog from './setup-2fa-dialog';
import Connect2faDialog from './connect-2fa-dialog';
import { loginSimpleAction } from '@/actions/auth/login-simple.action';
import ErrorDisplay from '../shared/error-display';
import { useUserContext } from '@/lib/providers/user-provider';
import { redirect } from 'next/navigation';
import { Loader } from '../ui/loader';

export function UserLoginForm() {
  const [state, formAction, isPending] = useActionState(loginSimpleAction, {
    success: false,
  });
  const [isSetup2FADialogOpen, setSetup2FADialogOpen] =
    React.useState<boolean>(false);
  const [isLoginOtpDialogOpen, setLoginOtpDialogOpen] =
    React.useState<boolean>(false);

  // Workaround for form submission - https://github.com/vercel/next.js/issues/72949
  const [formData, setFormData] = React.useState({ email: '', password: '' });

  // Workaround for form submission
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const { login } = useUserContext();

  useEffect(() => {
    if (state?.success) {
      if (state.isRequiredOTP) {
        console.log('is required otp');
        setLoginOtpDialogOpen(true);
      } else if (
        state.loginResponse &&
        !state.loginResponse.user.isTwoFactorEnabled
      ) {
        login();
        setSetup2FADialogOpen(true);
      }
    }
  }, [state, login]);

  return (
    <>
      {isSetup2FADialogOpen && (
        <Setup2faDialog
          isOpen={isSetup2FADialogOpen}
          onDismiss={() => {
            setSetup2FADialogOpen(false);
            redirect('/');
          }}
        />
      )}
      {isLoginOtpDialogOpen && (
        <Connect2faDialog
          isOpen={isLoginOtpDialogOpen}
          onDismiss={() => setLoginOtpDialogOpen(false)}
          email={formData.email}
          password={formData.password}
        />
      )}

      <div className="grid gap-6">
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange} // Workaround for form submission
                disabled={isPending}
                errors={state?.errors?.password}
              />
            </div>
            {!state?.success && state.message && (
              <ErrorDisplay errorText={state.message} />
            )}
            <Button type="submit" disabled={isPending}>
              Connect
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
              Or login with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={true}>
          <Github className="h-4 w-4" />
          GitHub (coming soon)
        </Button>
      </div>
    </>
  );
}
