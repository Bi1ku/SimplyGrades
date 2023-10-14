import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { policyId: string } }
) {
  try {
    const { policyId } = params;

    const policy = await prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    });

    return NextResponse.json(policy);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { policyId: string } }
) {
  try {
    const { policyId } = params;
    const { name, policyFields } = await req.json();

    await prisma.policy.update({
      where: {
        id: policyId,
      },
      data: {
        name,
      },
    });

    for (const field of policyFields) {
      await prisma.policyField.upsert({
        where: {
          id: field.id || "",
        },
        update: {
          weight: field.weight,
          name: field.name,
        },
        create: {
          ...field,
          policyId,
        },
      });
    }

    const updatedPolicy = await prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    });

    return NextResponse.json(updatedPolicy);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { policyId: string } }
) {
  try {
    const { policyId } = params;

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
