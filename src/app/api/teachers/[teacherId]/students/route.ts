import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { teacherId: string } },
) {
  try {
    const url = new URL(req.url);
    const page = +(url.searchParams.get('page') || 0);
    const pageSize = +(url.searchParams.get('pageSize') || 5);

    const { teacherId } = params;

    const classes = await prisma.class.findMany({
      where: { teacherId },
      select: {
        id: true,
        studentsToClasses: {
          select: {
            student: true,
          },
        },
      },
      take: pageSize,
      skip: page * pageSize,
    });

    let count = 0;
    for (const cls of classes) {
      const num = await prisma.studentsToClasses.count({
        where: { classId: cls.id },
      });
      count += num;
    }

    const students = classes.map((cls) =>
      cls.studentsToClasses.map(({ student }) => student),
    );

    return NextResponse.json({ data: students, count });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
