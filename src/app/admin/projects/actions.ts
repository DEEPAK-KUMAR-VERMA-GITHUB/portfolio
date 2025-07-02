'use server';

import { Project } from '@/app/generated/prisma';
import { prisma } from '@/lib/prisma';

export async function addProject(project: Project, userId: string) {
  try {
    const newProject = await prisma.project.create({
      data: {
        ...project,
        userId,
      },
    });
    return { success: true, data: newProject };
  } catch (error) {
    console.error('Error adding project:', error);
    return { success: false, error: 'Failed to add project' };
  }
}

export async function updateProject(project: Project) {
  console.log(project);
  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: project.id,
      },
      data: project,
    });
    return { success: true, data: updatedProject };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProject(projectId: string) {
  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    return { success: true, data: deletedProject };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}

export async function getAllProjects(userId: string) {
  try {
    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: 'Failed to fetch projects', data: [] };
  }
}
