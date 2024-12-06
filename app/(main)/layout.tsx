import type { Metadata } from 'next';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import { appName, appUrl, description } from '../manifest';

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
    <main className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="my-8 flex w-full max-w-screen-xl flex-1 flex-col px-4 lg:mx-auto lg:px-2">
        {children}
      </div>
      <Footer />
    </main>
  );
}
