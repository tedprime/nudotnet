import { notFound } from 'next/navigation';
import { getStaffById } from '@/lib/data/staff';
import { StaffForm } from '../staff-form';

export default async function EditStaffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const staff = await getStaffById(id);
  if (!staff) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Edit {staff.fullName}</h1>
      <StaffForm
        staffId={staff.id}
        photoUrl={staff.photoUrl}
        defaultValues={{
          fullName: staff.fullName,
          slug: staff.slug,
          staffId: staff.staffId,
          title: staff.title,
          department: staff.department,
          location: staff.location,
          employmentType: staff.employmentType,
          status: staff.status,
          startDate: staff.startDate.toISOString().slice(0, 10),
          bio: staff.bio ?? '',
          email: staff.email ?? '',
          phone: staff.phone ?? '',
          featured: staff.featured,
        }}
      />
    </div>
  );
}
