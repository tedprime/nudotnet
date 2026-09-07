import { getAllProjects } from '@/lib/data/projects';
import { CaseStudyCard } from './case-study-card';

export const CaseStudyGrid = async () => {
  const caseStudies = await getAllProjects();

  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </div>
  );
};
