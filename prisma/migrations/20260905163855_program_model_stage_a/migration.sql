-- AlterTable
ALTER TABLE "ProgramWriteup" ADD COLUMN     "programId" TEXT,
ALTER COLUMN "programSlug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TrainingGalleryImage" ADD COLUMN     "groupLabel" TEXT,
ADD COLUMN     "programId" TEXT,
ALTER COLUMN "group" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TrainingSession" ADD COLUMN     "programId" TEXT;

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");

-- AddForeignKey
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingGalleryImage" ADD CONSTRAINT "TrainingGalleryImage_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramWriteup" ADD CONSTRAINT "ProgramWriteup_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
