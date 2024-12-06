import { GameProvider } from '@/lib/providers/game-provider';
import { OrgansProvider } from '@/lib/providers/organ-provider';
import { PlayPage } from './play-page';

export default function Page() {
  return (
    <OrgansProvider>
      <GameProvider>
        <PlayPage />
      </GameProvider>
    </OrgansProvider>
  );
}
