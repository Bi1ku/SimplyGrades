import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { classId: string; studentId: string } }
) {
  try {
    const { classId, studentId } = params;
    const result = [];

    const assignments = await prisma.assignment.findMany({
      where: {
        classId,
      },
      select: {
        name: true,
        studentsToAssignments: true,
      },
      take: 5,
    });

    for (const assignment of assignments) {
      const data = {
        name: assignment.name,
        avgGrade: 0,
        studentGrade: 0,
      };
      for (const { studentId: id, grade } of assignment.studentsToAssignments) {
        data.avgGrade += grade;
        if (id === studentId) data.studentGrade = grade;
      }
      data.avgGrade =
        Math.round(
          (data.avgGrade / assignment.studentsToAssignments.length) * 100
        ) / 100;
      result.push(data);
    }

    return NextResponse.json(result);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
