import Image from 'next/image';
import { getProgramWriteups, getGalleryImages, getTrainingSessions } from '@/lib/data/training';
import { ProgramGallery } from './program-gallery';

export const ProgramContent = async ({ programId }: { programId: string }) => {
  const [writeups, images, sessions] = await Promise.all([
    getProgramWriteups(programId),
    getGalleryImages(programId),
    getTrainingSessions(programId),
  ]);

  if (writeups.length === 0 && images.length === 0 && sessions.length === 0) {
    return (
      <div className="container py-16 text-center text-black/50">Content coming soon.</div>
    );
  }

  // Standalone program-level galleries (not tied to a specific write-up —
  // e.g. AGILE's "Flag-Off" carousel), grouped by their optional label.
  const groupEntries: [string, typeof images][] = [];
  for (const image of images) {
    const key = image.group ?? '';
    const existing = groupEntries.find(([label]) => label === key);
    if (existing) {
      existing[1].push(image);
    } else {
      groupEntries.push([key, [image]]);
    }
  }

  return (
    <div className="container space-y-16 py-12">
      {writeups.map((writeup) => (
        <div key={writeup.id} className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold">{writeup.title}</h2>
            <p className="mt-4 whitespace-pre-line text-justify leading-relaxed">
              {writeup.body}
            </p>
          </div>
          {writeup.images.length === 1 && (
            <div className="flex justify-center lg:w-1/3">
              <Image
                src={writeup.images[0].imageUrl}
                alt={writeup.title}
                width={400}
                height={300}
                className="rounded-xl object-cover shadow-lg"
              />
            </div>
          )}
          {writeup.images.length > 1 && (
            <div className="lg:w-1/3">
              <ProgramGallery
                variant="single"
                images={writeup.images.map((image) => image.imageUrl)}
              />
            </div>
          )}
        </div>
      ))}

      {groupEntries.map(([label, groupImages]) => (
        <div key={label || '_'}>
          {label && <h3 className="mb-4 text-lg font-semibold">{label}</h3>}
          <ProgramGallery images={groupImages.map((image) => image.imageUrl)} />
        </div>
      ))}

      {sessions.length > 0 && (
        <div className="grid items-center justify-center gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex h-[480px] w-full flex-col justify-center gap-3 rounded-lg bg-zinc-50 p-5"
            >
              <h3 className="text-lg font-semibold text-[#ef6e11]">{session.name}</h3>
              <p>{session.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
