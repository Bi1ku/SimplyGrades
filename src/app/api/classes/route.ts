import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const generateClassCode = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export async function POST(req: Request) {
  try {
    const createdClass = await prisma.class.create({
      data: {
        ...(await req.json()),
        id: generateClassCode(),
      },
    });

    return NextResponse.json(createdClass);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message });
  }
}
