import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { assignmentId: string } },
) {
  try {
    const { assignmentId } = params;

    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });
    if (!assignment) throw new Error('Assignment ID is invalid.');

    return NextResponse.json(assignment);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Something went wrong' });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { assignmentId: string } },
) {
  try {
    const { assignmentId } = params;

    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });
    if (!assignment) throw new Error('Assignment ID is invalid.');

    const updatedAssignment = await prisma.assignment.update({
      where: {
        id: assignmentId,
      },
      data: await req.json(),
    });

    return NextResponse.json(updatedAssignment);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Something went wrong' });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { assignmentId: string } },
) {
  try {
    const { assignmentId } = params;

    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });
    if (!assignment) throw new Error('Assignment ID is invalid.');

    const deletedAssignment = await prisma.assignment.delete({
      where: {
        id: assignmentId,
      },
    });

    return NextResponse.json(deletedAssignment);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Something went wrong' });
  }
}
