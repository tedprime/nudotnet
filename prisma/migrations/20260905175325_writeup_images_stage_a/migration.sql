-- CreateTable
CREATE TABLE "WriteupImage" (
    "id" TEXT NOT NULL,
    "writeupId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WriteupImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WriteupImage" ADD CONSTRAINT "WriteupImage_writeupId_fkey" FOREIGN KEY ("writeupId") REFERENCES "ProgramWriteup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
