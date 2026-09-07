import Image from 'next/image';
import Link from 'next/link';

// Deliberately minimal chrome for the public verification pages — a
// visitor landing here is confirming an identity, not browsing the
// marketing site, so the full nav (Solutions/Projects/Contact) is left out.
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-black/10 bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="TedPrime"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span className="text-sm font-semibold text-black">
              Official Staff Verification
            </span>
          </div>
          <Link href="/" className="text-sm font-medium text-black/60 hover:text-black">
            Visit tedprime.net →
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-black/10 bg-white py-6">
        <div className="container text-center text-xs text-black/50">
          © {new Date().getFullYear()} TedPrime. This page verifies TedPrime staff records.
        </div>
      </footer>
    </div>
  );
}
