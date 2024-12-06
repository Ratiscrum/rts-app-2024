'use client';

import { FC, useContext } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils/utils';
import { OrgansContext } from '@/lib/providers/organ-provider';

type Props = {
  children: React.ReactNode;
  name: string;
  title?: string;
  className?: string;
};

export const Organ: FC<Props> = ({ name, children, className, title }) => {
  const state = useContext(OrgansContext).organs?.[name] ?? 'normal';

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          'h-10 transition-all duration-1000',
          state === 'normal' && 'text-white',
          state === 'hurt' && 'animate-pulse text-red-600',
          state === 'heal' && 'text-emerald-600',
          className,
        )}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
};
