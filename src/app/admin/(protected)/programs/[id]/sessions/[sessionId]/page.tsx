import { notFound } from 'next/navigation';
import { getProgramById, getTrainingSessionById } from '@/lib/data/training';
import { ProgramNav } from '../../program-nav';
import { SessionForm } from '../session-form';

export default async function EditSessionPage({
  params,
}: {
  params: Promise<{ id: string; sessionId: string }>;
}) {
  const { id, sessionId } = await params;
  const [program, session] = await Promise.all([
    getProgramById(id),
    getTrainingSessionById(sessionId),
  ]);
  if (!program || !session) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">{program.name}</h1>
      <ProgramNav programId={id} />
      <h2 className="mt-6 text-lg font-semibold text-black">Edit {session.name}</h2>
      <SessionForm
        programId={id}
        sessionId={session.id}
        defaultValues={{
          name: session.name,
          description: session.description,
          order: session.order,
        }}
      />
    </div>
  );
}
