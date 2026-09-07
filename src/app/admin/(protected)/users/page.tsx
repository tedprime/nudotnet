import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
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
import { DeleteAdminUserButton } from './delete-button';

export default async function AdminUsersPage() {
  const [admins, session] = await Promise.all([
    prisma.adminUser.findMany({ orderBy: { createdAt: 'asc' } }),
    getSession(),
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">Admin Users</h1>
          <p className="mt-1 text-sm text-black/60">
            Who can sign in to manage staff and projects.
          </p>
        </div>
        <Button asChild className="gap-2 bg-[#ef6e11] hover:bg-[#ef6e11]/90">
          <Link href="/admin/users/new">
            <Plus className="h-4 w-4" /> New Admin
          </Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-transparent bg-transparent sm:overflow-x-auto sm:border-black/10 sm:bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell data-label="Name" className="font-medium">{admin.name}</TableCell>
                <TableCell data-label="Email">{admin.email}</TableCell>
                <TableCell data-label="Role">
                  <Badge variant={admin.role === 'SUPER_ADMIN' ? 'default' : 'secondary'}>
                    {admin.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Editor'}
                  </Badge>
                </TableCell>
                <TableCell data-label="Actions" className="text-right">
                  {session?.sub === admin.id ? (
                    <span className="text-sm text-black/40">You</span>
                  ) : (
                    <DeleteAdminUserButton id={admin.id} name={admin.name} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
