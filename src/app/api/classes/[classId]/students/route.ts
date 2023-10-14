import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { classId: string } }
) {
  try {
    const url = new URL(req.url);
    const page = +(url.searchParams.get("page") || 0);
    const pageSize = +(url.searchParams.get("pageSize") || 5);

    const { classId } = params;

    const count = await prisma.studentsToClasses.count({
      where: {
        classId,
      },
    });

    const students = await prisma.studentsToClasses.findMany({
      where: {
        classId,
      },
      select: {
        student: true,
      },
      orderBy: {
        student: {
          firstName: "asc",
        },
      },
      skip: page * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      data: students,
      count: count,
      page,
    });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
