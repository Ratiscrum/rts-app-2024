'use client';

import { Waves } from 'lucide-react';
import { Button } from '../ui/button';
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
} from '../ui/credenza';
import { SeaElementProps } from '@/models/sea-element-props.type';
import { useContext } from 'react';
import { GameContext } from '@/lib/providers/game-provider';
import { organsLabelsWithPrefix } from '@/models/organs.type';
import Content from '../content';

interface ElementDialogProps {
  children: React.ReactNode;
  point: SeaElementProps;
  mdx: object;
}

export default function ElementDialog({
  children,
  point,
  mdx,
}: ElementDialogProps) {
  const { selectOrgan, organToHeal } = useContext(GameContext);

  return (
    <Credenza>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent className="lg:min-w-[1000px]">
        <CredenzaHeader className="flex flex-col items-center gap-5 md:flex-row">
          <img src="/favicon-192.png" alt="sea point" className="h-28" />
          <div className="">
            <CredenzaTitle>{point.title}</CredenzaTitle>
            <CredenzaDescription className="text-left">
              {point.description}
            </CredenzaDescription>
          </div>
        </CredenzaHeader>
        <CredenzaBody>
          <Content mdx={mdx} />
        </CredenzaBody>
        <CredenzaFooter className="mt-2 flex items-center justify-center gap-2 rounded-lg border bg-gray-300 p-3 max-lg:flex-col">
          <p className="text-left">
            Pensez-vous que le {point.title.toLowerCase()} guérira{' '}
            <span className="font-bold">
              {organsLabelsWithPrefix[organToHeal ?? 'bone']}{' '}
            </span>{' '}
            de Jean Marc ?
          </p>
          <CredenzaClose asChild>
            <Button
              onClick={() => {
                selectOrgan(point.organ);
              }}
              size={'lg'}
            >
              Agir
              <Waves className="h-6 w-6" />
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
