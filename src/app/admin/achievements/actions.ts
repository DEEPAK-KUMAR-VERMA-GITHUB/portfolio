'use server';

import { prisma } from '@/lib/prisma';
import { Achievement } from '@/types/types';

interface AchievementInput {
  title: string;
  issuer: string;
  date: string;
  icon: string;
  description: string;
}

export const getAllAchievements = async (userId: string) => {
  try {
    const achievements = await prisma.achievement.findMany({
      where: {
        userId,
      },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: achievements };
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return { success: false, error: 'Failed to fetch achievements' };
  }
};

export const addNewAchievement = async (data: Omit<AchievementInput, 'userId'>, userId: string) => {
  try {
    const achievement = await prisma.achievement.create({
      data: {
        ...data,
        date: new Date(data.date),
        userId,
      },
    });
    return { success: true, data: achievement };
  } catch (error) {
    console.error('Error adding achievement:', error);
    return { success: false, error: 'Failed to add achievement' };
  }
};

export const updateAchievement = async (data: AchievementInput & { id: string }, userId: string) => {
  try {
    const achievement = await prisma.achievement.update({
      where: { id: data.id },
      data: {
        ...data,
        date: new Date(data.date),
        userId,
      },
    });
    return { success: true, data: achievement };
  } catch (error) {
    console.error('Error updating achievement:', error);
    return { success: false, error: 'Failed to update achievement' };
  }
};

export const deleteAchievement = async (id: string) => {
  try {
    await prisma.achievement.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return { success: false, error: 'Failed to delete achievement' };
  }
};
