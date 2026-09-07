import { PageHeroSection } from '@/components/shared/page-hero';
import { getPageHero } from '@/lib/data/hero';
import { getEventBySlug } from '@/lib/data/events';
import { HeroPage } from '@/generated/prisma/enums';

export const BAC = async () => {
  const [hero, event] = await Promise.all([
    getPageHero(HeroPage.NEWS_BAC),
    getEventBySlug('bac'),
  ]);

  const paragraphs = event?.body?.split('\n\n').filter(Boolean) ?? [];

  return (
    <>
      {hero && (
        <PageHeroSection image={hero.image} eyebrow={hero.eyebrow} body={hero.body} alt="BAC" />
      )}
      {/* content */}
      <div className="container flex w-full flex-col items-center justify-center gap-4 py-12">
        {event && <h3 className="w-[80%] text-center text-3xl font-bold">{event.headline}</h3>}
        <div className="flex w-[90%] flex-col items-center justify-center gap-2 text-left">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="w-full">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
