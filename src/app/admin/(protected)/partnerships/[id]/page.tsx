import { notFound } from 'next/navigation';
import { getPartnerLogoById } from '@/lib/data/partnerships';
import { PartnerForm } from '../partner-form';

export default async function EditPartnerLogoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const logo = await getPartnerLogoById(id);
  if (!logo) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Edit {logo.alt}</h1>
      <PartnerForm
        logoId={logo.id}
        imageUrl={logo.imageUrl}
        defaultValues={{ alt: logo.alt, order: logo.order }}
      />
    </div>
  );
}
