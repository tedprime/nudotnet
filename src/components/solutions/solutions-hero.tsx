import { PageHeroSection } from '@/components/shared/page-hero';
import { getPageHero } from '@/lib/data/hero';
import { HeroPage } from '@/generated/prisma/enums';

export const SolutionsHero = async () => {
  const hero = await getPageHero(HeroPage.SOLUTIONS);
  if (!hero) return null;
  return <PageHeroSection image={hero.image} eyebrow={hero.eyebrow} body={hero.body} alt="tedprime solutions" />;
};
