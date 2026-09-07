import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Plus } from 'lucide-react';
import { getProgramById, getGalleryImages } from '@/lib/data/training';
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
import { ProgramNav } from '../program-nav';
import { DeleteGalleryImageButton } from './delete-button';

export default async function ProgramGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(id);
  if (!program) notFound();

  const images = await getGalleryImages(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">{program.name}</h1>
      <ProgramNav programId={id} />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-black/60">This program&apos;s photo gallery.</p>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href={`/admin/programs/${id}/gallery/new`}>
            <Plus className="h-4 w-4" /> Add Image
          </Link>
        </Button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.map((image) => (
              <TableRow key={image.id}>
                <TableCell data-label="Photo">
                  <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={image.imageUrl}
                      alt=""
                      width={64}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell data-label="Group">
                  {image.group ? (
                    <Badge variant="secondary">{image.group}</Badge>
                  ) : (
                    <span className="text-black/40">—</span>
                  )}
                </TableCell>
                <TableCell data-label="Order">{image.order}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/programs/${id}/gallery/${image.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteGalleryImageButton programId={id} imageId={image.id} />
                </TableCell>
              </TableRow>
            ))}
            {images.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-black/50">
                  No images yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
