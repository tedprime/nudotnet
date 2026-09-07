import { notFound } from 'next/navigation';
import { getPageHeroById } from '@/lib/data/hero';
import { HeroForm } from '../hero-form';

export default async function EditPageHeroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hero = await getPageHeroById(id);
  if (!hero) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Edit Hero</h1>
      <HeroForm
        heroId={hero.id}
        image={hero.image}
        defaultValues={{
          page: hero.page,
          order: hero.order,
          eyebrow: hero.eyebrow,
          body: hero.body,
          bgColor: hero.bgColor ?? '',
          ctaLabel: hero.ctaLabel ?? '',
          ctaHref: hero.ctaHref ?? '',
          ctaExternal: hero.ctaExternal,
        }}
      />
    </div>
  );
}
