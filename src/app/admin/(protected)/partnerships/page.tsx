import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { getPartnerLogos } from '@/lib/data/partnerships';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeletePartnerLogoButton } from './delete-button';

export default async function PartnershipsPage() {
  const logos = await getPartnerLogos();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Partnerships &amp; Collaborations</h1>
          <p className="mt-1 text-sm text-black/60">The home page&apos;s partner logo marquee.</p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/partnerships/new">
            <Plus className="h-4 w-4" /> Add Logo
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Alt Text</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logos.map((logo) => (
              <TableRow key={logo.id}>
                <TableCell data-label="Logo">
                  <div className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={logo.imageUrl}
                      alt={logo.alt}
                      width={56}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </TableCell>
                <TableCell data-label="Alt Text" className="font-medium">{logo.alt}</TableCell>
                <TableCell data-label="Order">{logo.order}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/partnerships/${logo.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeletePartnerLogoButton id={logo.id} alt={logo.alt} />
                </TableCell>
              </TableRow>
            ))}
            {logos.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-black/50">
                  No logos yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
