const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  await prisma.studentsInClasses.deleteMany();
  await prisma.student.deleteMany();
  await prisma.class.deleteMany();
  await prisma.teacher.deleteMany();
  console.log('Deleted all students, teachers, and classes');

  const teacher = await prisma.teacher.create({
    data: {
      firstName: 'Owen',
      lastName: 'Shi',
      email: '2008owenshi@gmail.com',
      phone: '(646) 301-0911',
      password: 'password',
    },
  });
  console.log('Finished seeding teacher');

  // Create 100 students
  const students = new Array(100).fill(0).map(
    async () =>
      await prisma.student.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          password: faker.internet.password(),
        },
      }),
  );
  console.log('Finished seeding students');

  // Create 5 classes
  const classes = new Array(5).fill(0).map(
    async () =>
      await prisma.class.create({
        data: {
          name: faker.lorem.words(3),
          teacherId: teacher.id,
        },
      }),
  );

  // Create student to class relationships (20 students per class)
  for (let i = 0; i < 100; i++) {
    await prisma.studentsInClasses.create({
      data: {
        studentId: (await students[i]).id,
        classId: (await classes[i % 5]).id,
      },
    });
  }

  console.log('Finished seeding classes');
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
