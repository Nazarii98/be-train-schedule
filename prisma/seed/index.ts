import { PrismaClient } from '@prisma/client';
import { usersData } from './users';
import { stationsData } from './stations';
import { trainsData } from './trains';
import { scheduleData } from './schedule';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  usersData.forEach(async (data) => {
    const currency = await prisma.user.create({ data });

    console.log(`Created currency: ${currency.firstName}`);
  });

  stationsData.forEach(async (data) => {
    const currency = await prisma.station.create({ data });

    console.log(`Created currency: ${currency.name}`);
  });

  trainsData.forEach(async (data) => {
    const currency = await prisma.train.create({ data });

    console.log(`Created currency: ${currency.name}`);
  });

  scheduleData.forEach(async (data) => {
    const currency = await prisma.schedule.create({ data });

    console.log(`Created currency: ${currency.id}`);
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
