import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils/utils';
import { ProviderWrapper } from '@/components/shared/provider-wrapper';
import { appName, appUrl, description } from './manifest';
import { WllamaProvider } from '@/lib/providers/llm-provider';

const inter = localFont({
  src: '../public/fonts/InterVariable.ttf',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: appName,
  metadataBase: new URL(appUrl),
  description: description,
  openGraph: {
    title: appName,
    description: description,
    url: appUrl,
    siteName: appName,
    images: [
      {
        url: `/og.png`,
        width: 800,
        height: 600,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  icons: {
    icon: `/favicon-512.png`,
    shortcut: `/favicon-192.png`,
    apple: `/favicon-512.png`,
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: `/favicon-512.png`,
    },
  },
  manifest: 'manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, 'font-sans')}>
        <WllamaProvider>
          <ProviderWrapper>{children}</ProviderWrapper>
        </WllamaProvider>
      </body>
    </html>
  );
}
