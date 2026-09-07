import Link from 'next/link';
import { getAllSectionIntros } from '@/lib/data/sections';
import { SECTION_LABELS } from './schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function SectionsPage() {
  const sections = await getAllSectionIntros();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Section Intros</h1>
      <p className="mt-1 text-sm text-black/60">
        The short intro text blocks for home-page sections.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section</TableHead>
              <TableHead>Eyebrow</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections.map((section) => (
                <TableRow key={section.id}>
                <TableCell data-label="Section" className="font-medium">
                  {SECTION_LABELS[section.section] ?? section.section}
                </TableCell>
                <TableCell data-label="Eyebrow">{section.eyebrow}</TableCell>
                <TableCell data-label="Actions" className="text-right">
                  <Link
                    href={`/admin/sections/${section.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
