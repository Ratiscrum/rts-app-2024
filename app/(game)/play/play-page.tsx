'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Point } from '@/models/point.type';
import { FC } from 'react';
import { CorpPanel } from './corp-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OceanPanel } from './ocean-panel';

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

export const PlayPage: FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Tabs defaultValue="corp" className="h-full w-full">
        <TabsContent value="corp" className="flex-1">
          <CorpPanel />
        </TabsContent>
        <TabsContent value="ocean" className="flex-1">
          <ScrollArea className="flex-1">
            <OceanPanel points={points} />
          </ScrollArea>
        </TabsContent>
        <TabsList className="w-full">
          <TabsTrigger value="corp" className="w-full">
            Corp humain
          </TabsTrigger>
          <TabsTrigger value="ocean" className="w-full">
            Océan
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  } else {
    return (
      <main className="grid h-screen lg:grid-cols-3">
        <ScrollArea className="col-span-2">
          <OceanPanel points={points} />
        </ScrollArea>
        <CorpPanel />
      </main>
    );
  }
};
