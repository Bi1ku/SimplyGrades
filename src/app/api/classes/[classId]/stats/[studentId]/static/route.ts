import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { classId: string } }
) {}
