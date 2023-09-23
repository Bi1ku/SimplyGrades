import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { teacherId: string } },
) {
  try {
    const { teacherId } = params;
    const result = [];

    const classes = await prisma.class.findMany({
      where: {
        teacherId,
      },
      select: {
        name: true,
        assignments: {
          select: {
            studentsToAssignments: {
              select: {
                grade: true,
              },
            },
          },
        },
      },
    });

    for (const cls of classes) {
      const data = {
        name: cls.name,
        avgGrade: 0,
      };
      for (const assignment of cls.assignments) {
        for (const { grade } of assignment.studentsToAssignments) {
          data.avgGrade += grade;
        }
        data.avgGrade =
          Math.round(
            (data.avgGrade / assignment.studentsToAssignments.length) * 100,
          ) / 100;
      }
      result.push(data);
    }

    return NextResponse.json(result);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
