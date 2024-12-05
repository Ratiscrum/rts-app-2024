'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/utils';
import RatiLogo from '../shared/rati-logo';
import { ThemeToggle } from '../shared/theme-toggle';
import { MobileSidebar } from './mobile-sidebar';
import { SidebarTrigger } from '../ui/sidebar';

const NavLinks = () => {
  const pathname = usePathname();
  const links = [
    { href: '/podcasts', label: 'Podcasts' },
    { href: '/ocean', label: 'Ocean' },
  ];

  return (
    <nav className="ml-10 hidden items-center gap-4 text-sm sm:flex xl:gap-6">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === link.href ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

// const ConnectedUserMenu = ({ avatarFallback }: { avatarFallback: string }) => (
//   <DropdownMenu>
//     <DropdownMenuTrigger>
//       <Avatar className="cursor-pointer">
//         <AvatarImage src="https://placekitten.com/40/40" alt="User Avatar" />
//         <AvatarFallback>{avatarFallback}</AvatarFallback>
//       </Avatar>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent className="z-50">
//       <DropdownMenuItem asChild>
//         <Link href="/profile">Profile</Link>
//       </DropdownMenuItem>
//       <DropdownMenuItem asChild>
//         <Link href="/logout">Logout</Link>
//       </DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>
// );

// const NotConnectedUserMenu = () => (
//   <div className="hidden gap-4 sm:flex">
//     <Button
//       className="border border-foreground bg-transparent text-foreground hover:bg-accent"
//       asChild
//     >
//       <Link href="/login">Sign in</Link>
//     </Button>
//     <Button asChild>
//       <Link href="/register">Sign up</Link>
//     </Button>
//   </div>
// );

export default function Header() {
  // const { user } = useUserContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 shadow backdrop-blur dark:border-border">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-2 lg:mr-6">
          <Link
            href="/"
            className="rounded-lg bg-transparent px-2 py-1 shadow-none hover:bg-slate-400/10"
          >
            <RatiLogo size="sm" />
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* {user && (
            <div className="hidden sm:block">
              <ConnectedUserMenu
                avatarFallback={user.fullName.substring(0, 2)}
              />
            </div>
          )}
          {!user && <NotConnectedUserMenu />} */}
          <MobileSidebar />
          <SidebarTrigger className="sm:hidden" />
        </div>
      </div>
    </header>
  );
}
