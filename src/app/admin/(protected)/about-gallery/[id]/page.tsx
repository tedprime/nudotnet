import { notFound } from 'next/navigation';
import { getAboutGalleryImageById } from '@/lib/data/sections';
import { GalleryForm } from '../gallery-form';

export default async function EditAboutGalleryImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const image = await getAboutGalleryImageById(id);
  if (!image) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Edit Gallery Image</h1>
      <GalleryForm
        imageId={image.id}
        imageUrl={image.imageUrl}
        defaultValues={{ alt: image.alt, order: image.order }}
      />
    </div>
  );
}
