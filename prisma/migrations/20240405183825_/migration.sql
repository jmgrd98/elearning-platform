/*
  Warnings:

  - You are about to drop the column `aula` on the `Doubt` table. All the data in the column will be lost.
  - The primary key for the `Lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[videoUrl]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aulaId` to the `Doubt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doubt" DROP COLUMN "aula",
ADD COLUMN     "aulaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_pkey",
ADD COLUMN     "videoUrl" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_videoUrl_key" ON "Lesson"("videoUrl");

-- AddForeignKey
ALTER TABLE "Doubt" ADD CONSTRAINT "Doubt_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
