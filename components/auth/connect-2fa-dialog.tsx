import React, { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp';
import { redirect } from 'next/navigation';
import ErrorDisplay from '../shared/error-display';
import { useUserContext } from '@/lib/providers/user-provider';
import { login2faAction } from '@/actions/auth/login-2fa.action';
import { Loader } from '../ui/loader';

interface Connect2faDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  email: string;
  password: string;
}

export default function Connect2faDialog({
  isOpen,
  onDismiss,
  email,
  password,
}: Connect2faDialogProps) {
  const [state, formAction, isPending] = useActionState(login2faAction, {
    success: false,
  });

  const { login } = useUserContext();

  useEffect(() => {
    if (state?.success) {
      login();
      redirect('/');
    }
  }, [state, login]);

  return (
    <Dialog open={isOpen} onOpenChange={onDismiss}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Verify Authentication Code</DialogTitle>
          <DialogDescription>
            Enter the 6-digit code from your authenticator app.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="password" value={password} />
          <div className="flex flex-col items-center justify-center">
            <InputOTP name="otp" maxLength={6} autoFocus>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {!state?.success && state.message && (
            <ErrorDisplay errorText={state.message} />
          )}
          <DialogFooter>
            <Button className="w-full" type="submit" disabled={isPending}>
              Verify code
              {isPending && <Loader className="ml-2" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
