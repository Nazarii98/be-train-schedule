/*
  Warnings:

  - You are about to drop the column `location` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `Train` table. All the data in the column will be lost.
  - You are about to drop the `_TrainStations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfPlatforms` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oblast` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Train` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TrainStations" DROP CONSTRAINT "_TrainStations_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainStations" DROP CONSTRAINT "_TrainStations_B_fkey";

-- AlterTable
ALTER TABLE "Station" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "numberOfPlatforms" INTEGER NOT NULL,
ADD COLUMN     "oblast" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Train" DROP COLUMN "schedule",
ADD COLUMN     "color" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TrainStations";

-- CreateTable
CREATE TABLE "Path" (
    "id" SERIAL NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "trainId" INTEGER NOT NULL,

    CONSTRAINT "Path_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Path" ADD CONSTRAINT "Path_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
