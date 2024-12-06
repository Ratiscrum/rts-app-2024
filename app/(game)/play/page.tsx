import OceanBackground from '@/components/ocean/ocean';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GameProvider } from '@/lib/providers/game-provider';
import { OrgansProvider } from '@/lib/providers/organ-provider';
import { Point } from '@/models/point.type';
import { CorpPanel } from './corp-panel';
import ElementDialog from '@/components/ocean/element-dialog';

export default function Page() {
  const points: Point[] = [
    {
      id: 1,
      topPrct: 25,
      leftPrct: 50,
      seaElementProps: {
        id: 1,
        description: 'blablabla',
        question: 'hein ?',
        onAnswer: (gameProps) => {
          console.log(gameProps);
        },
        isCorrect: true,
        sourcesLink: ['tamere.com'],
        title: 'Je suis le titre',
      },
    },
    {
      id: 2,
      topPrct: 50,
      leftPrct: 50,
      seaElementProps: {
        id: 1,
        description: 'blablabla',
        question: 'hein ?',
        onAnswer: (gameProps) => {
          console.log(gameProps);
        },
        isCorrect: true,
        sourcesLink: ['tamere.com'],
        title: 'Je suis le titre',
      },
    },
    {
      id: 3,
      topPrct: 100,
      leftPrct: 50,
      seaElementProps: {
        id: 1,
        description: 'blablabla',
        question: 'hein ?',
        onAnswer: (gameProps) => {
          console.log(gameProps);
        },
        isCorrect: true,
        sourcesLink: ['tamere.com'],
        title: 'Je suis le titre',
      },
    },
    {
      id: 4,
      topPrct: 0,
      leftPrct: 100,
      seaElementProps: {
        id: 1,
        description: 'blablabla',
        question: 'hein ?',
        onAnswer: (gameProps) => {
          console.log(gameProps);
        },
        isCorrect: true,
        sourcesLink: ['tamere.com'],
        title: 'Je suis le titre',
      },
    },
  ];

  return (
    <OrgansProvider>
      <GameProvider>
        <main className="grid h-screen lg:grid-cols-3">
          <ScrollArea className="col-span-2">
            <div className={'relative'}>
              <OceanBackground></OceanBackground>
              {points.map((point, idx) => (
                <ElementDialog point={point}>
                  <div
                    key={idx}
                    className={
                      'absolute z-[5000] h-2 w-2 -translate-x-1/2 -translate-y-full bg-orange-400'
                    }
                    style={{
                      top: `${point.topPrct}%`,
                      left: `${point.leftPrct}%`,
                    }}></div>
              </ElementDialog>   
              ))}
            </div>
          </ScrollArea>
          <CorpPanel />
        </main>
      </GameProvider>
    </OrgansProvider>
  );
}
