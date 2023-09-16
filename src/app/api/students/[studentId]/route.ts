import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { studentId: string } },
) {
  try {
    const { studentId } = params;

    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    return NextResponse.json(student);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { studentId: string } },
) {
  try {
    const { studentId } = params;

    const updatedStudent = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: await req.json(),
    });

    return NextResponse.json(updatedStudent);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { studentId: string } },
) {
  try {
    const { studentId } = params;

    const deletedStudent = await prisma.student.delete({
      where: {
        id: studentId,
      },
    });

    return NextResponse.json(deletedStudent);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
