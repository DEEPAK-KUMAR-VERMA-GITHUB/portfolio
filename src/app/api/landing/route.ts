import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch user data with related information
    const user = await prisma.user.findFirst({
      where: {
        name: 'Deepak Kumar Verma',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        title: true,
        bio: true,
        about: true,
        journey: true,
        professionalTitles: true,
        githubUrl: true,
        linkedInUrl: true,
        mailLink: true,
        location: true,
        image: true,
        tags: true,
      },
    });

    // Fetch featured projects
    const projects = await prisma.project.findMany({
      where: {
        status: 'published',
        featured: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6, // Limit to 6 featured projects
    });

    // Fetch skills grouped by category
    const skills = await prisma.skill.findMany({
      orderBy: {
        level: 'desc',
      },
    });

    // Fetch timeline items (experience and education)
    const timeline = await prisma.timeLine.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Fetch achievements
    const achievements = await prisma.achievement.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // fetch certifications
    const certifications = await prisma.certification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // fetch resume
    const resume = await prisma.media.findFirst({
      where: {
        isDefault: true,
      },
    });

    return NextResponse.json({
      user,
      projects,
      skills,
      timeline,
      achievements,
      resume,
      certifications,
    });
  } catch (error) {
    console.error('Error fetching landing page data:', error);
    return NextResponse.json({ error: 'Failed to fetch landing page data' }, { status: 500 });
  }
}
