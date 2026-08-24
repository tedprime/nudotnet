'use client';
import About from '@/components/home/about';
import Services from '@/components/home/services';
import Hero from '@/components/home/hero';
import Partnerships from '@/components/home/partnerships';
import { Events } from '@/components/home/events';
import Projects from '@/components/home/projects';
import FeaturedWork from '@/components/home/featured-work';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="bg-[rgba(250,250,250)] py-8">
        <Services />
      </div>
      <FeaturedWork />
      <About />
      <div className="bg-[rgba(250,250,250)] py-8">
        <Partnerships />
      </div>
      <Projects />
      <Events />
    </main>
  );
}
