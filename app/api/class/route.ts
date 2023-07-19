import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {}

export async function POST(req: Request) {
  try {
    const cls = await prisma.class.create({
      data: await req.json(),
    });

    return NextResponse.json(cls);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Something went wrong' });
  }
}

export async function PUT(req: Request) {}

export async function DELETE(req: Request) {}
