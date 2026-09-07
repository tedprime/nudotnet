import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/lib/data/events';

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event || !event.body) notFound();

  const paragraphs = event.body.split('\n\n').filter(Boolean);

  return (
    <div className="container flex w-full flex-col items-center justify-center gap-4 py-24">
      <h1 className="w-[80%] text-center text-3xl font-bold">{event.headline}</h1>
      <div className="flex w-[90%] flex-col items-center justify-center gap-2 text-left">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="w-full">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
