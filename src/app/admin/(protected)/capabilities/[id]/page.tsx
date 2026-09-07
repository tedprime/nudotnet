import { notFound } from 'next/navigation';
import { getCapabilityById } from '@/lib/data/capabilities';
import { CapabilityForm } from '../capability-form';

export default async function EditCapabilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const capability = await getCapabilityById(id);
  if (!capability) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Edit {capability.title}</h1>
      <CapabilityForm
        capabilityId={capability.id}
        defaultValues={{
          section: capability.section,
          icon: capability.icon,
          title: capability.title,
          description: capability.description,
          order: capability.order,
        }}
      />
    </div>
  );
}
