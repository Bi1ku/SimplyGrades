import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { teacherId: string } },
) {
  try {
    const { teacherId } = params;

    const teacher = await prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });
    if (!teacher) throw new Error('Teacher ID is invalid.');

    const classes = await prisma.class.findMany({
      where: {
        teacherId: teacherId,
      },
    });

    return NextResponse.json(classes);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Something went wrong' });
  }
}
