import OceanBackground from '@/components/ocean/ocean';
import { Point } from '@/models/point.type';
import { FC } from 'react';

type Props = {
  points: Point[];
};

export const OceanPanel: FC<Props> = ({ points }) => {
  return (
    <div className={'relative'}>
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
  );
};
