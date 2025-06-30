'use server';

import { prisma } from '@/lib/prisma';

export const updateAboutInfoAction = async (userId: string, data: any) => {
  const about = await prisma.user.update({
    where: { id: userId },
    data,
  });
  return about;
};
