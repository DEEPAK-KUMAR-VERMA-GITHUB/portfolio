'use server';

import { prisma } from '@/lib/prisma';
import { Skill } from '@/types/types';

type SkillInput = Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>;

export async function addNewSkill(data: Omit<SkillInput, 'userId'>, userId: string) {
  try {
    const skill = await prisma.skill.create({
      data: {
        ...data,
        userId,
      },
    });
    return { success: true, data: skill };
  } catch (error) {
    console.error('Error adding skill:', error);
    return { success: false, error: 'Failed to add skill' };
  }
}

export async function getAllSkills(
  userId: string
): Promise<{ success: boolean; data: Skill[]; error?: string }> {
  try {
    const skills = await prisma.skill.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: skills };
  } catch (error) {
    console.error('Error fetching skills:', error);
    return { success: false, error: 'Failed to fetch skills', data: [] };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting skill:', error);
    return { success: false, error: 'Failed to delete skill' };
  }
}

export async function updateSkill(data: SkillInput & { id: string }) {
  try {
    const { id, ...updateData } = data;
    const skill = await prisma.skill.update({
      where: { id },
      data: updateData,
    });
    return { success: true, data: skill };
  } catch (error) {
    console.error('Error updating skill:', error);
    return { success: false, error: 'Failed to update skill' };
  }
}
