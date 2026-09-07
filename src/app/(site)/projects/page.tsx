import { WorkHero } from '@/components/work/work-hero';
import { CaseStudyGrid } from '@/components/work/case-study-grid';
import { Tabs, type TabDef } from '@/components/projects/tabs';
import { ProgramContent } from '@/components/projects/program-content';
import { CtaBanner } from '@/components/shared/cta-banner';
import { getPrograms } from '@/lib/data/training';

export default async function ProjectsPage() {
  const programs = await getPrograms();

  const tabs: TabDef[] = [
    { key: 'case-studies', label: 'Case Studies', content: <CaseStudyGrid /> },
    ...programs.map((program) => ({
      key: program.slug,
      label: program.name,
      content: <ProgramContent programId={program.id} />,
    })),
  ];

  return (
    <main>
      <WorkHero />
      <Tabs tabs={tabs} />
      <CtaBanner
        eyebrow="Your Project Here"
        title="Ready to build something that lasts?"
        description="From national certification systems to enterprise platforms — we build the systems that matter."
        ctaLabel="Start a conversation"
      />
    </main>
  );
}
