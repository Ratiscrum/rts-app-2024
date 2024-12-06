'use client';

import { OrganState } from '@/models/organ-state.type';
import { createContext, FC, useState } from 'react';

export type OrgansContextType = {
  organs: Record<string, OrganState>;
  updateOrgan: (name: string, state: OrganState) => void;
};

export const OrgansContext = createContext({} as OrgansContextType);

type Props = {
  children: React.ReactNode;
};

export const OrgansProvider: FC<Props> = ({ children }) => {
  const [organs, setOrgans] = useState({});

  const updateOrgan = (name: string, state: OrganState) => {
    setOrgans({
      ...organs,
      [name]: state,
    });
  };

  return (
    <OrgansContext.Provider
      value={{
        organs,
        updateOrgan,
      }}
    >
      {children}
    </OrgansContext.Provider>
  );
};
