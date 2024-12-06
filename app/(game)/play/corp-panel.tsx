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
        <h4>Jean-Marc a besoin de votre aide !</h4>
        {title && (
          <p>
            La santé de l&apos;océan se répercute sur Jean-Marc. Explorez
            l&apos;océan pour trouver ce qui guérira{' '}
            <span className="font-bold text-primary">{title}</span> de Jean-Marc
          </p>
        )}
      </div>
      <Corp />
    </div>
  );
};
