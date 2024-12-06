'use client';

import WavesurferPlayer from '@wavesurfer/react';
import { FC, useState } from 'react';
import { Button } from './ui/button';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

export type WaveformPlayerProps = {
  className?: string;
  showButton?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onTimeupdate?: (time: number) => void;
};

export const WaveformPlayer: FC<WaveformPlayerProps & { audio: string }> = ({
  className,
  audio,
  showButton = true,
  onPause,
  onPlay,
}) => {
  const [wavesurfer, setWavesurfer] = useState<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  if (!audio) return null;

  const onReady = (ws: any) => {
    setWavesurfer(ws);
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {showButton && (
        <Button
          onClick={() => wavesurfer && wavesurfer.playPause()}
          size="icon"
          className="rounded-full"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      )}

      <div className="flex-1">
        <WavesurferPlayer
          height={50}
          barWidth={2}
          barGap={2}
          waveColor="#94a3b8"
          progressColor="#93c5fd"
          url={audio}
          onReady={onReady}
          onPlay={() => {
            setIsPlaying(true);
            if (onPlay) {
              onPlay();
            }
          }}
          onPause={() => {
            if (onPause) {
              onPause();
            }
            setIsPlaying(false);
          }}
          onInteraction={() => wavesurfer && wavesurfer.play()}
          onFinish={() => {
            if (wavesurfer) {
              wavesurfer.seekTo(0);
            }
            setIsPlaying(false);
          }}
        />
      </div>
    </div>
  );
};
