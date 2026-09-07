import Link from 'next/link';
import ImagesCarousel from './imagesCarousel';
import { getSectionIntro, getAboutGalleryImages } from '@/lib/data/sections';
import { SectionKey } from '@/generated/prisma/enums';

const About = async () => {
  const [section, images] = await Promise.all([
    getSectionIntro(SectionKey.HOME_ABOUT),
    getAboutGalleryImages(),
  ]);

  const secondaryParagraphs = section?.secondaryBody?.split('\n\n').filter(Boolean) ?? [];

  return (
    <div className="my-12">
      <h2 className="text-center font-bold text-[#ef6e11]">
        {section?.eyebrow ?? 'Who We Are'}
      </h2>
      {section?.body && (
        <p className="mx-auto mt-2 w-[80%] text-center">{section.body}</p>
      )}
      <ImagesCarousel
        images={images.map((image) => ({
          id: image.id,
          imageUrl: image.imageUrl,
          alt: image.alt,
        }))}
      />
      {secondaryParagraphs.map((paragraph, index) => (
        <p key={index} className="mx-auto mt-3 w-[80%] text-center">
          {paragraph}
        </p>
      ))}
      <div className="mt-6 flex justify-center">
        <Link href="/about" className="text-sm font-medium text-[#ef6e11] hover:underline">
          Learn more about us
        </Link>
      </div>
    </div>
  );
};

export default About;
