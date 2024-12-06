'use client';

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/components/ui/credenza';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import DoomCaptcha from '@/components/captcha/doom';
import { useState } from 'react';

export default function Captcha() {
  // {
  // captchaCompleted,
  // }: {
  //   captchaCompleted: () => void;
  // }
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);

  const resolveCaptcha = () => {
    setIsCaptchaSolved(true);
  };

  return (
    <Credenza
      onOpenChange={() => {
        setIsCaptchaSolved(false);
      }}
    >
      <CredenzaTrigger asChild>
        <Button
          className={
            'mt-12 rounded-xl bg-secondary px-5 py-2 text-secondary-foreground'
          }
        >
          Ose résoudre ce captcha... 🔫
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="lg:min-w-[1000px]">
        <CredenzaHeader className="flex flex-col items-center gap-5 md:flex-row">
          <div className="">
            <CredenzaTitle>Résout ce captcha !</CredenzaTitle>
            <CredenzaDescription className="text-left">
              Déplacez-vous avec ZQSD et tirez avec espace !
            </CredenzaDescription>
          </div>
        </CredenzaHeader>
        <CredenzaBody className={'h-[700px]'}>
          {!isCaptchaSolved && <DoomCaptcha onKill={resolveCaptcha} />}
          {isCaptchaSolved && (
            <div className={'flex h-full w-full items-center justify-center'}>
              <p className={'text-5xl'}>👍</p>
            </div>
          )}
        </CredenzaBody>
        <CredenzaFooter className="mt-2 flex items-center gap-2 rounded-lg border bg-gray-300 p-3 max-lg:flex-col">
          {isCaptchaSolved && (
            <CredenzaClose asChild>
              <Button
                onClick={() => {
                  // captchaCompleted();
                }}
              >
                VOUS AVEZ REUSSI ! BRAVO
                <ArrowRight className="h-6 w-6" />
              </Button>
            </CredenzaClose>
          )}
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
