export type Organs =
  | 'heart'
  | 'eyes'
  | 'brain'
  | 'rein'
  | 'nerves'
  | 'bone'
  | 'sweat'
  | 'intestin'
  | 'tissue';

export const organs = [
  'heart',
  'eyes',
  'brain',
  'rein',
  'nerves',
  'bone',
  'sweat',
  'intestin',
  'tissue',
];

export const organsLabels = {
  heart: 'Cœur',
  eyes: 'Yeux',
  brain: 'Cerveau',
  rein: 'Rein',
  nerves: 'Système nerveux',
  bone: 'Os',
  sweat: 'Sueur',
  intestin: 'Système digestif',
  tissue: 'Peau',
};

export const organsLabelsWithPrefix = {
  heart: 'le cœur',
  eyes: 'les yeux',
  brain: 'le cerveau',
  rein: 'les reins',
  nerves: 'le système nerveux',
  bone: 'les os',
  sweat: 'la sueur',
  intestin: 'le système digestif',
  tissue: 'la peau',
};
