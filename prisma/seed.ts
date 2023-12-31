const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

function generateClassCode() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function main() {
  console.time("Seeded database");

  console.log("═════════════════════════════════════════════════════");
  console.log("Clearing current database...");
  console.time("Cleared current database");
  await prisma.student.deleteMany();
  await prisma.class.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.policy.deleteMany();
  console.timeEnd("Cleared current database");
  console.log("═════════════════════════════════════════════════════ \n");

  console.log("═════════════════════════════════════════════════════");
  console.log("Seeding teacher...");
  console.time("Seeded teacher");
  const teacher = await prisma.teacher.create({
    data: {
      firstName: "Owen",
      lastName: "Shi",
      email: "2008owenshi@gmail.com",
      password: "password",
    },
  });
  console.timeEnd("Seeded teacher");
  console.log("═════════════════════════════════════════════════════ \n");

  console.log("═════════════════════════════════════════════════════");
  console.log("Seeding students...");
  console.time("Seeded students");
  const students = new Array(100).fill(0).map(
    async () =>
      await prisma.student.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: "password",
        },
      })
  );
  console.timeEnd("Seeded students");
  console.log("═════════════════════════════════════════════════════ \n");

  console.log("═════════════════════════════════════════════════════");
  console.log("Seeding grading policies...");
  console.time("Seeded grading policies");
  const policy = await prisma.policy.create({
    data: {
      name: "Standard",
      teacherId: teacher.id,
    },
  });
  const policyFields = [
    await prisma.policyField.create({
      data: {
        name: "Participation",
        weight: 0.2,
        policyId: policy.id,
      },
    }),
    await prisma.policyField.create({
      data: {
        name: "Homework, Classwork, & Quizzes",
        weight: 0.3,
        policyId: policy.id,
      },
    }),
    await prisma.policyField.create({
      data: {
        name: "Assessments",
        weight: 0.5,
        policyId: policy.id,
      },
    }),
  ];
  console.timeEnd("Seeded grading policies");
  console.log("═════════════════════════════════════════════════════ \n");

  console.log("═════════════════════════════════════════════════════");
  console.log("Seeding classes...");
  console.time("Seeded classes");
  let classes = Array(5)
    .fill(0)
    .map(
      async () =>
        await prisma.class.create({
          data: {
            id: generateClassCode(),
            name: faker.lorem.words(3),
            teacherId: teacher.id,
            period: Math.floor(1 + 6 * Math.random()),
            subject: [
              "MATHEMATICS",
              "SCIENCE",
              "ENGLISH",
              "HISTORY",
              "ART",
              "MUSIC",
              "FOREIGN_LANGUAGE",
              "PHYSICAL_EDUCATION",
              "OTHER",
            ][Math.floor(9 * Math.random())],
            policyId: policy.id,
          },
        })
    );
  console.timeEnd("Seeded classes");
  console.log("═════════════════════════════════════════════════════ \n");

  console.log("═════════════════════════════════════════════════════");
  console.log("Seeding assignments...");
  console.time("Seeded assignments");
  for (let i = 0; i < 30; i++) {
    await prisma.assignment.create({
      data: {
        name: faker.lorem.words(3),
        classId: (await classes[i % 5]).id,
        dueDate: [faker.date.future(), faker.date.past()][
          Math.floor(2 * Math.random())
        ],
        policyFieldId: policyFields[Math.floor(3 * Math.random())].id,
      },
    });
  }
  console.timeEnd("Seeded assignments");
  console.log("═════════════════════════════════════════════════════ \n");

  console.log("═════════════════════════════════════════════════════");
  console.log("Seeding students to classes relationship...");
  console.time("Seeded students to classes relationship");
  for (let i = 0; i < 100; i++) {
    await prisma.studentsToClasses.create({
      data: {
        studentId: (await students[i]).id,
        classId: (await classes[i % 5]).id,
      },
    });
  }
  console.timeEnd("Seeded students to classes relationship");
  console.log("═════════════════════════════════════════════════════ \n");

  console.log("═════════════════════════════════════════════════════");
  console.log("Seeding students to assignments relationship...");
  console.time("Seeded students to assignments relationship");
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
  console.timeEnd("Seeded students to assignments relationship");
  console.log("═════════════════════════════════════════════════════ \n");

  console.timeEnd("Seeded database");
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
