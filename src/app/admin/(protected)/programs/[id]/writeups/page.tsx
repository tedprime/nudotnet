import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Plus } from 'lucide-react';
import { getProgramById, getProgramWriteups } from '@/lib/data/training';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProgramNav } from '../program-nav';
import { DeleteWriteupButton } from './delete-button';

export default async function ProgramWriteupsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(id);
  if (!program) notFound();

  const writeups = await getProgramWriteups(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">{program.name}</h1>
      <ProgramNav programId={id} />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-black/60">Write-ups shown in this program&apos;s tab.</p>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href={`/admin/programs/${id}/writeups/new`}>
            <Plus className="h-4 w-4" /> New Write-Up
          </Link>
        </Button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {writeups.map((writeup) => (
              <TableRow key={writeup.id}>
                <TableCell data-label="Title" className="font-medium">{writeup.title}</TableCell>
                <TableCell data-label="Order">{writeup.order}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/programs/${id}/writeups/${writeup.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteWriteupButton
                    programId={id}
                    writeupId={writeup.id}
                    title={writeup.title}
                  />
                </TableCell>
              </TableRow>
            ))}
            {writeups.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-black/50">
                  No write-ups yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
