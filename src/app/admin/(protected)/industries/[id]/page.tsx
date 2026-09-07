import { notFound } from 'next/navigation';
import { getIndustryById } from '@/lib/data/capabilities';
import { IndustryForm } from '../industry-form';

export default async function EditIndustryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const industry = await getIndustryById(id);
  if (!industry) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Edit {industry.title}</h1>
      <IndustryForm
        industryId={industry.id}
        defaultValues={{
          title: industry.title,
          description: industry.description,
          order: industry.order,
        }}
      />
    </div>
  );
}
