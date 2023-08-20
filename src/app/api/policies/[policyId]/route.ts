import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { policyId: string } },
) {
  try {
    const { policyId } = params;

    const policy = await prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    });
    if (!policy) throw new Error('Student ID is invalid.');

    const updatedPolicy = await prisma.student.update({
      where: {
        id: policyId,
      },
      data: await req.json(),
    });

    return NextResponse.json(updatedPolicy);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { policyId: string } },
) {
  try {
    const { policyId } = params;

    const policy = await prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    });
    if (!policyId) throw new Error('Student ID is invalid.');

    const deletedPolicy = await prisma.policy.delete({
      where: {
        id: policyId,
      },
    });

    return NextResponse.json(deletedPolicy);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
