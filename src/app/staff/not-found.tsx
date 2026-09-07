import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function StaffNotFound() {
  return (
    <div className="py-24">
      <div className="container max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-7 w-7 text-red-500" />
        </div>
        <h1 className="mt-6 text-xl font-semibold text-black">No Record Found</h1>
        <p className="mt-2 text-sm text-black/60">
          We couldn&apos;t find a staff record at this link. If you believe this is an
          error, please contact TedPrime directly to verify.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-[#ef6e11] hover:underline"
        >
          Visit tedprime.net →
        </Link>
      </div>
    </div>
  );
}
