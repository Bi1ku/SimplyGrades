/*
  Warnings:

  - Made the column `grade` on table `StudentsToAssignments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "StudentsToAssignments" ALTER COLUMN "grade" SET NOT NULL;
