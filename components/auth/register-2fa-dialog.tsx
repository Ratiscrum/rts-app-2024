import React, { useEffect } from 'react';
import { useActionState } from 'react';
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
import { verifyOtpAction } from '@/actions/auth/verify-otp.action';
import { Loader } from '../ui/loader';

interface Register2faDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export default function Register2faDialog({
  isOpen,
  onDismiss,
}: Register2faDialogProps) {
  const [state, formAction, isPending] = useActionState(verifyOtpAction, {
    success: false,
  });

  useEffect(() => {
    if (state?.success) {
      redirect('/');
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={onDismiss}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Authentication Code</DialogTitle>
          <DialogDescription>
            Enter the 6-digit code from your authenticator app.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-4">
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
              Complete 2-step verification
              {isPending && <Loader className="ml-2" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
