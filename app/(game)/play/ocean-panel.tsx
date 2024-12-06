import ElementDialog from '@/components/ocean/element-dialog';
import OceanBackground from '@/components/ocean/ocean';
import { cn } from '@/lib/utils/utils';
import { FC, useContext } from 'react';
import OceanElement from '@/components/ocean-element/ocean-element';
import { SeaElementsContext } from '@/lib/providers/sea-elements-provider';
import BeachBackground from '@/components/ocean/beach';
import { GameContext } from '@/lib/providers/game-provider';
import { organsLabelsWithPrefix } from '@/models/organs.type';
import { ArrowDown } from 'lucide-react';

type Props = {
  className?: string;
};

export const OceanPanel: FC<Props> = ({ className }) => {
  const elements = useContext(SeaElementsContext);
  const { organToHeal } = useContext(GameContext);

  return (
    <div>
      <div className={cn('relative h-full w-full border', className)}>
        <BeachBackground></BeachBackground>
        <OceanBackground></OceanBackground>
        {organToHeal && (
          <div className="motion-preset-compress left-4 right-4 top-20 z-50 hidden rounded-xl border-border bg-background p-2 text-center shadow lg:fixed">
            Cliquez sur un élément de l&apos;océan pour essayer de guérir{' '}
            <span className="font-bold">
              {organsLabelsWithPrefix[organToHeal]}
            </span>{' '}
            de Jean-Marc !
          </div>
        )}

        <div className="fixed bottom-16 left-1/2 z-50 flex -translate-x-1/2 animate-pulse justify-center rounded-xl border-border bg-background p-2 text-center shadow">
          Continuez de fouiller <ArrowDown className="ml-2" />
        </div>
        {elements.map(async (seaElementContent, idx) => {
          return (
            <ElementDialog
              key={idx}
              point={seaElementContent.seaElementProps}
              mdx={seaElementContent.mdx as object}
            >
              <div>
                <OceanElement
                  lottieSource={
                    '/animations/' +
                    seaElementContent.seaElementProps.lottieName
                  }
                  imageSource={
                    '/images/' + seaElementContent.seaElementProps.imageName
                  }
                  topPrct={seaElementContent.seaElementProps.topPrct}
                  leftPrct={seaElementContent.seaElementProps.leftPrct}
                  className={'h-20 w-20'}
                  name={seaElementContent.seaElementProps.title}
                ></OceanElement>
              </div>
            </ElementDialog>
          );
        })}
      </div>
    </div>
  );
};
