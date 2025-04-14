import { CompetencyTest } from '@/components/projects/agile/competency-test';
import { FlagOffCarousel } from '@/components/projects/agile/flagoff-carousel';
import { TrainingSessions } from '@/components/projects/agile/training-sessions';

export const Agile = () => {
  return (
    <>
      <main className="py-14">
        <h2 className="mx-auto max-w-[450px] text-center text-xl font-semibold">
          Kwara Adolescent Girls Initiative for Learning and Empowerment,
          (AGILE) Project
        </h2>
        <p className="mx-auto mt-4 max-w-[750px] text-center">
          As part of commitment of Kwara State government to advance holistic
          strategies for gender inclusion, vibrant digital economy and
          sustainable economic growth, a 9-Month Digital Skills Development
          Training and Empowerment for Teachers and Students was launched by the
          Kwara State Ministry of Education in December, 2024 under the project
          tagged &quot;Kwara State Adolescent Girls&apos; Initiative for
          Learning and Empowerment (AGILE)&quot;, a World Bank Assisted
          Initiative.
        </p>
        <p className="mx-auto mt-4 max-w-[750px] text-center">
          TedPrime, an edtech consulting firm, is currently collaborating the
          State Project Implementation Unit of Kwara AGILE with a plan to
          empower educators and high school girls in Kwara State public schools
          with Digital Skills and Citizenship, STEM, Technology and Artificial
          Intelligence, Entrepreneurship and Climate Education.
        </p>
        <CompetencyTest />
        <h3 className="mx-auto max-w-[450px] text-center text-xl font-semibold">
          Flag Off Session
        </h3>
        <p className="mx-auto mt-4 max-w-[750px] text-center">
          This session kicked off at exactly 11am with the introduction of
          dignitaries and guests present. In attendance were the AGILE SPIU
          team, Permanent Secretaries, Directors, Ministries, TECSCOM Officials
          from Ministry of Education, Ministry of Women Affairs and Ministry of
          Business, Technology and Innovations. Also in attendance were Press
          and Media correspondents from Kwara TV, The Herald, Curious TV and
          Radio Kwara, students from Government Girls&apos; Day Senior Secondary
          School Okesuna, Government Girls&apos; Day Senior Secondary School Oko
          Erin, United command Senior Secondary School, and Saint Anthony&apos;s
          High School.
        </p>
        <FlagOffCarousel />
        <h3 className="mx-auto mt-6 max-w-[450px] text-center text-xl font-semibold">
          Training Sessions
        </h3>
        <TrainingSessions />
      </main>
    </>
  );
};
