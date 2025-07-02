import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const session = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
  console.log(session);
  const userId = session.payload.userId as string;
  try {
    const stats = await prisma.$transaction([
      prisma.project.count({ where: { userId } }),
      prisma.skill.count({ where: { userId } }),
      prisma.timeLine.count({ where: { userId, type: 'education' } }),
      prisma.timeLine.count({ where: { userId, type: 'experience' } }),
      prisma.user.count({ where: { id: userId, about: { not: null } } }),
      prisma.contactMessage.count({ where: { userId } }),
    ]);

    return NextResponse.json({
      projects: stats[0],
      skills: stats[1],
      education: stats[2],
      experience: stats[3],
      about: stats[4],
      messages: stats[5],
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard statistics' }, { status: 500 });
  }
}
