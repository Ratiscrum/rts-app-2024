'use client';

import { CSSProperties, useEffect, useRef } from 'react';
import lottie from 'lottie-web';

type OceanElementProps = {
  lottieSource: string | null;
  imageSource: string | null;
  topPrct: number;
  leftPrct: number;
  className?: CSSProperties;
};

export default function OceanElement({
  lottieSource,
  imageSource,
  topPrct,
  leftPrct,
  className,
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
    <div
      ref={animationContainer}
      style={{
        top: `${topPrct}%`,
        left: `${leftPrct}%`,
      }}
      className={
        'absolute z-[5000] -translate-x-1/2 -translate-y-full ' + className
      }
    ></div>
  );
}
