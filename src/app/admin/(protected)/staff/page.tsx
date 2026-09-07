import Link from 'next/link';
import { Plus, IdCard } from 'lucide-react';
import { getAllStaff } from '@/lib/data/staff';
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
import { DeleteStaffButton } from './delete-button';

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive'> = {
  ACTIVE: 'default',
  FORMER: 'secondary',
  SUSPENDED: 'destructive',
};

export default async function StaffListPage() {
  const staff = await getAllStaff();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Staff</h1>
          <p className="mt-1 text-sm text-black/60">
            {staff.length} staff member{staff.length === 1 ? '' : 's'}
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/staff/new">
            <Plus className="h-4 w-4" /> New Staff Member
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium" data-label="Name">{member.fullName}</TableCell>
                <TableCell data-label="Title">{member.title}</TableCell>
                <TableCell data-label="Department">{member.department}</TableCell>
                <TableCell data-label="Status">
                  <Badge variant={STATUS_VARIANT[member.status]}>{member.status}</Badge>
                </TableCell>
                <TableCell data-label="Actions" className="space-x-4 whitespace-nowrap text-right">
                  <Link
                    href={`/admin/staff/${member.id}`}
                    className="text-sm font-medium text-[#ef6e11] hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/admin/staff/${member.id}/card`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-black/60 hover:underline"
                  >
                    <IdCard className="h-3.5 w-3.5" /> Card
                  </Link>
                  <DeleteStaffButton id={member.id} name={member.fullName} />
                </TableCell>
              </TableRow>
            ))}
            {staff.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-black/50">
                  No staff members yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
