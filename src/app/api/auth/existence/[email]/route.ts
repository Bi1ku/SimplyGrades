import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(
  _: Request,
  { params }: { params: { email: string } },
) {
  try {
    const { email } = params;

    const student = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });
    if (student) return NextResponse.json(student);

    const teacher = await prisma.teacher.findUnique({
      where: {
        email: email,
      },
    });
    if (teacher) return NextResponse.json(teacher);

    return NextResponse.json(null);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
