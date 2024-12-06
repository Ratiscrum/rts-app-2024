'use client';

import { organs, Organs } from '@/models/organs.type';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { getRandomElement } from '../utils/utils';
import { OrgansContext } from './organ-provider';
import { TabContext } from './tab-provider';

type GameState = 'playing' | 'lost' | 'win';

type GameContextType = {
  organToHeal: Organs | null;
  selectOrgan: (organ: Organs) => boolean;
  lastSelection: Organs | null;
  state: GameState;
  resetState: () => void;
};

export const GameContext = createContext({} as GameContextType);

type Props = {
  children: React.ReactElement;
};

export const GameProvider: FC<Props> = ({ children }) => {
  const [organToHeal, setOrgan] = useState<Organs | null>(
    null as Organs | null,
  );

  const [state, setState] = useState('playing' as GameState);
  const [lastSelection, setLastSelection] = useState(null as Organs | null);

  const { updateOrgan } = useContext(OrgansContext);
  const { setTab } = useContext(TabContext);

  const selectOrgan = (organ: Organs) => {
    updateOrgan(organ, 'heal');
    setLastSelection(organ);
    setTab('corp');

    const win = organToHeal === organ;

    setTimeout(() => {
      updateOrgan(organ, 'normal');

      if (win) {
        // found !! win game
        setState('win');
      } else {
        // not found
        setState('lost');
      }
    }, 2000);

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
        state,
        lastSelection,
        resetState: () => setState('playing'),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
