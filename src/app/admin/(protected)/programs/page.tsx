import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteProgramButton } from './delete-button';

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    include: { _count: { select: { writeups: true, gallery: true, sessions: true } } },
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Programs</h1>
          <p className="mt-1 text-sm text-black/60">
            The training &amp; capacity programs shown as tabs on /projects.
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/programs/new">
            <Plus className="h-4 w-4" /> New Program
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell data-label="Name" className="font-medium">{program.name}</TableCell>
                <TableCell data-label="Slug" className="font-mono text-sm">{program.slug}</TableCell>
                <TableCell data-label="Content" className="text-sm text-black/60">
                  {program._count.writeups} write-up{program._count.writeups === 1 ? '' : 's'} ·{' '}
                  {program._count.gallery} photo{program._count.gallery === 1 ? '' : 's'} ·{' '}
                  {program._count.sessions} session{program._count.sessions === 1 ? '' : 's'}
                </TableCell>
                <TableCell data-label="Order">{program.order}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/programs/${program.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Manage
                  </Link>
                  <DeleteProgramButton id={program.id} name={program.name} />
                </TableCell>
              </TableRow>
            ))}
            {programs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-black/50">
                  No programs yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
