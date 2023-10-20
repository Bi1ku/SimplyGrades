import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user =
      (await prisma.teacher.findFirst({ where: { email, password } })) ||
      (await prisma.student.findFirst({ where: { email, password } }));

    if (!user) throw new Error("Invalid user credentials");

    return NextResponse.json(user);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
