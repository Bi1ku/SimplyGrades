import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let student = await prisma.student.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!student)
      student = await prisma.student.create({
        data: body,
      });

    return NextResponse.json(student);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
