const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  console.time('Seeded database');

  console.log('Clearing current database...');
  console.time('Cleared current database');
  await prisma.student.deleteMany();
  await prisma.class.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.assignment.deleteMany();
  console.timeEnd('Cleared current database');

  console.log('Seeding teacher...');
  console.time('Seeded teacher');
  const teacher = await prisma.teacher.create({
    data: {
      firstName: 'Owen',
      lastName: 'Shi',
      email: '2008owenshi@gmail.com',
    },
  });
  console.timeEnd('Seeded teacher');

  console.log('Seeding students...');
  console.time('Seeded students');
  const students = new Array(100).fill(0).map(
    async () =>
      await prisma.student.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
        },
      }),
  );
  console.timeEnd('Seeded students');

  console.log('Seeding classes...');
  console.time('Seeded classes');
  let classes = Array(5)
    .fill(0)
    .map(
      async () =>
        await prisma.class.create({
          data: {
            name: faker.lorem.words(3),
            teacherId: teacher.id,
            period: Math.floor(1 + 6 * Math.random()),
            subject: [
              'MATH',
              'SCIENCE',
              'ENGLISH',
              'HISTORY',
              'ART',
              'MUSIC',
              'FOREIGN_LANGUAGE',
              'PHYSICAL_EDUCATION',
              'OTHER',
            ][Math.floor(9 * Math.random())],
          },
        }),
    );
  console.timeEnd('Seeded classes');

  console.log('Seeding assignments...');
  console.time('Seeded assignments');
  for (let i = 0; i < 5; i++) {
    await prisma.assignment.create({
      data: {
        name: faker.lorem.words(3),
        classId: (await classes[i]).id,
        dueDate: [faker.date.future(), faker.date.past()][
          Math.floor(2 * Math.random())
        ],
      },
    });
  }
  console.timeEnd('Seeded assignments');

  console.log('Seeding students to classes relationship...');
  console.time('Seeded students to classes relationship');
  for (let i = 0; i < 100; i++) {
    await prisma.studentsToClasses.create({
      data: {
        studentId: (await students[i]).id,
        classId: (await classes[i % 5]).id,
      },
    });
  }
  console.timeEnd('Seeded students to classes relationship');

  console.log('Seeding students to assignments relationship...');
  console.time('Seeded students to assignments relationship');
  classes = await prisma.class.findMany({
    select: {
      assignments: true,
      studentsToClasses: true,
    },
  });

  for (let i = 0; i < classes.length; i++) {
    const cls = await classes[i];
    for (let x = 0; x < cls.studentsToClasses.length; x++) {
      for (let j = 0; j < cls.assignments.length; j++) {
        await prisma.studentsToAssignments.create({
          data: {
            studentId: cls.studentsToClasses[x].studentId,
            assignmentId: cls.assignments[j].id,
            grade: Math.floor(100 * Math.random()),
          },
        });
      }
    }
  }
  console.timeEnd('Seeded students to assignments relationship');

  console.timeEnd('Seeded database');
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
