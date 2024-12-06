'use client';

import { createContext, FC, useState } from 'react';

export type Tab = 'corp' | 'ocean';

type Context = {
  isBottleMode: boolean;
  setBottleMode: (val: boolean) => void;
};

export const BottleModeContext = createContext({} as Context);

export const BottleModeProvider: FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [isBottleMode, setBottleMode] = useState<boolean>(false);

  return (
    <BottleModeContext.Provider value={{ isBottleMode, setBottleMode }}>
      {children}
    </BottleModeContext.Provider>
  );
};
