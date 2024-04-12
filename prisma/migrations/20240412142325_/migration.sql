/*
  Warnings:

  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Post_userId_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");
