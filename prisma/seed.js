// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const data = require("./mock-data.json");

const prisma = new PrismaClient();

const main = async () => {
  const clerkId = "user_30P26zaWEfbWH6nt4pT4bYoFWjb";
  const jobs = data.map((item) => {
    return {
      ...item,
      clerkId,
    };
  });

  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
