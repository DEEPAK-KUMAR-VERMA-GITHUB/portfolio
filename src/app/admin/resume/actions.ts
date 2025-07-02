'use server';

import { prisma } from '@/lib/prisma';

export const addResumeAction = async (userId: string, data: any) => {
  console.log(data);
  try {
    const resume = await prisma.media.create({
      data: {
        ...data,
        userId,
      },
    });
    return { success: true, data: resume };
  } catch (error) {
    console.error('Error adding resume:', error);
    return { success: false, error: 'Failed to add resume' };
  }
};

export const deleteResumeAction = async (mediaId: string) => {
  try {
    const resume = await prisma.media.delete({
      where: {
        id: mediaId,
      },
    });
    return { success: true, data: resume };
  } catch (error) {
    console.error('Error deleting resume:', error);
    return { success: false, error: 'Failed to delete resume' };
  }
};

export const setDefaultResumeAction = async (mediaId: string) => {
  try {
    const resume = await prisma.media.update({
      where: {
        id: mediaId,
      },
      data: {
        isDefault: true,
      },
    });
    return { success: true, data: resume };
  } catch (error) {
    console.error('Error setting default resume:', error);
    return { success: false, error: 'Failed to set default resume' };
  }
};

export const getResumes = async (userId: string) => {
  try {
    const resumes = await prisma.media.findMany({
      where: {
        userId,
      },
    });
    return { success: true, data: resumes };
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return { success: false, error: 'Failed to fetch resumes' };
  }
};
