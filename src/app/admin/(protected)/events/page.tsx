import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getEvents } from '@/lib/data/events';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteEventButton } from './delete-button';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Events &amp; News</h1>
          <p className="mt-1 text-sm text-black/60">
            Powers the home page&apos;s events slider and list. An item either links
            out, or has its own article page (like /News/BAC).
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4" /> New
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Headline</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell data-label="Date">{event.date}</TableCell>
                <TableCell data-label="Headline" className="max-w-md truncate font-medium">
                  {event.headline}
                </TableCell>
                <TableCell data-label="Type">
                  <Badge variant={event.slug ? 'default' : 'secondary'}>
                    {event.slug ? 'Article' : 'Link'}
                  </Badge>
                </TableCell>
                <TableCell data-label="Order">{event.order}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/events/${event.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteEventButton id={event.id} headline={event.headline} />
                </TableCell>
              </TableRow>
            ))}
            {events.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-black/50">
                  No events yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
