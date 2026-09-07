import { Contact } from '@/features/contact';
import { getPageHero } from '@/lib/data/hero';
import { HeroPage } from '@/generated/prisma/enums';

export default async function Page() {
  const hero = await getPageHero(HeroPage.CONTACT);

  return (
    <>
      <Contact hero={hero} />
    </>
  );
}
