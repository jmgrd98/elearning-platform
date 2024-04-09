-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "progress" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "following" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
