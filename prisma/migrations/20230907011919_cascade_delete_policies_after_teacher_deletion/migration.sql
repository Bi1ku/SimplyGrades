-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_teacherId_fkey";

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
