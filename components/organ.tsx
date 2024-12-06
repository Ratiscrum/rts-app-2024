'use client';

import { FC, useContext } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils/utils';
import { OrgansContext } from '@/lib/providers/organ-provider';
import { Organs, organsLabels } from '@/models/organs.type';
import { GameContext } from '@/lib/providers/game-provider';

type Props = {
  children: React.ReactNode;
  name: Organs;
  className?: string;
};

export const Organ: FC<Props> = ({ name, children, className }) => {
  const state = useContext(OrgansContext).organs?.[name] ?? 'normal';
  const title = organsLabels[name];

  const { selectOrgan } = useContext(GameContext);

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          'h-10 transition-all duration-1000',
          state === 'normal' && 'text-muted',
          state === 'hurt' && 'animate-pulse text-red-600',
          state === 'heal' &&
            'motion-preset-shrink scale-150 animate-pulse text-emerald-600',
          className,
        )}
        onClick={() => selectOrgan(name)}
        asChild
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
};
