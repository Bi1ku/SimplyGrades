import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const createdTeacher = await prisma.teacher.create({
      data: await req.json(),
    });

    return NextResponse.json(createdTeacher);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Something went wrong' });
  }
}
