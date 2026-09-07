import { notFound } from 'next/navigation';
import { getProgramById, getProgramWriteupById } from '@/lib/data/training';
import { ProgramNav } from '../../program-nav';
import { WriteupForm } from '../writeup-form';
import { WriteupImages } from '../writeup-images';

export default async function EditWriteupPage({
  params,
}: {
  params: Promise<{ id: string; writeupId: string }>;
}) {
  const { id, writeupId } = await params;
  const [program, writeup] = await Promise.all([
    getProgramById(id),
    getProgramWriteupById(writeupId),
  ]);
  if (!program || !writeup) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">{program.name}</h1>
      <ProgramNav programId={id} />
      <h2 className="mt-6 text-lg font-semibold text-black">Edit {writeup.title}</h2>
      <WriteupForm
        programId={id}
        writeupId={writeup.id}
        defaultValues={{ title: writeup.title, body: writeup.body, order: writeup.order }}
      />
      <WriteupImages
        programId={id}
        writeupId={writeup.id}
        images={writeup.images.map((image) => ({ id: image.id, imageUrl: image.imageUrl }))}
      />
    </div>
  );
}
