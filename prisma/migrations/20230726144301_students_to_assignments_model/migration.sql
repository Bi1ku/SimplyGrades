/*
  Warnings:

  - You are about to drop the column `grade` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the `StudentsInClasses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentsInClasses" DROP CONSTRAINT "StudentsInClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentsInClasses" DROP CONSTRAINT "StudentsInClasses_studentId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "grade";

-- DropTable
DROP TABLE "StudentsInClasses";

-- CreateTable
CREATE TABLE "StudentsToClasses" (
    "studentId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentsToClasses_pkey" PRIMARY KEY ("studentId","classId")
);

-- CreateTable
CREATE TABLE "StudentsToAssignments" (
    "studentId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "grade" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentsToAssignments_pkey" PRIMARY KEY ("studentId","assignmentId")
);

-- AddForeignKey
ALTER TABLE "StudentsToClasses" ADD CONSTRAINT "StudentsToClasses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsToClasses" ADD CONSTRAINT "StudentsToClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsToAssignments" ADD CONSTRAINT "StudentsToAssignments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsToAssignments" ADD CONSTRAINT "StudentsToAssignments_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
