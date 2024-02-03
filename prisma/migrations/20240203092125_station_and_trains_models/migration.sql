-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Train" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFavoriteStations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TrainStations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserFavoriteTrains" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavoriteStations_AB_unique" ON "_UserFavoriteStations"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavoriteStations_B_index" ON "_UserFavoriteStations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TrainStations_AB_unique" ON "_TrainStations"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainStations_B_index" ON "_TrainStations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavoriteTrains_AB_unique" ON "_UserFavoriteTrains"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavoriteTrains_B_index" ON "_UserFavoriteTrains"("B");

-- AddForeignKey
ALTER TABLE "_UserFavoriteStations" ADD CONSTRAINT "_UserFavoriteStations_A_fkey" FOREIGN KEY ("A") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteStations" ADD CONSTRAINT "_UserFavoriteStations_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainStations" ADD CONSTRAINT "_TrainStations_A_fkey" FOREIGN KEY ("A") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainStations" ADD CONSTRAINT "_TrainStations_B_fkey" FOREIGN KEY ("B") REFERENCES "Train"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteTrains" ADD CONSTRAINT "_UserFavoriteTrains_A_fkey" FOREIGN KEY ("A") REFERENCES "Train"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteTrains" ADD CONSTRAINT "_UserFavoriteTrains_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
