-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ClassSubject" ADD VALUE 'HEALTH';
ALTER TYPE "ClassSubject" ADD VALUE 'TECHNOLOGY';
ALTER TYPE "ClassSubject" ADD VALUE 'ENGINEERING';
ALTER TYPE "ClassSubject" ADD VALUE 'COMPUTER_SCIENCE';
ALTER TYPE "ClassSubject" ADD VALUE 'GEOGRAPHY';
ALTER TYPE "ClassSubject" ADD VALUE 'SOCIAL_STUDIES';
