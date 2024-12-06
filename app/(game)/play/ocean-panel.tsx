import ElementDialog from '@/components/ocean/element-dialog';
import OceanBackground from '@/components/ocean/ocean';
import { cn } from '@/lib/utils/utils';
import { Point } from '@/models/point.type';
import { FC } from 'react';

type Props = {
  points: Point[];
  className?: string;
};

export const OceanPanel: FC<Props> = ({ points, className }) => {
  return (
    <div className={cn('relative', className)}>
      <OceanBackground></OceanBackground>
      {points.map((point, idx) => (
        <ElementDialog point={point} key={idx}>
          <div
            className={
              'absolute z-[5000] h-2 w-2 -translate-x-1/2 -translate-y-full bg-orange-400'
            }
            style={{
              top: `${point.topPrct}%`,
              left: `${point.leftPrct}%`,
            }}
          ></div>
        </ElementDialog>
      ))}
    </div>
  );
};
