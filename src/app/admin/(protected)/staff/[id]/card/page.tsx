import { notFound } from 'next/navigation';
import { getStaffById } from '@/lib/data/staff';
import { StaffIdCard } from '@/components/admin/staff-id-card';
import { PrintButton } from './print-button';

export default async function StaffCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const staff = await getStaffById(id);
  if (!staff) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const profileUrl = `${siteUrl}/staff/${staff.slug}`;

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <h1 className="text-2xl font-semibold text-black">ID Card — {staff.fullName}</h1>
        <PrintButton />
      </div>

      <StaffIdCard
        fullName={staff.fullName}
        title={staff.title}
        staffId={staff.staffId}
        photoUrl={staff.photoUrl}
      />

      <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 print:hidden">
        <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
          Write this URL to the card&apos;s NFC chip
        </p>
        <p className="mt-2 break-all rounded-lg bg-gray-50 p-3 font-mono text-sm text-black">
          {profileUrl}
        </p>
        <p className="mt-2 text-xs text-black/50">
          Use any NFC-writer phone app (e.g. NFC Tools) to write this as a URL/NDEF
          record onto the card&apos;s chip — a tap then opens the profile directly.
        </p>
      </div>
    </div>
  );
}
