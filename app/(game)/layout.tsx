import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header className="lg:fixed" />
      {children}
      <Footer />
    </main>
  );
}
