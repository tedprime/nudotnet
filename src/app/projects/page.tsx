import { WorkHero } from '@/components/work/work-hero';
import { Tabs } from '@/components/projects/tabs';
import { CtaBanner } from '@/components/shared/cta-banner';

export default function ProjectsPage() {
  return (
    <main>
      <WorkHero />
      <Tabs />
      <CtaBanner
        eyebrow="Your Project Here"
        title="Ready to build something that lasts?"
        description="From national certification systems to enterprise platforms — we build the systems that matter."
        ctaLabel="Start a conversation"
      />
    </main>
  );
}
