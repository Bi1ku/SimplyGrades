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
      select: {
        policies: {
          include: {
            policyFields: true,
            classes: true,
          },
        },
      },
    });
    if (!teacher) throw new Error('Teacher ID is invalid.');

    return NextResponse.json(teacher);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
