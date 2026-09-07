import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminTopbar } from '@/components/admin/topbar';
import { Toaster } from '@/components/ui/sonner';
import { getAttentionItems } from '@/lib/admin/attention';
import { getLatestActivity } from '@/lib/activity';

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }
  const [attentionItems, latestActivity] = await Promise.all([
    getAttentionItems(),
    getLatestActivity(),
  ]);
  return (
    <div className="flex min-h-screen bg-gray-50 print:block print:h-auto print:overflow-visible print:bg-white">
      <div className="print:hidden hidden lg:flex">
        <AdminSidebar session={session} />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col print:overflow-visible">
        <div className="print:hidden">
          <AdminTopbar session={session} attentionItems={attentionItems} latestActivity={latestActivity} />
        </div>
        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-visible p-6 lg:p-10 print:overflow-visible print:p-0">
          {children}
        </main>
      </div>
      <div className="print:hidden">
        <Toaster richColors position="top-right" />
      </div>
    </div>
  );
}
