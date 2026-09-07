import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Role } from '../src/generated/prisma/enums';
import { hashPassword } from '../src/lib/password';
import {
  PROJECTS,
  PROGRAMS,
  TRAINING_SESSIONS,
  GALLERY_IMAGES,
  PROGRAM_WRITEUPS,
  CAPABILITIES,
  INDUSTRIES,
  PAGE_HEROES,
  EVENTS,
  PARTNER_LOGOS,
  SECTION_INTROS,
  ABOUT_GALLERY_IMAGES,
  TRAINING_HIGHLIGHTS,
} from './seed-data';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? 'TedPrime Admin';

  if (!email || !password) {
    console.warn(
      'SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipping initial admin account.'
    );
    return;
  }

  const passwordHash = await hashPassword(password);
  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, name, passwordHash, role: Role.SUPER_ADMIN },
  });
  console.log(`Seeded super admin: ${email}`);
}

async function seedProjects() {
  for (const [index, project] of PROJECTS.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: { ...project, order: index },
    });
  }
  console.log(`Seeded ${PROJECTS.length} projects.`);
}

// Most remaining models have no natural unique key to upsert on, so seeding
// is idempotent via a simple "already populated? skip" count check instead.
async function seedIfEmpty<T>(
  label: string,
  count: () => Promise<number>,
  seed: () => Promise<T>
) {
  if ((await count()) > 0) {
    console.log(`Skipped ${label} — already seeded.`);
    return;
  }
  await seed();
  console.log(`Seeded ${label}.`);
}

async function seedPrograms() {
  const programs = await Promise.all(
    PROGRAMS.map((program, order) =>
      prisma.program.upsert({
        where: { slug: program.slug },
        update: {},
        create: { ...program, order },
      })
    )
  );
  console.log(`Seeded ${programs.length} programs.`);
  return Object.fromEntries(programs.map((p) => [p.slug, p.id]));
}

async function seedTrainingSessions(idBySlug: Record<string, string>) {
  await seedIfEmpty(
    'training sessions',
    () => prisma.trainingSession.count(),
    () =>
      prisma.trainingSession.createMany({
        data: TRAINING_SESSIONS.map(({ programSlug, ...session }, order) => ({
          ...session,
          order,
          programId: idBySlug[programSlug],
        })),
      })
  );
}

async function seedGalleryImages(idBySlug: Record<string, string>) {
  await seedIfEmpty(
    'training gallery images',
    () => prisma.trainingGalleryImage.count(),
    () =>
      prisma.trainingGalleryImage.createMany({
        data: GALLERY_IMAGES.map(({ programSlug, ...image }, order) => ({
          ...image,
          order,
          programId: idBySlug[programSlug],
        })),
      })
  );
}

async function seedProgramWriteups(idBySlug: Record<string, string>) {
  await seedIfEmpty(
    'program write-ups',
    () => prisma.programWriteup.count(),
    async () => {
      for (const [order, { programSlug, images, ...writeup }] of PROGRAM_WRITEUPS.entries()) {
        await prisma.programWriteup.create({
          data: {
            ...writeup,
            order,
            programId: idBySlug[programSlug],
            images: {
              create: images.map((imageUrl, imageOrder) => ({ imageUrl, order: imageOrder })),
            },
          },
        });
      }
    }
  );
}

async function seedCapabilities() {
  await seedIfEmpty(
    'capabilities',
    () => prisma.capability.count(),
    () =>
      prisma.capability.createMany({
        data: CAPABILITIES.map((capability, order) => ({ ...capability, order })),
      })
  );
}

async function seedIndustries() {
  await seedIfEmpty(
    'industries',
    () => prisma.industry.count(),
    () =>
      prisma.industry.createMany({
        data: INDUSTRIES.map((industry, order) => ({ ...industry, order })),
      })
  );
}

async function seedPageHeroes() {
  await seedIfEmpty(
    'page heroes',
    () => prisma.pageHero.count(),
    () => prisma.pageHero.createMany({ data: PAGE_HEROES })
  );
}

async function seedEvents() {
  await seedIfEmpty(
    'events',
    () => prisma.event.count(),
    () =>
      prisma.event.createMany({
        data: EVENTS.map((event, order) => ({ ...event, order })),
      })
  );
}

async function seedPartnerLogos() {
  await seedIfEmpty(
    'partner logos',
    () => prisma.partnerLogo.count(),
    () =>
      prisma.partnerLogo.createMany({
        data: PARTNER_LOGOS.map((logo, order) => ({ ...logo, order })),
      })
  );
}

async function seedSectionIntros() {
  for (const section of SECTION_INTROS) {
    await prisma.sectionIntro.upsert({
      where: { section: section.section },
      update: {},
      create: section,
    });
  }
  console.log(`Seeded ${SECTION_INTROS.length} section intros.`);
}

async function seedAboutGalleryImages() {
  await seedIfEmpty(
    'about gallery images',
    () => prisma.aboutGalleryImage.count(),
    () =>
      prisma.aboutGalleryImage.createMany({
        data: ABOUT_GALLERY_IMAGES.map((image, order) => ({ ...image, order })),
      })
  );
}

async function seedTrainingHighlights() {
  await seedIfEmpty(
    'training highlights',
    () => prisma.trainingHighlight.count(),
    () =>
      prisma.trainingHighlight.createMany({
        data: TRAINING_HIGHLIGHTS.map((highlight, order) => ({ ...highlight, order })),
      })
  );
}

async function main() {
  await seedAdmin();
  await seedProjects();
  const idBySlug = await seedPrograms();
  await seedTrainingSessions(idBySlug);
  await seedGalleryImages(idBySlug);
  await seedProgramWriteups(idBySlug);
  await seedCapabilities();
  await seedIndustries();
  await seedPageHeroes();
  await seedEvents();
  await seedPartnerLogos();
  await seedSectionIntros();
  await seedAboutGalleryImages();
  await seedTrainingHighlights();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
