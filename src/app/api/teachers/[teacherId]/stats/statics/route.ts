import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { teacherId: string } },
) {
  try {
    const { teacherId } = params;

    const teacher = await prisma.teacher.findUniqueOrThrow({
      where: { id: teacherId },
      select: {
        classes: { select: { id: true } },
      },
    });

    const classIds = teacher.classes.map((cls) => cls.id);

    const studentCount = await prisma.studentsToClasses.count({
      where: {
        classId: {
          in: classIds,
        },
      },
    });

    const assignmentsCount =
      (await prisma.assignment.count({
        where: {
          classId: {
            in: classIds,
          },
        },
      })) * studentCount;

    const gradedCount = await prisma.studentsToAssignments.count({
      where: {
        assignment: {
          classId: {
            in: classIds,
          },
        },
      },
    });

    return NextResponse.json({
      studentCount,
      gradedCount,
      classCount: classIds.length,
      ungradedCount: assignmentsCount - gradedCount,
    });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
