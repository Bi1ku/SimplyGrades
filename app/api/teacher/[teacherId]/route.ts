import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { teacherId: string } },
) {}

export async function POST(
  req: Request,
  { params }: { params: { teacherId: string } },
) {}

export async function PUT(
  req: Request,
  { params }: { params: { teacherId: string } },
) {}

export async function DELETE(
  req: Request,
  { params }: { params: { teacherId: string } },
) {}
