import { notFound } from 'next/navigation';
import { getProgramById, getGalleryImageById } from '@/lib/data/training';
import { ProgramNav } from '../../program-nav';
import { GalleryForm } from '../gallery-form';

export default async function EditGalleryImagePage({
  params,
}: {
  params: Promise<{ id: string; imageId: string }>;
}) {
  const { id, imageId } = await params;
  const [program, image] = await Promise.all([
    getProgramById(id),
    getGalleryImageById(imageId),
  ]);
  if (!program || !image) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">{program.name}</h1>
      <ProgramNav programId={id} />
      <h2 className="mt-6 text-lg font-semibold text-black">Edit Gallery Image</h2>
      <GalleryForm
        programId={id}
        imageId={image.id}
        imageUrl={image.imageUrl}
        defaultValues={{ group: image.group ?? '', order: image.order }}
      />
    </div>
  );
}
