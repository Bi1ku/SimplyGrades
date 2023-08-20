/*
  Warnings:

  - You are about to drop the column `gradingPolicyFieldId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `gradingPolicyId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the `GradingPolicy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GradingPolicyField` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `policyFieldId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policyId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_gradingPolicyFieldId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_gradingPolicyId_fkey";

-- DropForeignKey
ALTER TABLE "GradingPolicyField" DROP CONSTRAINT "GradingPolicyField_gradingPolicyId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "gradingPolicyFieldId",
ADD COLUMN     "policyFieldId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "gradingPolicyId",
ADD COLUMN     "policyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "GradingPolicy";

-- DropTable
DROP TABLE "GradingPolicyField";

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyField" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "policyId" TEXT NOT NULL,

    CONSTRAINT "PolicyField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_policyFieldId_fkey" FOREIGN KEY ("policyFieldId") REFERENCES "PolicyField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyField" ADD CONSTRAINT "PolicyField_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
