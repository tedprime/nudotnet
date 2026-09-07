import { notFound } from 'next/navigation';
import { getProgramById } from '@/lib/data/training';
import { ProgramForm } from '../program-form';
import { ProgramNav } from './program-nav';
import { DeleteProgramButton } from '../delete-button';

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(id);
  if (!program) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">{program.name}</h1>
        <DeleteProgramButton id={program.id} name={program.name} redirectTo="/admin/programs" />
      </div>
      <ProgramNav programId={program.id} />
      <ProgramForm
        programId={program.id}
        defaultValues={{ name: program.name, slug: program.slug, order: program.order }}
      />
    </div>
  );
}
