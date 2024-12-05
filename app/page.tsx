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
        <p className="mb-8 mt-6 w-2/4 text-lg">
          Participez à une expérience de jeu unique avec un rat intelligent et
          un peu foufou sur les bords...
        </p>
        <Button
          className="motion-preset-pulse-sm w-1/2 motion-duration-[1800ms] motion-delay-[500ms]"
          asChild
          size={'lg'}
        >
          <Link href="/">
            Play here
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
