-- CreateEnum
CREATE TYPE "SectionKey" AS ENUM ('HOME_ABOUT', 'HOME_TRAINING');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "body" TEXT,
ADD COLUMN     "slug" TEXT,
ALTER COLUMN "link" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PartnerLogo" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionIntro" (
    "id" TEXT NOT NULL,
    "section" "SectionKey" NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "heading" TEXT,
    "body" TEXT NOT NULL,
    "secondaryBody" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionIntro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutGalleryImage" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AboutGalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingHighlight" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingHighlight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionIntro_section_key" ON "SectionIntro"("section");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");
