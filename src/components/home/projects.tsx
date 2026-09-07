import ProjectCarousel from './projectsCarousel';
import { getSectionIntro } from '@/lib/data/sections';
import { getTrainingHighlights } from '@/lib/data/training';
import { SectionKey } from '@/generated/prisma/enums';

const Projects = async () => {
  const [section, highlights] = await Promise.all([
    getSectionIntro(SectionKey.HOME_TRAINING),
    getTrainingHighlights(),
  ]);

  return (
    <div className="relative isolate mt-0 flex h-dvh max-h-[780px] flex-col gap-28">
      <div className="container relative flex h-full flex-col gap-28 lg:flex-row">
        <div className="relative flex h-full flex-1 flex-col lg:flex-[2]">
          <div className="mt-28 md:mt-36">
            <p className="font-medium text-[#ef6e11]">{section?.eyebrow}</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">{section?.heading}</h3>
            <p className="mt-6 text-lg text-white">{section?.body}</p>
          </div>
        </div>
        <div className="hidden h-full flex-1 flex-col justify-center lg:flex lg:flex-[3]"></div>
      </div>
      <ProjectCarousel
        slides={highlights.map((highlight) => ({
          id: highlight.id,
          imageUrl: highlight.imageUrl,
          title: highlight.title,
          description: highlight.description,
        }))}
      />
      <div className="absolute inset-x-0 inset-y-0 -z-10 h-[80%] w-screen bg-gray-800 lg:w-2/3"></div>
    </div>
  );
};

export default Projects;
