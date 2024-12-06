import ElementDialog from '@/components/ocean/element-dialog';
import OceanBackground from '@/components/ocean/ocean';
import { cn } from '@/lib/utils/utils';
import { FC, useContext } from 'react';
import OceanElement from '@/components/ocean-element/ocean-element';
import BeachBackground from '@/components/ocean/beach';
import { GameContext } from '@/lib/providers/game-provider';
import { organsLabelsWithPrefix } from '@/models/organs.type';
import { ArrowDown } from 'lucide-react';
import { SeaElementContent } from '@/models/seaElementContent';

type Props = {
  className?: string;
  elements: SeaElementContent[];
};

export const OceanPanel: FC<Props> = ({ className, elements }) => {
  const { organToHeal } = useContext(GameContext);

  return (
    <div>
      <div className={cn('relative h-full w-full border', className)}>
        <BeachBackground></BeachBackground>
        <OceanBackground></OceanBackground>
        {organToHeal && (
          <div className="motion-preset-compress left-4 right-4 top-20 z-50 hidden rounded-xl border-border bg-background p-2 text-center shadow lg:fixed">
            Cliquez sur un élément de l&apos;océan pour essayer de guérir{' '}
            <span className="font-bold">
              {organsLabelsWithPrefix[organToHeal]}
            </span>{' '}
            de Jean-Marc !
          </div>
        )}

        <div className="fixed bottom-16 left-1/2 z-50 flex -translate-x-1/2 animate-pulse justify-center rounded-xl border-border bg-background p-2 text-center shadow">
          Continuez de fouiller <ArrowDown className="ml-2" />
        </div>
        {elements.map(async (seaElementContent, idx) => {
          return (
            <ElementDialog
              key={idx}
              point={seaElementContent.seaElementProps}
              mdx={seaElementContent.mdx as object}
            >
              <div>
                <OceanElement
                  lottieSource={
                    '/animations/' +
                    seaElementContent.seaElementProps.lottieName
                  }
                  imageSource={
                    '/images/' + seaElementContent.seaElementProps.imageName
                  }
                  topPrct={seaElementContent.seaElementProps.topPrct}
                  leftPrct={seaElementContent.seaElementProps.leftPrct}
                  className={'h-20 w-20'}
                  name={seaElementContent.seaElementProps.title}
                ></OceanElement>
              </div>
            </ElementDialog>
          );
        })}
      </div>
    </div>
  );
};

// 'use client';
//
// import ElementDialog from '@/components/ocean/element-dialog';
// import OceanBackground from '@/components/ocean/ocean';
// import { cn } from '@/lib/utils/utils';
// import { FC, useContext, useEffect, useRef, useState } from 'react';
// import OceanElement from '@/components/ocean-element/ocean-element';
// import { SeaElementsContext } from '@/lib/providers/sea-elements-provider';
// import BeachBackground from '@/components/ocean/beach';
// import { GameContext } from '@/lib/providers/game-provider';
// import { organsLabelsWithPrefix } from '@/models/organs.type';
// import { ArrowDown } from 'lucide-react';
// import { BottleModeContext } from '@/lib/providers/bottle-mode-provider';
// import {Button} from "@/components/ui/button";
//
// type Props = {
//   className?: string;
// };
//
// export const OceanPanel: FC<Props> = ({ className }) => {
//   const elements = useContext(SeaElementsContext);
//   const { organToHeal } = useContext(GameContext);
//
//   const { isBottleMode, setBottleMode } = useContext(BottleModeContext);
//
//   const manageBottleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
//     if (!isBottleMode) return;
//
//     const x = event.clientX;
//     const y = event.clientY - 65;
//
//     // Calculate the percentage
//     const xPercent = (x / size.width) * 100;
//     const yPercent = (y / size.height) * 100;
//
//     // Ask the user which message he wants to send
//     const message = prompt('Quel message veux-tu envoyer ?');
//
//     postData(message!, xPercent, yPercent);
//   };
//
//   const divRef = useRef<HTMLDivElement>(null);
//   const [size, setSize] = useState({ width: 0, height: 0 });
//
//   useEffect(() => {
//     if (divRef.current) {
//       const rect = divRef.current.getBoundingClientRect();
//       setSize({ width: rect.width, height: rect.height });
//     }
//   }, []); // Runs once when the component mounts
//
//   const postData = async (message: string, x: number, y: number) => {
//     try {
//       const response = await fetch(
//         `https://api.ratiblue.ratiscrum.fr/bottles`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ message, x, y }),
//         },
//       );
//
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//
//       const data = await response.json();
//       console.log('Response data:', data);
//       return data;
//     } catch (error) {
//       console.error('Error posting data:', error);
//       throw error;
//     }
//   };
//
//   return (
//     <div className={cn('relative h-full w-full border', className)}>
//     <div className={'md:pt-16'}>
//       <Button
//         type={'button'}
//         className={'z-20'}
//         onClick={() => {
//           setBottleMode(!isBottleMode);
//         }}
//       >
//         {isBottleMode
//           ? 'Clique dans la mer pour jeter ta bouteille'
//           : 'Clique ici pour prendre une bouteille'}
//       </Button>
//       <div
//         ref={divRef}
//         className={cn('relative h-full w-full border', className)}
//         onClick={(e) => manageBottleClick(e)}
//       >
//         <BeachBackground></BeachBackground>
//         <OceanBackground></OceanBackground>
//         {organToHeal && (
//           <div className="motion-preset-compress left-4 right-4 top-20 z-50 hidden rounded-xl border-border bg-background p-2 text-center shadow lg:fixed">
//             Cliquez sur un élément de l&apos;océan pour essayer de guérir{' '}
//             <span className="font-bold">
//               {organsLabelsWithPrefix[organToHeal]}
//             </span>{' '}
//             de Jean-Marc !
//           </div>
//         )}
//
//         <div className="fixed bottom-16 left-1/2 z-50 flex -translate-x-1/2 animate-pulse justify-center rounded-xl border-border bg-background p-2 text-center shadow">
//           Continuez de fouiller <ArrowDown className="ml-2" />
//         </div>
//         {elements.map(async (seaElementContent, idx) => {
//           return (
//             <ElementDialog
//               key={idx}
//               point={seaElementContent.seaElementProps}
//               mdx={seaElementContent.mdx as object}
//             >
//               <div>
//                 <OceanElement
//                   lottieSource={
//                     '/animations/' +
//                     seaElementContent.seaElementProps.lottieName
//                   }
//                   imageSource={
//                     '/images/' + seaElementContent.seaElementProps.imageName
//                   }
//                   topPrct={seaElementContent.seaElementProps.topPrct}
//                   leftPrct={seaElementContent.seaElementProps.leftPrct}
//                   className={'h-20 w-20'}
//                   name={seaElementContent.seaElementProps.title}
//                 ></OceanElement>
//               </div>
//             </ElementDialog>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
