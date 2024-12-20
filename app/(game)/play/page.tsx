'use server';

import { GameProvider } from '@/lib/providers/game-provider';
import { OrgansProvider } from '@/lib/providers/organ-provider';
import { PlayPage } from './play-page';
import getSeaElementContent from '@/actions/getSeaElementContent';
import { GameModals } from './game-modals';
import { TabProvider } from '@/lib/providers/tab-provider';
import { BottleModeProvider } from '@/lib/providers/bottle-mode-provider';

export default async function Page() {
  const seaElementNames: string[] = [
    'algues',
    'courant',
    'eauClaire',
    'ecoMicrobiens',
    'estuaires',
    'marees',
    'recifsCalcaires',
    'recifsCoraliens',
    'salinite',
    'surface',
  ];

  const seaElementsContent = await Promise.all(
    seaElementNames.map(async (name) => {
      return getSeaElementContent(name);
    }),
  );

  return (
    <OrgansProvider>
      <TabProvider>
        <BottleModeProvider>
          <GameProvider>
            <>
              <PlayPage elements={seaElementsContent} />
              <GameModals elements={seaElementsContent} />
            </>
          </GameProvider>
        </BottleModeProvider>
      </TabProvider>
    </OrgansProvider>
  );
}
