/*
  Warnings:

  - You are about to drop the `Path` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Path" DROP CONSTRAINT "Path_trainId_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoriteStations" DROP CONSTRAINT "_UserFavoriteStations_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoriteStations" DROP CONSTRAINT "_UserFavoriteStations_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoriteTrains" DROP CONSTRAINT "_UserFavoriteTrains_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoriteTrains" DROP CONSTRAINT "_UserFavoriteTrains_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "Path";

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainStation" (
    "id" SERIAL NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "trainId" INTEGER NOT NULL,

    CONSTRAINT "TrainStation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainStation" ADD CONSTRAINT "TrainStation_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteStations" ADD CONSTRAINT "_UserFavoriteStations_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteStations" ADD CONSTRAINT "_UserFavoriteStations_B_fkey" FOREIGN KEY ("B") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteTrains" ADD CONSTRAINT "_UserFavoriteTrains_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteTrains" ADD CONSTRAINT "_UserFavoriteTrains_B_fkey" FOREIGN KEY ("B") REFERENCES "Train"("id") ON DELETE CASCADE ON UPDATE CASCADE;
