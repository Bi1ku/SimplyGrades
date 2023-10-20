import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { type, ...body } = await req.json();

    let user;
    if (type === "STUDENT") user = await prisma.student.create({ data: body });
    else user = await prisma.teacher.create({ data: body });

    return NextResponse.json(user);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
