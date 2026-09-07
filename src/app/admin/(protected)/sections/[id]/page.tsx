import { notFound } from 'next/navigation';
import { getSectionIntroById } from '@/lib/data/sections';
import { SectionForm } from '../section-form';
import { SECTION_LABELS } from '../schema';
import { SectionKey } from '@/generated/prisma/enums';

export default async function EditSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const section = await getSectionIntroById(id);
  if (!section) notFound();

  const hasHeading = section.section === SectionKey.HOME_TRAINING;
  const hasSecondaryBody = section.section === SectionKey.HOME_ABOUT;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">
        Edit {SECTION_LABELS[section.section] ?? section.section}
      </h1>
      <SectionForm
        sectionId={section.id}
        hasHeading={hasHeading}
        hasSecondaryBody={hasSecondaryBody}
        defaultValues={{
          eyebrow: section.eyebrow,
          heading: section.heading ?? '',
          body: section.body,
          secondaryBody: section.secondaryBody ?? '',
        }}
      />
    </div>
  );
}
