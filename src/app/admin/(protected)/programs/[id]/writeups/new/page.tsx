import { notFound } from 'next/navigation';
import { getProgramById } from '@/lib/data/training';
import { ProgramNav } from '../../program-nav';
import { WriteupForm } from '../writeup-form';

export default async function NewWriteupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(id);
  if (!program) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">{program.name}</h1>
      <ProgramNav programId={id} />
      <h2 className="mt-6 text-lg font-semibold text-black">New Write-Up</h2>
      <WriteupForm programId={id} />
    </div>
  );
}
