import { PrismaClient, StudentsToAssignments } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { assignmentId: string } },
) {
  try {
    const { assignmentId } = params;
    const body = await req.json();

    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });
    if (!assignment) throw new Error('Assignment ID is invalid.');

    const grades = await body.map(
      async (grade: StudentsToAssignments) =>
        await prisma.studentsToAssignments.upsert({
          where: {
            studentId_assignmentId: {
              assignmentId,
              studentId: grade.studentId,
            },
          },
          create: {
            ...grade,
            assignmentId,
          },
          update: {
            grade: grade.grade,
          },
        }),
    );

    return NextResponse.json(grades);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function GET(
  _: Request,
  { params }: { params: { assignmentId: string } },
) {
  try {
    const { assignmentId } = params;

    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });
    if (!assignment) throw new Error('Assignment ID is invalid.');

    const grades = await prisma.studentsToAssignments.findMany({
      where: {
        assignmentId,
      },
      include: {
        student: true,
      },
      orderBy: {
        student: {
          firstName: 'asc',
        },
      },
    });

    return NextResponse.json(grades);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
