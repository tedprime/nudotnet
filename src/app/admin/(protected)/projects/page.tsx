import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAllProjects } from '@/lib/data/projects';
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
import { DeleteProjectButton } from './delete-button';

export default async function ProjectsListPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Projects</h1>
          <p className="mt-1 text-sm text-black/60">
            {projects.length} project{projects.length === 1 ? '' : 's'}
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell data-label="Name" className="font-medium">{project.name}</TableCell>
                <TableCell data-label="Category">{project.category}</TableCell>
                <TableCell data-label="Featured">
                  {project.featured && <Badge>Featured</Badge>}
                </TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton id={project.id} name={project.name} />
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-black/50">
                  No projects yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
