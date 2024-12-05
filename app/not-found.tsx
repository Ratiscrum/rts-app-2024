import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Error } from '@/components/ui/error';

export default function NotFound() {
  return (
    <Error
      title="Page introuvable"
      message="Nous n'avons pas trouvé la page que vous cherchiez"
      className="container my-20 space-y-8"
    >
      <div className="flex items-center gap-4">
        <Button asChild>
          <Link href="/">{"Retour à l'accueil"}</Link>
        </Button>
      </div>
    </Error>
  );
}
