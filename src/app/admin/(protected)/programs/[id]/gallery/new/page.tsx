import { notFound } from 'next/navigation';
import { getProgramById } from '@/lib/data/training';
import { ProgramNav } from '../../program-nav';
import { GalleryForm } from '../gallery-form';

export default async function NewGalleryImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(id);
  if (!program) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">{program.name}</h1>
      <ProgramNav programId={id} />
      <h2 className="mt-6 text-lg font-semibold text-black">Add Gallery Image</h2>
      <GalleryForm programId={id} />
    </div>
  );
}
