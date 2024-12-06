'use client';

import { createContext, FC, useState } from 'react';

export type Tab = 'corp' | 'ocean';

type Context = {
  tab: Tab;
  setTab: (tab: Tab) => void;
};

export const TabContext = createContext({} as Context);

export const TabProvider: FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [tab, setTab] = useState<Tab>('corp');

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
};
