import { SolutionsHero } from '@/components/solutions/solutions-hero';
import { CapabilitiesGrid } from '@/components/solutions/capabilities-grid';
import { Industries } from '@/components/solutions/industries';
import { CtaBanner } from '@/components/shared/cta-banner';

export default function SolutionsPage() {
  return (
    <main>
      <SolutionsHero />
      <CapabilitiesGrid />
      <Industries />
      <CtaBanner
        eyebrow="Start a Project"
        title="Have a system that needs building?"
        description="Tell us what you're trying to solve and we'll tell you exactly how we'd build it."
        ctaLabel="Talk to us"
      />
    </main>
  );
}
