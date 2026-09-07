-- AlterTable
ALTER TABLE "ProgramWriteup" DROP COLUMN "programSlug",
ALTER COLUMN "programId" SET NOT NULL;

-- AlterTable: drop the old enum `group` column, then rename `groupLabel` to
-- `group` (preserves the Baseline/Flag-Off values backfilled into it,
-- instead of Prisma's default drop+recreate which would lose them).
ALTER TABLE "TrainingGalleryImage" DROP COLUMN "group";
ALTER TABLE "TrainingGalleryImage" RENAME COLUMN "groupLabel" TO "group";
ALTER TABLE "TrainingGalleryImage" ALTER COLUMN "programId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TrainingSession" ALTER COLUMN "programId" SET NOT NULL;

-- DropEnum
DROP TYPE "GalleryGroup";

-- DropEnum
DROP TYPE "ProgramSlug";
