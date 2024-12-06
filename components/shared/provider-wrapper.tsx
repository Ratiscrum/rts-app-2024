'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import { FC, ReactNode } from 'react';
import { UserProvider } from '../../lib/providers/user-provider';

interface ProviderWrapperProps {
  children: ReactNode;
}

export const ProviderWrapper: FC<ProviderWrapperProps> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="ocean"
      themes={['ocean']}
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={false}>
        <UserProvider>{children}</UserProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
};
