'use server';

import { prisma } from '@/lib/prisma';

export async function addCertification(data: any, userId: string) {
  try {
    const certification = await prisma.certification.create({
      data: {
        ...data,
        userId,
      },
    });
    return { success: true, data: certification };
  } catch (error) {
    console.error('Error adding certification:', error);
    return { success: false, error: 'Failed to add certification' };
  }
}

export async function updateCertification(id: string, data: any) {
  try {
    const certification = await prisma.certification.update({
      where: { id },
      data,
    });
    return { success: true, data: certification };
  } catch (error) {
    console.error('Error updating certification:', error);
    return { success: false, error: 'Failed to update certification' };
  }
}

export async function deleteCertification(id: string) {
  try {
    await prisma.certification.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting certification:', error);
    return { success: false, error: 'Failed to delete certification' };
  }
}

export async function getCertifications(userId: string) {
  try {
    const certifications = await prisma.certification.findMany({
      where: {
        userId,
      },
    });
    return { success: true, data: certifications };
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return { success: false, error: 'Failed to fetch certifications' };
  }
}
