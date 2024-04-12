/*
  Warnings:

  - You are about to drop the column `userId` on the `Doubt` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Doubt` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Doubt_userId_idx";

-- AlterTable
ALTER TABLE "Doubt" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Doubt_authorId_idx" ON "Doubt"("authorId");
