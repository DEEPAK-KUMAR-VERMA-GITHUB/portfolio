import { NextResponse } from 'next/server';
import { createUser, findUserByEmail, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Validation error', details: validation.error.format() }, { status: 400 });
    }

    const { email, password, name } = validation.data;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    // Create user with transaction to ensure data consistency
    const result = await prisma.$transaction(async tx => {
      const user = await tx.user.create({
        data: {
          email,
          password: await hashPassword(password),
          name: name || '',
          role: 'USER',
        },
      });

      return user;
    });

    return NextResponse.json({ user: result }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
