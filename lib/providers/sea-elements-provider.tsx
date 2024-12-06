import { SeaElementContent } from '@/models/seaElementContent';
import { createContext, FC } from 'react';

export const SeaElementsContext = createContext([] as SeaElementContent[]);

export const SeaElementsProvider: FC<{
  children: React.ReactElement;
  elements: SeaElementContent[];
}> = ({ children, elements }) => {
  return (
    <SeaElementsContext.Provider value={elements}>
      {children}
    </SeaElementsContext.Provider>
  );
};
