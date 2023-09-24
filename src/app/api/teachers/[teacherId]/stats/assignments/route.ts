import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { teacherId: string } },
) {
  try {
    const { teacherId } = params;
    const url = new URL(req.url);
    const page = +(url.searchParams.get('page') || 0);
    const pageSize = +(url.searchParams.get('pageSize') || 5);
    const searchQuery = url.searchParams.get('searchQuery') || '';

    const classes = await prisma.class.findMany({
      where: {
        teacherId,
      },
      select: {
        id: true,
      },
    });

    const assignments = await prisma.assignment.findMany({
      where: {
        classId: {
          in: classes.map((cls) => cls.id),
        },
        dueDate: {
          lt: new Date(),
        },
        name: {
          contains: searchQuery,
        },
      },
      select: {
        name: true,
        dueDate: true,
        createdAt: true,
        class: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        dueDate: 'desc',
      },
      skip: page * pageSize,
      take: pageSize,
    });

    const count = await prisma.assignment.count({
      where: {
        classId: {
          in: classes.map((cls) => cls.id),
        },
        dueDate: {
          lt: new Date(),
        },
        name: {
          contains: searchQuery,
        },
      },
    });

    return NextResponse.json({
      data: assignments,
      count: count,
      page,
    });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
