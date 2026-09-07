import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { getAllPageHeroes } from '@/lib/data/hero';
import { HERO_PAGE_LABELS } from './schema';
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
import { DeletePageHeroButton } from './delete-button';

export default async function PageHeroesPage() {
  const heroes = await getAllPageHeroes();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Page Heroes</h1>
          <p className="mt-1 text-sm text-black/60">
            The home page&apos;s multi-slide hero, plus the single hero on each other page.
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/hero/new">
            <Plus className="h-4 w-4" /> New Hero
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Page</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Eyebrow</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heroes.map((hero) => (
              <TableRow key={hero.id}>
                <TableCell data-label="Image">
                  <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={hero.image}
                      alt=""
                      width={64}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell data-label="Page">
                  <Badge variant="secondary">{HERO_PAGE_LABELS[hero.page] ?? hero.page}</Badge>
                </TableCell>
                <TableCell data-label="Order">{hero.order}</TableCell>
                <TableCell data-label="Eyebrow">{hero.eyebrow}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/hero/${hero.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeletePageHeroButton id={hero.id} />
                </TableCell>
              </TableRow>
            ))}
            {heroes.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-black/50">
                  No heroes yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
