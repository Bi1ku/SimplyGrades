import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const createdStudent = await prisma.student.create({
      data: await req.json(),
    });

    return NextResponse.json(createdStudent);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
