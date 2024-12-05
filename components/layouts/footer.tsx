import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-6 dark:border-border">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col space-y-4 text-center sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <Image
              src="/favicon-192.png"
              alt="logo"
              width="25"
              height="25"
              className="mx-auto sm:mx-0"
            />
            <Link href="https://ratiscrum.fr/">
              <p className="text-sm text-muted-foreground transition hover:opacity-100">
                Copyright © Ratiscrum 🐀 - 2024
              </p>
            </Link>
          </div>
          <div>
            <p className="text-sm">Mais où se cache le fromage ... ? 🧀🦻🏼</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
