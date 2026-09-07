import { PageHeroSection } from '@/components/shared/page-hero';
import { getPageHero } from '@/lib/data/hero';
import { HeroPage } from '@/generated/prisma/enums';

export const WorkHero = async () => {
  const hero = await getPageHero(HeroPage.PROJECTS);
  if (!hero) return null;
  return <PageHeroSection image={hero.image} eyebrow={hero.eyebrow} body={hero.body} alt="tedprime work" />;
};
