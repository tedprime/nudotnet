import { PageHeroSection } from '@/components/shared/page-hero';
import { getPageHero } from '@/lib/data/hero';
import { HeroPage } from '@/generated/prisma/enums';

export const AboutHero = async () => {
  const hero = await getPageHero(HeroPage.ABOUT);
  if (!hero) return null;
  return <PageHeroSection image={hero.image} eyebrow={hero.eyebrow} body={hero.body} alt="tedprime" />;
};
