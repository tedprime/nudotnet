import { notFound } from 'next/navigation';
import { getEventById } from '@/lib/data/events';
import { EventForm } from '../event-form';

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Edit {event.headline}</h1>
      <EventForm
        eventId={event.id}
        imageUrl={event.imageUrl}
        defaultValues={{
          date: event.date,
          headline: event.headline,
          description: event.description,
          order: event.order,
          hasArticle: Boolean(event.slug),
          slug: event.slug ?? '',
          body: event.body ?? '',
          link: event.link ?? '',
          external: event.external,
        }}
      />
    </div>
  );
}
