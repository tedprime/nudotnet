import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Plus } from 'lucide-react';
import { getProgramById, getTrainingSessions } from '@/lib/data/training';
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
import { DeleteSessionButton } from './delete-button';

export default async function ProgramSessionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(id);
  if (!program) notFound();

  const sessions = await getTrainingSessions(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">{program.name}</h1>
      <ProgramNav programId={id} />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-black/60">This program&apos;s day-by-day recap.</p>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href={`/admin/programs/${id}/sessions/new`}>
            <Plus className="h-4 w-4" /> New Session
          </Link>
        </Button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell data-label="Order">{session.order}</TableCell>
                <TableCell data-label="Name" className="font-medium">{session.name}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/programs/${id}/sessions/${session.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteSessionButton
                    programId={id}
                    sessionId={session.id}
                    name={session.name}
                  />
                </TableCell>
              </TableRow>
            ))}
            {sessions.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-black/50">
                  No sessions yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
