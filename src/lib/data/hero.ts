import 'server-only';
import { prisma } from '@/lib/prisma';
import { HeroPage } from '@/generated/prisma/enums';

export function getPageHeroes(page: HeroPage) {
  return prisma.pageHero.findMany({ where: { page }, orderBy: { order: 'asc' } });
}

/** Convenience for single-hero pages (everything except HOME). */
export async function getPageHero(page: HeroPage) {
  const [hero] = await getPageHeroes(page);
  return hero ?? null;
}

export function getAllPageHeroes() {
  return prisma.pageHero.findMany({ orderBy: [{ page: 'asc' }, { order: 'asc' }] });
}

export function getPageHeroById(id: string) {
  return prisma.pageHero.findUnique({ where: { id } });
}
