import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { getAboutGalleryImages } from '@/lib/data/sections';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteAboutGalleryImageButton } from './delete-button';

export default async function AboutGalleryPage() {
  const images = await getAboutGalleryImages();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">About Gallery</h1>
          <p className="mt-1 text-sm text-black/60">
            The &quot;Who We Are&quot; image carousel, shown on / and /about.
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/about-gallery/new">
            <Plus className="h-4 w-4" /> Add Image
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Alt Text</TableHead>
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
                      alt={image.alt}
                      width={64}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell data-label="Alt Text">{image.alt}</TableCell>
                <TableCell data-label="Order">{image.order}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/about-gallery/${image.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteAboutGalleryImageButton id={image.id} />
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
