'use server';

import { GameProvider } from '@/lib/providers/game-provider';
import { OrgansProvider } from '@/lib/providers/organ-provider';
import { PlayPage } from './play-page';
import getSeaElementContent from '@/actions/getSeaElementContent';

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
      <GameProvider>
        <PlayPage seaElementsContent={seaElementsContent} />
      </GameProvider>
    </OrgansProvider>
  );
}
