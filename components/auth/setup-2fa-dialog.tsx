'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Register2faDialog from './register-2fa-dialog';
import {
  GenerateQrCodeResponse,
  generateQrCodeAction,
} from '@/actions/auth/generate-qrcode.action';
import { Label } from '@radix-ui/react-dropdown-menu';

interface Setup2faDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export default function Setup2faDialog({
  isOpen,
  onDismiss,
}: Setup2faDialogProps) {
  const [qrCodeImage, setQRCodeImage] = useState<GenerateQrCodeResponse>();
  const [isRegister2FADialogOpen, setRegister2FADialogOpen] =
    React.useState<boolean>(false);

  useEffect(() => {
    async function fetchTwoFactorAuth() {
      const data = await generateQrCodeAction();
      if (data.success && data.generateQrCodeResponse) {
        setQRCodeImage(data.generateQrCodeResponse);
      }
    }

    fetchTwoFactorAuth();
  }, []);

  const triggerNextStepSetup = () => {
    setRegister2FADialogOpen(true);
  };

  return (
    <>
      {isRegister2FADialogOpen && (
        <Register2faDialog
          isOpen={isRegister2FADialogOpen}
          onDismiss={() => setRegister2FADialogOpen(false)}
        />
      )}
      <Dialog open={isOpen} onOpenChange={onDismiss}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              To be able to secure your account, you need to scan the QR code
              below with your authenticator app (such as Google Authentication
              App) and enter the verification code below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center rounded-lg border p-5">
            {!qrCodeImage ? (
              <Loader2 className="animate-spin" size={32} />
            ) : (
              <Image
                src={
                  'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' +
                  encodeURIComponent(qrCodeImage.uri)
                }
                width={200}
                height={200}
                alt="QR code"
              />
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or enter the code manually below
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {!qrCodeImage ? (
              <Loader2 className="animate-spin" size={32} />
            ) : (
              <Label className="rounded-lg border p-3">
                <a className="underline" href={qrCodeImage?.uri}>
                  {qrCodeImage?.secret}
                </a>
              </Label>
            )}
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              type="submit"
              onClick={triggerNextStepSetup}
            >
              Next
              <ArrowRight className="ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
