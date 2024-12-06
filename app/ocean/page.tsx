import OceanBackground from '@/components/ocean/ocean';
import { Point } from '@/models/point.type';

export default function SeaPage() {
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
    <div className={'flex flex-col'}>
      <h1>Sea page</h1>
      <div className={'relative w-full'}>
        <OceanBackground></OceanBackground>
        {points.map((point, idx) => (
          <div
            key={idx}
            className={
              'absolute z-[5000] h-2 w-2 -translate-x-1/2 -translate-y-full bg-orange-400'
            }
            style={{
              top: `${point.topPrct}%`,
              left: `${point.leftPrct}%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
