'use server';

import { prisma } from '@/lib/prisma';
import { TimelineItem } from '@/types/types';

export const addNewTimeline = async (timeline: TimelineItem, userId: string) => {
  try {
    const result = await prisma.timeLine.create({
      data: {
        title: timeline.title,
        organization: timeline.organization,
        type: timeline.type,
        period: timeline.period,
        description: timeline.description,
        userId,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error adding new timeline:', error);
    return { success: false, error: 'Failed to add new timeline' };
  }
};

export const updateTimeline = async (timeline: TimelineItem) => {
  try {
    const { id, ...updateData } = timeline;
    const result = await prisma.timeLine.update({
      where: {
        id,
      },
      data: updateData,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error updating timeline:', error);
    return { success: false, error: 'Failed to update timeline' };
  }
};

export const deleteTimeline = async (timelineId: string) => {
  try {
    const result = await prisma.timeLine.delete({
      where: {
        id: timelineId,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error deleting timeline:', error);
    return { success: false, error: 'Failed to delete timeline' };
  }
};

export const getTimelines = async (
  userId: string
): Promise<{ success: boolean; data: TimelineItem[]; error?: string }> => {
  try {
    const result = await prisma.timeLine.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching timelines:', error);
    return { success: false, error: 'Failed to fetch timelines' };
  }
};
