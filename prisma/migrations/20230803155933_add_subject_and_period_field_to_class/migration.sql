/*
  Warnings:

  - Added the required column `period` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClassSubject" AS ENUM ('MATHEMATICS', 'SCIENCE', 'ENGLISH', 'HISTORY', 'ART', 'FOREIGN_LANGUAGE', 'PHYSICAL_EDUCATION', 'MUSIC', 'OTHER');

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "period" INTEGER NOT NULL,
ADD COLUMN     "subject" "ClassSubject" NOT NULL;
