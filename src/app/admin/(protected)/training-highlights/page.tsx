import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { getTrainingHighlights } from '@/lib/data/training';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteHighlightButton } from './delete-button';

export default async function TrainingHighlightsPage() {
  const highlights = await getTrainingHighlights();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Training Highlights</h1>
          <p className="mt-1 text-sm text-black/60">
            The home page&apos;s &quot;Training &amp; Capacity Development&quot; teaser carousel.
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/training-highlights/new">
            <Plus className="h-4 w-4" /> New Highlight
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {highlights.map((highlight) => (
              <TableRow key={highlight.id}>
                <TableCell data-label="Photo">
                  <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={highlight.imageUrl}
                      alt={highlight.title}
                      width={64}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell data-label="Title" className="font-medium">{highlight.title}</TableCell>
                <TableCell data-label="Order">{highlight.order}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/training-highlights/${highlight.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteHighlightButton id={highlight.id} title={highlight.title} />
                </TableCell>
              </TableRow>
            ))}
            {highlights.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-black/50">
                  No highlights yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
