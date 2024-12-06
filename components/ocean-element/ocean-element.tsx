'use client';

import { CSSProperties, useEffect, useRef } from 'react';
import lottie from 'lottie-web';

type OceanElementProps = {
  lottieSource: string | null;
  imageSource: string | null;
  className?: string;
  style?: CSSProperties;
};

export default function OceanElement({
  lottieSource,
  imageSource,
  className,
  style,
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
      style={style}
      className={className + ' h-20 w-20'}
    ></div>
  );
}
