-- AlterEnum
ALTER TYPE "EmploymentType" ADD VALUE 'INTERN';

-- AlterTable
ALTER TABLE "StaffMember" ALTER COLUMN "startDate" DROP NOT NULL;
