'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { FC, useContext } from 'react';
import { CorpPanel } from './corp-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OceanPanel } from './ocean-panel';
import { Tab, TabContext } from '@/lib/providers/tab-provider';
import { cn } from '@/lib/utils/utils';
import { SeaElementContent } from '@/models/seaElementContent';

type Props = {
  elements: SeaElementContent[];
};

export const PlayPage: FC<Props> = ({ elements }) => {
  const isMobile = useIsMobile();
  const { tab, setTab } = useContext(TabContext);

  if (isMobile) {
    return (
      <Tabs
        value={tab}
        onValueChange={(tab) => setTab(tab as Tab)}
        className="flex h-full w-full flex-1 flex-col overflow-x-hidden"
      >
        <TabsContent value="corp" className="flex-1">
          <CorpPanel />
        </TabsContent>
        <TabsContent value="ocean" className="flex-1">
          <ScrollArea className="h-[calc(100vh-130px)]">
            <OceanPanel className="w-full" elements={elements} />
          </ScrollArea>
        </TabsContent>
        <TabsList className="fixed bottom-0 mt-2 w-full">
          <TabsTrigger value="corp" className="w-full">
            Corp humain
          </TabsTrigger>
          <TabsTrigger
            value="ocean"
            className={cn('w-full', tab !== 'ocean' && 'animate-glow-infinite')}
          >
            Océan
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  } else {
    return (
      <main className="grid h-screen grid-cols-3">
        <ScrollArea className="col-span-2">
          <OceanPanel elements={elements} />
        </ScrollArea>
        <CorpPanel />
      </main>
    );
  }
};
