import OceanBackground from '@/components/ocean/ocean';
import getSeaElementContent from '@/actions/getSeaElementContent';
import { SeaElementContent } from '@/models/seaElementContent';
import OceanElement from '@/components/ocean-element/ocean-element';

export default function SeaPage() {
  const seaElementNames: string[] = [
    'algues',
    'courant',
    'eauClaire',
    'ecoMicrobiens',
    'estuaires',
    'marees',
    'recifsCalcaires',
    'recifsCoraliens',
    'salinite',
    'surface',
  ];

  const seaElementsContent: Promise<SeaElementContent>[] = seaElementNames.map(
    async (name) => {
      return await getSeaElementContent(name);
    },
  );

  return (
    <div className={'flex flex-col'}>
      <h1>Sea page</h1>
      <div className={'relative w-full'}>
        <OceanBackground></OceanBackground>
        {seaElementsContent.map(async (seaElementContent, idx) => (
          <OceanElement
            key={idx}
            lottieSource={'/animations/algues.json'}
            imageSource={null}
            topPrct={(await seaElementContent).seaElementProps.topPrct}
            leftPrct={50}
            className={'h-20 w-20'}
          ></OceanElement>
        ))}
      </div>
    </div>
  );
}
