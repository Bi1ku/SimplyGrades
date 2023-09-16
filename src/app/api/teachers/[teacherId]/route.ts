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

    return NextResponse.json(teacher);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { teacherId: string } },
) {
  try {
    const { teacherId } = params;

    const updatedTeacher = await prisma.teacher.update({
      where: {
        id: teacherId,
      },
      data: await req.json(),
    });

    return NextResponse.json(updatedTeacher);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { teacherId: string } },
) {
  try {
    const { teacherId } = params;

    const deletedTeacher = await prisma.teacher.delete({
      where: {
        id: teacherId,
      },
    });

    return NextResponse.json(deletedTeacher);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
