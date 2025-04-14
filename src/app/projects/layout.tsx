import { ProjectsHero } from '@/components/projects/projectsHero';
import { Tabs } from '@/components/projects/tabs';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <ProjectsHero />
      <Tabs />
      {children}
    </main>
  );
}

export default layout;
