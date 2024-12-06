'use client';

import { Corp } from '@/components/corp';
import { GameContext } from '@/lib/providers/game-provider';
import { organsLabelsWithPrefix } from '@/models/organs.type';
import { FC, useContext } from 'react';

export const CorpPanel: FC = () => {
  const { organToHeal } = useContext(GameContext);
  const title = organToHeal && organsLabelsWithPrefix[organToHeal];

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-muted p-4">
      <div className="text-center">
        <h3>Jean Marc a besoin de votre aide !</h3>
        {title && (
          <p>Agissez sur l&apos;océan pour guérir {title} de Jean Marc</p>
        )}
      </div>
      <Corp />
    </div>
  );
};
