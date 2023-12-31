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
    const searchQuery = url.searchParams.get("searchQuery") || "";

    const { classId } = params;

    const assignments = await prisma.assignment.findMany({
      where: {
        classId,
        name: {
          contains: searchQuery,
        },
      },
      include: {
        policyField: true,
      },
      skip: page * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count = await prisma.assignment.count({
      where: {
        classId,
        name: {
          contains: searchQuery,
        },
      },
    });

    return NextResponse.json({
      data: assignments,
      count: count,
      page,
    });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
