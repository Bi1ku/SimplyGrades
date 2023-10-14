import { PolicyField, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { policyFields, ...body } = await req.json();

    const policy = await prisma.policy.create({
      data: body,
    });

    await prisma.policyField.createMany({
      data: policyFields.map((field: PolicyField) => ({
        ...field,
        policyId: policy.id,
      })),
    });

    return NextResponse.json(policy);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
