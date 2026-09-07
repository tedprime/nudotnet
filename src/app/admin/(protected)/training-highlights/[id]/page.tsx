import { notFound } from 'next/navigation';
import { getTrainingHighlightById } from '@/lib/data/training';
import { HighlightForm } from '../highlight-form';

export default async function EditTrainingHighlightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const highlight = await getTrainingHighlightById(id);
  if (!highlight) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Edit {highlight.title}</h1>
      <HighlightForm
        highlightId={highlight.id}
        imageUrl={highlight.imageUrl}
        defaultValues={{
          title: highlight.title,
          description: highlight.description,
          order: highlight.order,
        }}
      />
    </div>
  );
}
