import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { classId: string } },
) {
  try {
    const { classId } = params;

    const cls = await prisma.class.findUnique({
      where: {
        id: classId,
      },
      include: {
        studentsToClasses: {
          include: {
            student: true,
          },
        },
      },
    });
    if (!cls) throw new Error('Class ID is invalid.');

    return NextResponse.json(cls);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { classId: string } },
) {
  try {
    const { classId } = params;

    const cls = await prisma.class.findUnique({
      where: {
        id: classId,
      },
    });
    if (!cls) throw new Error('Class ID is invalid.');

    const updatedClass = await prisma.class.update({
      where: {
        id: classId,
      },
      data: await req.json(),
    });

    return NextResponse.json(updatedClass);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { classId: string } },
) {
  try {
    const { classId } = params;

    const cls = await prisma.class.findUnique({
      where: {
        id: classId,
      },
      select: {
        studentsToClasses: true,
      },
    });
    if (!cls) throw new Error('Class ID is invalid.');

    const deletedClass = await prisma.class.delete({
      where: {
        id: classId,
      },
    });

    return NextResponse.json(deletedClass);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
