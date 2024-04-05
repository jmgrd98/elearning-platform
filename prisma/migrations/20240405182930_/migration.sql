/*
  Warnings:

  - Added the required column `aula` to the `Doubt` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Doubt_userId_key";

-- AlterTable
ALTER TABLE "Doubt" ADD COLUMN     "aula" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);
