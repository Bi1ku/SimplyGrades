import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { teacherId: string } },
) {}

export async function POST(
  req: Request,
  { params }: { params: { teacherId: string } },
) {}

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
    return NextResponse.json({ error: e.message || 'Something went wrong' });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { teacherId: string } },
) {}
