'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Error } from '@/components/ui/error';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Error message={error.message} className="container my-20 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Réessayer
        </Button>
        <Button variant={'secondary'} asChild>
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </Error>
  );
}
