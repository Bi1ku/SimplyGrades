import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { studentIds, ...body } = await req.json();

    const createdClass = await prisma.class.create({
      data: body,
    });

    await prisma.studentsToClasses.createMany({
      data: studentIds.map((studentId: string) => ({
        studentId,
        classId: createdClass.id,
      })),
    });

    return NextResponse.json(createdClass);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}