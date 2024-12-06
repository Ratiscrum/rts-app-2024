import Header from '@/components/layouts/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full flex-col">
      <Header className="lg:fixed" />
      {children}
      {/* <Footer /> */}
    </main>
  );
}
