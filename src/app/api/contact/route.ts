import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ContactMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'new' | 'in_progress' | 'resolved' | 'spam';
  labels?: string[];
  metadata?: {
    ip: string;
    userAgent: string;
    referrer: string;
  };
}

export const POST = async (req: Request) => {
  try {
    const body: ContactMessageRequest = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Create the message with proper typing
    const message = await prisma.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
        status: body.status || 'new',
        labels: body.labels || [],
        metadata: body.metadata || {},
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully',
        data: message,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process contact form',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
};

interface UpdateMessageRequest {
  status: 'new' | 'in_progress' | 'resolved' | 'spam';
  reply?: {
    subject: string;
    content: string;
  };
}

export const GET = async () => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        replies: true,
      },
    });
    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
  }
};
