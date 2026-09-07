import 'server-only';
import { prisma } from '@/lib/prisma';
import { HeroPage, CapabilitySection } from '@/generated/prisma/enums';

export type AttentionItem = { id: string; label: string; href: string };

const SINGLE_HERO_PAGES: { page: HeroPage; label: string }[] = [
  { page: HeroPage.SOLUTIONS, label: 'Solutions' },
  { page: HeroPage.ABOUT, label: 'About' },
  { page: HeroPage.PROJECTS, label: 'Projects' },
  { page: HeroPage.CONTACT, label: 'Contact' },
  { page: HeroPage.EDUBOX, label: 'EduBox' },
  { page: HeroPage.NEWS_BAC, label: 'News (BAC)' },
];

/**
 * Real, cheap-to-compute "needs attention" conditions against existing data
 * — no draft/publish state needed. Backs both the dashboard's Attention
 * Required panel and the topbar's notification badge, so they never disagree.
 */
export async function getAttentionItems(): Promise<AttentionItem[]> {
  try {
    const items: AttentionItem[] = [];

    const staffWithoutPhoto = await prisma.staffMember.count({ where: { photoUrl: null } });
    if (staffWithoutPhoto > 0) {
      items.push({
        id: 'staff-no-photo',
        label: `${staffWithoutPhoto} staff member${staffWithoutPhoto === 1 ? '' : 's'} missing a photo`,
        href: '/admin/staff',
      });
    }

    const programs = await prisma.program.findMany({
      select: {
        id: true,
        name: true,
        _count: { select: { writeups: true, gallery: true, sessions: true } },
      },
    });
    for (const program of programs) {
      const total = program._count.writeups + program._count.gallery + program._count.sessions;
      if (total === 0) {
        items.push({
          id: `program-empty-${program.id}`,
          label: `"${program.name}" has no content yet`,
          href: `/admin/programs/${program.id}`,
        });
      }
    }

    const homeSlideCount = await prisma.pageHero.count({ where: { page: HeroPage.HOME } });
    if (homeSlideCount === 0) {
      items.push({
        id: 'hero-home-empty',
        label: 'Home page has no hero slides',
        href: '/admin/hero/new',
      });
    }

    for (const { page, label } of SINGLE_HERO_PAGES) {
      const count = await prisma.pageHero.count({ where: { page } });
      if (count === 0) {
        items.push({
          id: `hero-missing-${page}`,
          label: `${label} page has no hero`,
          href: '/admin/hero/new',
        });
      }
    }

    const homeCapabilityCount = await prisma.capability.count({
      where: { section: CapabilitySection.HOME },
    });
    if (homeCapabilityCount === 0) {
      items.push({
        id: 'capabilities-home-empty',
        label: 'Home "What We Do" has no capabilities',
        href: '/admin/capabilities/new',
      });
    }

    const solutionsCapabilityCount = await prisma.capability.count({
      where: { section: CapabilitySection.SOLUTIONS },
    });
    if (solutionsCapabilityCount === 0) {
      items.push({
        id: 'capabilities-solutions-empty',
        label: 'Solutions "What We Build" has no capabilities',
        href: '/admin/capabilities/new',
      });
    }

    return items;
  } catch (error) {
    console.error('getAttentionItems failed, returning empty list', error);
    return [];
  }
}
