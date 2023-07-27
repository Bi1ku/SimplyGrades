import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let teacher = await prisma.teacher.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!teacher)
      teacher = await prisma.teacher.create({
        data: body,
      });

    return NextResponse.json(teacher);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
