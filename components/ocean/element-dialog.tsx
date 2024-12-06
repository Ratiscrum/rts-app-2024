'use client';

import { Waves } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '../ui/credenza';
import { Point } from '@/models/point.type';

interface ElementDialogProps {
  children: React.ReactNode;
  point: Point;
}

export default function ElementDialog({ children, point }: ElementDialogProps) {
  return (
    <Credenza>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent className="">
        <CredenzaHeader className="flex flex-col items-center gap-5 md:flex-row">
          <img src="/favicon-192.png" alt="sea point" className="h-28" />
          <div className="">
            <CredenzaTitle>{point.seaElementProps.title}</CredenzaTitle>
            <CredenzaDescription className="text-left">
              {point.seaElementProps.description}
            </CredenzaDescription>
          </div>
        </CredenzaHeader>
        {/* BODY HERE @raffaeldp */}
        {/* <CredenzaBody>{point.seaElementProps.body}</CredenzaBody> */}
        <CredenzaFooter className="mt-2 flex items-center gap-2 rounded-lg border bg-gray-300 p-3 max-lg:flex-col">
          <p className="text-left">
            Pensez-vous que le {point.seaElementProps.title.toLowerCase()}{' '}
            guéria le coeur de Jean Marc ?
          </p>
          <CredenzaClose asChild>
            <Button onClick={() => {}}>
              Agir
              <Waves className="h-6 w-6" />
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
