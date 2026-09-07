import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/data/projects';
import { ProjectForm } from '../project-form';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Edit {project.name}</h1>
      <ProjectForm
        projectId={project.id}
        imageUrl={project.imageUrl}
        defaultValues={{
          slug: project.slug,
          name: project.name,
          category: project.category,
          badge: project.badge,
          oneLiner: project.oneLiner,
          problem: project.problem,
          whatWeBuilt: project.whatWeBuilt.join('\n'),
          stack: project.stack.join(', '),
          outcome: project.outcome,
          href: project.href ?? '',
          featured: project.featured,
          order: project.order,
        }}
      />
    </div>
  );
}
