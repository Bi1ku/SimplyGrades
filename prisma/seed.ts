import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// TODO: Seed in dummy data for dev environment
async function main() {}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
