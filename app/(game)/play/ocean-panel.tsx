import ElementDialog from '@/components/ocean/element-dialog';
import OceanBackground from '@/components/ocean/ocean';
import { cn } from '@/lib/utils/utils';
import { FC } from 'react';
import OceanElement from '@/components/ocean-element/ocean-element';
import { SeaElementContent } from '@/models/seaElementContent';
import BeachBackground from '@/components/ocean/beach';

type Props = {
  className?: string;
  seaElementsContent: SeaElementContent[];
};

export const OceanPanel: FC<Props> = ({ className, seaElementsContent }) => {
  return (
    <div className={'md:pt-16'}>
      <div className={cn('relative h-full w-full border', className)}>
        <BeachBackground></BeachBackground>
        <OceanBackground></OceanBackground>
        {seaElementsContent.map(async (seaElementContent, idx) => {
          return (
            <ElementDialog key={idx} point={seaElementContent.seaElementProps}>
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
                  leftPrct={50}
                  className={'h-20 w-20'}
                ></OceanElement>
              </div>
            </ElementDialog>
          );
        })}
      </div>
    </div>
  );
};
