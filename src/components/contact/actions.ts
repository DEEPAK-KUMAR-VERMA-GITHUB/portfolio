'use server';

import { headers } from 'next/headers';

export const sendMessage = async (
  data: any
): Promise<{ success: boolean; message?: string; error?: string; data?: any }> => {
  try {
    // get request metadata
    const headerList = await headers();
    const userAgent = headerList.get('user-agent');
    const ip =
      headerList.get('x-forwarded-for') ||
      headerList.get('x-real-ip') ||
      headerList.get('cf-connecting-ip') ||
      '127.0.0.1';
    const referrer = headerList.get('referer');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        status: 'new' as const,
        labels: ['new'],
        metadata: {
          ip,
          userAgent,
          referrer,
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message');
    }

    return {
      success: true,
      message: 'Message sent successfully',
      data: result.data,
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};
