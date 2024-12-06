'use client';

import { Activity, Bone, BrainIcon, Droplet, Eye, ScanEye } from 'lucide-react';
import Heart from './svg/heart';
import Silhouette from './svg/silhouette';
import Rein from './svg/rein';
import Intestin from './svg/intestin';
import { Organ } from './organ';
import { useContext } from 'react';
import { OrgansContext } from '@/lib/providers/organ-provider';
import { Button } from './ui/button';

export const Corp = () => {
  const { updateOrgan } = useContext(OrgansContext);

  return (
    <>
      <div className="relative aspect-[1/2.2] w-64">
        <Silhouette className="w-76 top-0 h-full w-full" />
        <Organ
          name="heart"
          title="Coeur"
          className="absolute right-[38%] top-[23%]"
        >
          <Heart className="h-6" />
        </Organ>
        <Organ
          name="eyes"
          title="Yeux"
          className="absolute left-1/2 top-[5%] -translate-x-1/2"
        >
          <div className="flex gap-0.5">
            <Eye className="h-5" />
            <Eye className="h-5" />
          </div>
        </Organ>
        <Organ
          name="brain"
          title="Cerveau"
          className="absolute left-1/2 top-[1%] -translate-x-1/2"
        >
          <BrainIcon />
        </Organ>
        <Organ
          name="rein"
          title="Rhin"
          className="absolute left-[28%] top-[43%]"
        >
          <Rein className="h-8" />
        </Organ>
        <Organ
          name="nerves"
          title="Système nerveux"
          className="absolute left-1/2 top-[30%] -translate-x-1/2"
        >
          <Activity />
        </Organ>
        <Organ
          name="bone"
          title="Os"
          className="absolute right-[33%] top-[70%]"
        >
          <Bone />
        </Organ>
        <Organ
          name="sweat"
          title="Sueur"
          className="absolute right-[36%] top-[2%]"
        >
          <Droplet />
        </Organ>
        <Organ
          name="intestin"
          title="Système digestif"
          className="absolute left-1/2 top-[38%] -translate-x-1/2"
        >
          <Intestin className="h-10" />
        </Organ>
        <Organ
          name="tissue"
          title="Peau"
          className="absolute right-[18%] top-[34%]"
        >
          <ScanEye />
        </Organ>
        {/* <Hair className="absolute left-1/2 top-0 h-4 -translate-x-1/2 text-white" /> */}
      </div>

      <Button
        onClick={() => {
          updateOrgan('heart', 'hurt');
        }}
      >
        Casser le coeur
      </Button>
    </>
  );
};
