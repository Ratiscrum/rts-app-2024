import RatiLogo from '@/components/shared/rati-logo';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-grow flex-col items-center px-4">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <RatiLogo size="md" />
        <h2 className="mt-8 text-primary">Allons sauver l&apos;océan</h2>
        <p className="mb-8 mt-6 w-2/4 text-lg">
          Jean Marc est tombé dans un océan magique et sa santé s&apos;est liée
          à celle de l&apos;océan. Une seule solution pour guérir Jean Marc :
          sauver l&apos;océan.
        </p>
        <Button
          className="motion-preset-pulse-sm w-1/2 motion-duration-[1800ms] motion-delay-[500ms]"
          asChild
          size={'lg'}
        >
          <Link href="/play">
            À l&apos;abordage
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
        <Label className="motion-preset-typewriter-[37] mt-4 text-sm text-muted-foreground repeat-[2] motion-duration-[4000ms] motion-delay-[1000ms]">
          N&apos;oubliez pas de demander du pain 🥖
        </Label>
      </div>
    </div>
  );
}