import About from '@/components/home/about';
import Services from '@/components/home/services';
import Hero from '@/components/home/hero';
import Partnerships from '@/components/home/partnerships';
import { Events } from '@/components/home/events';
import Projects from '@/components/home/projects';
import FeaturedWork from '@/components/home/featured-work';
import { getPageHeroes } from '@/lib/data/hero';
import { getEvents } from '@/lib/data/events';
import { HeroPage } from '@/generated/prisma/enums';

export default async function Home() {
  const [slides, events] = await Promise.all([getPageHeroes(HeroPage.HOME), getEvents()]);

  return (
    <main>
      <Hero
        slides={slides.map((slide) => ({
          id: slide.id,
          image: slide.image,
          eyebrow: slide.eyebrow,
          body: slide.body,
          bgColor: slide.bgColor,
          ctaLabel: slide.ctaLabel,
          ctaHref: slide.ctaHref,
          ctaExternal: slide.ctaExternal,
        }))}
      />
      <div className="bg-[rgba(250,250,250)] py-8">
        <Services />
      </div>
      <FeaturedWork />
      <About />
      <div className="bg-[rgba(250,250,250)] py-8">
        <Partnerships />
      </div>
      <Projects />
      <Events
        events={events.map((event) => ({
          id: event.id,
          date: event.date,
          headline: event.headline,
          description: event.description,
          imageUrl: event.imageUrl,
          slug: event.slug,
          link: event.link,
          external: event.external,
        }))}
      />
    </main>
  );
}
