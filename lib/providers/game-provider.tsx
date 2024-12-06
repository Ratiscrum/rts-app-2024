import { organs, Organs } from '@/models/organs.type';
import { createContext, FC, useContext } from 'react';
import { getRandomElement } from '../utils/utils';
import { OrgansContext } from './organ-provider';

type GameContextType = {
  organToHeal: Organs;
  selectOrgan: (organ: Organs) => boolean;
};

export const GameContext = createContext({} as GameContextType);

type Props = {
  children: React.ReactElement;
};

export const GameProvider: FC<Props> = ({ children }) => {
  const organToHeal = getRandomElement(organs) as Organs;

  const { updateOrgan } = useContext(OrgansContext);

  const selectOrgan = (organ: Organs) => {
    updateOrgan(organ, 'heal');

    setTimeout(() => {
      updateOrgan(organ, 'heal');
    }, 2000);

    const win = organToHeal === organ;

    if (win) {
      // found !! win game
    } else {
      // not found
    }

    return win;
  };

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
