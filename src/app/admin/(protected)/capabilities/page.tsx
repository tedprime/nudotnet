import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAllCapabilities } from '@/lib/data/capabilities';
import { getIcon } from '@/lib/icons';
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
import { DeleteCapabilityButton } from './delete-button';

export default async function CapabilitiesPage() {
  const capabilities = await getAllCapabilities();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Capabilities</h1>
          <p className="mt-1 text-sm text-black/60">
            Home &quot;What We Do&quot; and Solutions &quot;What We Build&quot; lists.
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/capabilities/new">
            <Plus className="h-4 w-4" /> New Capability
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {capabilities.map((capability) => {
              const Icon = getIcon(capability.icon);
              return (
                <TableRow key={capability.id}>
                  <TableCell data-label="Icon">
                    <Icon className="h-4 w-4 text-[#ef6e11]" />
                  </TableCell>
                  <TableCell data-label="Title" className="font-medium">{capability.title}</TableCell>
                  <TableCell data-label="Section">
                    <Badge variant="secondary">{capability.section}</Badge>
                  </TableCell>
                  <TableCell data-label="Order">{capability.order}</TableCell>
                  <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                    <Link
                      href={`/admin/capabilities/${capability.id}`}
                      className="text-sm font-medium text-[#ef6e11] hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteCapabilityButton id={capability.id} title={capability.title} />
                  </TableCell>
                </TableRow>
              );
            })}
            {capabilities.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-black/50">
                  No capabilities yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
