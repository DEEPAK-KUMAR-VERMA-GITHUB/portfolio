import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (token) {
      // In a real app, you might want to invalidate the session in the database here
      // await prisma.session.delete({ where: { id: sessionId } });

      // Clear the auth cookie
      cookieStore.delete('auth-token');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
