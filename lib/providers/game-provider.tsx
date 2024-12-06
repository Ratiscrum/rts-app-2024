'use client';

import { organs, Organs } from '@/models/organs.type';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { getRandomElement } from '../utils/utils';
import { OrgansContext } from './organ-provider';

type GameContextType = {
  organToHeal: Organs | null;
  selectOrgan: (organ: Organs) => boolean;
};

export const GameContext = createContext({} as GameContextType);

type Props = {
  children: React.ReactElement;
};

export const GameProvider: FC<Props> = ({ children }) => {
  const [organToHeal, setOrgan] = useState<Organs | null>(
    null as Organs | null,
  );

  const { updateOrgan } = useContext(OrgansContext);

  const selectOrgan = (organ: Organs) => {
    updateOrgan(organ, 'heal');

    setTimeout(() => {
      updateOrgan(organ, 'normal');
    }, 2000);

    const win = organToHeal === organ;

    if (win) {
      // found !! win game
    } else {
      // not found
    }

    return win;
  };

  useEffect(() => {
    const organ = getRandomElement(organs) as Organs;
    setOrgan(organ);
    updateOrgan(organ, 'hurt');
  }, []);

  return (
    <GameContext.Provider
      value={{
        organToHeal,
        selectOrgan,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
