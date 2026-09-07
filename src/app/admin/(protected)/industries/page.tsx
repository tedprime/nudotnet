import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getIndustries } from '@/lib/data/capabilities';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteIndustryButton } from './delete-button';

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Industries</h1>
          <p className="mt-1 text-sm text-black/60">
            The Solutions page&apos;s &quot;Who We Build For&quot; list.
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/industries/new">
            <Plus className="h-4 w-4" /> New Industry
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {industries.map((industry) => (
              <TableRow key={industry.id}>
                <TableCell data-label="Title" className="font-medium">{industry.title}</TableCell>
                <TableCell data-label="Order">{industry.order}</TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/industries/${industry.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteIndustryButton id={industry.id} title={industry.title} />
                </TableCell>
              </TableRow>
            ))}
            {industries.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-black/50">
                  No industries yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
