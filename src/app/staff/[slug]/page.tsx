import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { ComponentType } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Building2,
  Mail,
  Phone,
} from 'lucide-react';
import { getStaffBySlug } from '@/lib/data/staff';

const STATUS_CONFIG = {
  ACTIVE: {
    label: 'Verified Active Staff Member',
    description: (name: string) =>
      `This record confirms ${name} is a current staff member of TedPrime.`,
    className: 'border-green-200 bg-green-50 text-green-700',
    Icon: CheckCircle2,
  },
  FORMER: {
    label: 'Former Staff — Record Inactive',
    description: (name: string) =>
      `${name} is no longer a staff member of TedPrime. This record is kept for reference only.`,
    className: 'border-gray-200 bg-gray-100 text-gray-600',
    Icon: Clock,
  },
  SUSPENDED: {
    label: 'Record Not Currently Valid',
    description: (name: string) =>
      `This record for ${name} is not currently valid. Please contact TedPrime directly to confirm.`,
    className: 'border-red-200 bg-red-50 text-red-700',
    Icon: XCircle,
  },
} as const;

const EMPLOYMENT_LABEL = {
  FULL_TIME: 'Full-Time',
  PART_TIME: 'Part-Time',
  CONTRACT: 'Contract',
} as const;

export default async function StaffProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staff = await getStaffBySlug(slug);
  if (!staff) notFound();

  const status = STATUS_CONFIG[staff.status];
  const tenureYears = new Date().getFullYear() - staff.startDate.getFullYear();
  const tenureLabel =
    tenureYears <= 0 ? 'Less than a year' : `${tenureYears} year${tenureYears === 1 ? '' : 's'}`;
  const initials = staff.fullName
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="py-12 lg:py-16">
      <div className="container max-w-2xl">
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${status.className}`}>
          <status.Icon className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">{status.label}</p>
        </div>

        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-gray-100">
              {staff.photoUrl ? (
                <Image
                  src={staff.photoUrl}
                  alt={staff.fullName}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-[#ef6e11]/40 text-2xl font-bold text-white">
                  {initials}
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#ef6e11]">
                Authoritative Staff Record
              </p>
              <h1 className="mt-1 text-2xl font-bold text-black">{staff.fullName}</h1>
              <p className="text-black/60">{staff.title}</p>
              <p className="mt-1 text-sm text-black/50">{staff.department}</p>
            </div>
          </div>

          {staff.bio && (
            <p className="mt-6 text-sm leading-relaxed text-black/70">{staff.bio}</p>
          )}

          <div className="mt-8 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-2">
            <InfoRow icon={Building2} label="Staff ID" value={staff.staffId} mono />
            <InfoRow icon={MapPin} label="Location" value={staff.location} />
            <InfoRow
              icon={Clock}
              label="Tenure"
              value={`Since ${staff.startDate.getFullYear()} · ${tenureLabel}`}
            />
            <InfoRow
              icon={Building2}
              label="Employment"
              value={EMPLOYMENT_LABEL[staff.employmentType]}
            />
            {staff.email && <InfoRow icon={Mail} label="Email" value={staff.email} />}
            {staff.phone && <InfoRow icon={Phone} label="Phone" value={staff.phone} />}
          </div>

          <p className="mt-8 border-t border-black/10 pt-6 text-xs leading-relaxed text-black/50">
            {status.description(staff.fullName)} If you have questions about this record,
            contact TedPrime directly rather than relying solely on this page.
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-black/40" />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-black/40">{label}</p>
        <p className={`text-sm text-black ${mono ? 'font-mono' : ''}`}>{value}</p>
      </div>
    </div>
  );
}
