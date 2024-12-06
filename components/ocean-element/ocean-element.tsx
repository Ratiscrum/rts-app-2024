'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type OceanElementProps = {
  lottieSource: string | null;
  imageSource: string | null;
  topPrct: number;
  leftPrct: number;
  className?: string;
  name?: string;
};

export default function OceanElement({
  lottieSource,
  imageSource,
  topPrct,
  leftPrct,
  className,
  name,
}: OceanElementProps) {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (lottieSource) {
      lottie.loadAnimation({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: lottieSource,
      });
    } else {
      console.log(imageSource);
    }
  }, [lottieSource]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={animationContainer}
          style={{
            top: `calc(${topPrct}%)`,
            left: `${leftPrct}%`,
          }}
          className={
            'absolute z-[49] -translate-x-1/2 -translate-y-full transition-all hover:scale-110 hover:brightness-110 ' +
            className
          }
        ></div>
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
}
