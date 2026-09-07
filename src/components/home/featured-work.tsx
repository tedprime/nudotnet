import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/data/projects';

const FeaturedWork = async () => {
  const featured = await getFeaturedProjects();

  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-bold text-[#ef6e11]">Featured Work</h2>
            <h3 className="mt-2 text-2xl font-semibold text-black md:text-3xl">
              Systems we&apos;ve built and operate
            </h3>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-black/70 hover:text-black"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((project) => {
            const initials = project.name
              .split(' ')
              .map((word) => word[0])
              .slice(0, 2)
              .join('');

            return (
              <Link
                key={project.slug}
                href="/projects"
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {project.imageUrl ? (
                  <div className="relative h-36 w-full">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      width={600}
                      height={400}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-36 w-full items-center justify-center bg-gradient-to-br from-gray-800 via-gray-800 to-[#ef6e11]/40">
                    <span className="text-2xl font-black tracking-wide text-white/90">
                      {initials}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#ef6e11]">
                    {project.category}
                  </p>
                  <h4 className="mt-2 font-semibold text-black">
                    {project.name}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-sm text-black/60">
                    {project.oneLiner}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedWork;
