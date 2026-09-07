import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';

// Chrome for the public marketing site only — /admin and /staff are
// separate top-level segments and don't inherit this layout.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
