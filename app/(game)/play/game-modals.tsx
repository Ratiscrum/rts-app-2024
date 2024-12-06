'use client';

import Content from '@/components/content';
import { Button } from '@/components/ui/button';
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from '@/components/ui/credenza';
import { GameContext } from '@/lib/providers/game-provider';
import { SeaElementsContext } from '@/lib/providers/sea-elements-provider';
import { TabContext } from '@/lib/providers/tab-provider';
import { getRandomElement } from '@/lib/utils/utils';
import Link from 'next/link';
import { FC, useContext } from 'react';

const winWords = [
  'Bravo !',
  'Félicitations !',
  'Super !',
  'Excellent !',
  'Parfait !',
  'Génial !',
  'Fantastique !',
  'Magnifique !',
  'Exceptionnel !',
  'Sensationnel !',
  'Extraordinaire !',
  'Impressionnant !',
  'Inouï !',
  'Époustouflant !',
  'Stupéfiant !',
  'Prodigieux !',
  'Miraculeux !',
  'Merveilleux !',
  'Formidable !',
  'Remarquable !',
  'Étonnant !',
  'Surprenant !',
  'Épatant !',
  'Bluffant !',
  'Éblouissant !',
  'Éclatant !',
  'Rayonnant !',
  'Radieux !',
  'Ravissant !',
  'Splendide !',
  'Somptueux !',
  'Grandiose !',
  'Spectaculaire !',
  'Épique !',
  'Monumental !',
  'Colossal !',
  'Titanesque !',
  'Majestueux !',
  'Bien joué !',
  'Chapeau !',
  'Chapeau bas !',
  "Chapeau l'artiste !",
  "Bravo l'artiste !",
  'Bravo champion !',
  'Trop fort !',
  'Trop bien !',
  'GG !',
  'Meuch !',
];

const loseWords = [
  'Dommage !',
  'Pas de chance !',
  'Essaye encore !',
  'Ne lâche rien !',
  'Tu peux le faire !',
  'Peut mieux faire !',
  'Ratio',
  'Bonsoir non',
  'Tu as fait de ton mieux !',
  'Non',
  'Peut être une prochaine fois !',
  'Flop',
  'Meuch',
  'Jette',
  'Lâche ça',
  'Nul.',
  'Force à toi.',
  'Courage.',
  'Tu vas y arriver.',
  'Tant pis champis.',
];

export const GameModals: FC = () => {
  const { state, lastSelection, resetState } = useContext(GameContext);
  const elements = useContext(SeaElementsContext);
  const { setTab } = useContext(TabContext);
  const element = elements.find(
    (e) => e.seaElementProps.organ === lastSelection,
  );

  return (
    <>
      <Credenza open={state === 'lost'}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>{getRandomElement(loseWords)}</CredenzaTitle>
            <CredenzaDescription>
              {element?.seaElementProps.errorMessage}
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaFooter>
            <Button
              onClick={() => {
                resetState();
                setTab('ocean');
              }}
            >
              Je réessaye !
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>

      <Credenza open={state === 'win'}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>{getRandomElement(winWords)}</CredenzaTitle>
            <CredenzaDescription>Jean-Marc est guéri !</CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            <Content mdx={element?.mdx} />
          </CredenzaBody>
          <CredenzaFooter>
            <Button variant={'secondary'} asChild>
              <Link href={'/podcasts'}>Voir les podcasts</Link>
            </Button>
            <Button asChild>
              <Link href={'/play'}>Recommencer</Link>
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </>
  );
};
