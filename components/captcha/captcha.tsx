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
        <p
          className={
            'mt-8 cursor-pointer rounded-2xl bg-blue-500 p-2 text-xl text-white'
          }
        >
          Essayez notre superbe Captcha !!
        </p>
      </CredenzaTrigger>
      <CredenzaContent className="lg:min-w-[1000px]">
        <CredenzaHeader className="flex flex-col items-center gap-5 md:flex-row">
          <div className="">
            <CredenzaTitle>Résoud ce captcha !</CredenzaTitle>
            <CredenzaDescription className="text-left">
              Mettre les touches
            </CredenzaDescription>
          </div>
        </CredenzaHeader>
        <CredenzaBody className={'h-[700px]'}>
          {!isCaptchaSolved && <DoomCaptcha onKill={resolveCaptcha} />}
          {/*<p></p>*/}
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
