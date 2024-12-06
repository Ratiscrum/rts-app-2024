'use client';

import { OrganState } from '@/models/organ-state.type';
import { Organs } from '@/models/organs.type';
import { createContext, FC, useState } from 'react';

export type OrgansContextType = {
  organs: Record<Organs, OrganState>;
  updateOrgan: (name: Organs, state: OrganState) => void;
};

export const OrgansContext = createContext({} as OrgansContextType);

type Props = {
  children: React.ReactNode;
};

export const OrgansProvider: FC<Props> = ({ children }) => {
  const [organs, setOrgans] = useState({} as Record<Organs, OrganState>);

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
