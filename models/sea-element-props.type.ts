import { Organs } from '@/models/organs.type';

export type SeaElementProps = {
  title: string;
  description: string;
  organ: Organs;
  topPrct: number;
  lottieName?: string;
  imageName?: string;
};
