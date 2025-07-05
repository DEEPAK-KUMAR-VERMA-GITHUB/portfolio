'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { config } from '@/lib/config';
import { generateContactReplyEmail } from '@/emails/email-templates';

interface UpdateMessageRequest {
  status?: 'new' | 'in_progress' | 'resolved' | 'spam';
  reply?: {
    subject: string;
    content: string;
  };
}

// Helper function to handle errors
function handleError(error: unknown, message: string) {
  console.error(message, error);
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const messageId = params.id;
    const body: UpdateMessageRequest = await request.json();

    // Get the original message first
    const originalMessage = await prisma.contactMessage.findUnique({
      where: { id: messageId },
      include: {
        replies: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!originalMessage) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    }

    const updateData: any = {};

    // Handle status update
    if (body.status) {
      updateData.status = body.status;
    }

    // Handle reply
    if (body.reply) {
      updateData.replies = {
        create: {
          subject: body.reply.subject,
          content: body.reply.content,
        },
      };

      // If replying, mark as in progress if it was new
      if (!updateData.status) {
        updateData.status = 'in_progress';
      }

      console.log('Sending email to:', originalMessage.email);
      const emailContent = generateContactReplyEmail({
        recipientName: originalMessage.name,
        senderName: config.email.senderName,
        message: originalMessage.message,
        reply: body.reply.content,
        replySubject: body.reply.subject,
        websiteUrl: new URL(config.app.url).origin,
        logoUrl: `${config.app.url}/logo_512x512.png`,
      });

      // Send email with the reply
      const emailResult = await sendEmail({
        to: originalMessage.email,
        subject: body.reply.subject,
        html: emailContent,
        replyTo: config.email.replyTo,
      });

      console.log('Email result:', emailResult);

      if (!emailResult.success) {
        console.error('Failed to send email:', emailResult.error);
        // Don't fail the request if email sending fails
      }
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id: messageId },
      data: updateData,
      include: {
        replies: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedMessage,
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return handleError(error, 'Failed to update message');
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    const messageId = params.id;

    const deletedMessage = await prisma.contactMessage.delete({
      where: { id: messageId },
    });

    return NextResponse.json({
      success: true,
      data: deletedMessage,
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return handleError(error, 'Failed to delete message');
  }
}

export async function GET(request: Request, { params }: any) {
  try {
    const messageId = params.id;

    const message = await prisma.contactMessage.findUnique({
      where: { id: messageId },
      include: {
        replies: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!message) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    return handleError(error, 'Failed to fetch message');
  }
}
