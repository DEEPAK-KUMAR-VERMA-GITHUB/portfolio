'use server';

import { prisma } from '@/lib/prisma';

export const getAllMessages = async (): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: messages };
  } catch (error) {
    console.error('Error fetching messages:', error);
    return { success: false, error: 'Failed to fetch messages' };
  }
};
