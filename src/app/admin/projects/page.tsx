'use client';

import { useCallback, useEffect, useState } from 'react';
import { columns } from '@/app/admin/projects/columns';
import { Project } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/app/admin/projects/data-table';
import ProjectDialog from '@/app/admin/projects/project-dialog';
import { Toaster, toast } from 'react-hot-toast';
import { DeleteConfirmationDialog } from '../_components/delete-confirmation-dialog';
import { addProject, deleteProject, getAllProjects, updateProject } from './actions';
import { useAuth } from '@/contexts/auth-context';

// const initialProjects: Project[] = [
//   {
//     id: '1',
//     title: 'Portfolio Website',
//     description: 'My personal portfolio built with Next.js and Tailwind.',
//     techStack: ['nextjs', 'tailwind'],
//     status: 'published',
//     category: 'personal',
//     featured: true,
//     image: '/images/portfolio.png',
//     liveUrl: 'https://myportfolio.com',
//     githubUrl: 'https://github.com/me/portfolio',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '2',
//     title: 'Blog',
//     description: 'Personal blog to share my thoughts and experiences.',
//     techStack: ['nextjs', 'tailwind'],
//     status: 'draft',
//     category: 'personal',
//     featured: false,
//     image: '',
//     liveUrl: '',
//     githubUrl: '',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '3',
//     title: 'E-Commerce Website',
//     description: 'E-commerce website built with Next.js and Express.',
//     techStack: ['nextjs', 'express', 'mongodb'],
//     status: 'published',
//     category: 'fullstack',
//     featured: true,
//     image: '/images/ecommerce.png',
//     liveUrl: 'https://ecommerce.com',
//     githubUrl: 'https://github.com/me/ecommerce',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '4',
//     title: 'Task Management App',
//     description: 'Task management app built with Next.js and MongoDB.',
//     techStack: ['nextjs', 'mongodb'],
//     status: 'published',
//     category: 'fullstack',
//     featured: true,
//     image: '/images/task-management.png',
//     liveUrl: 'https://task-management.com',
//     githubUrl: 'https://github.com/me/task-management',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '5',
//     title: 'Weather App',
//     description: 'Weather app built with Next.js and OpenWeatherMap API.',
//     techStack: ['nextjs', 'openweathermap'],
//     status: 'published',
//     category: 'fullstack',
//     featured: true,
//     image: '/images/weather.png',
//     liveUrl: 'https://weather.com',
//     githubUrl: 'https://github.com/me/weather',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '6',
//     title: 'Social Media Platform',
//     description: 'Social media platform built with Next.js and MongoDB.',
//     techStack: ['nextjs', 'mongodb'],
//     status: 'published',
//     category: 'fullstack',
//     featured: true,
//     image: '/images/social-media.png',
//     liveUrl: 'https://social-media.com',
//     githubUrl: 'https://github.com/me/social-media',
//     createdAt: new Date().toISOString(),
//   },
// ];

export default function ProjectsPage() {
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const fetchProjects = useCallback(async () => {
    if (!user) return;
    try {
      const result = await getAllProjects(user?.id!);
      setProjects(result.data as Project[]);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }, [user]);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  const handleAdd = async (newProject: Project) => {
    try {
      if (editProject) {
        console.log(newProject);
        const result = await updateProject({ ...newProject, id: editProject.id } as never);
        if (result.success) {
          toast.success('Project updated successfully');
          triggerRefresh();
        } else {
          toast.error(result.error as never);
        }
      } else {
        const result = await addProject(newProject as never, user?.id!);
        if (result.success) {
          toast.success('Project added successfully');
          triggerRefresh();
        } else {
          toast.error(result.error as never);
        }
      }
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Failed to add project');
    } finally {
      setIsDialogOpen(false);
      setEditProject(null);
    }
  };

  const handleEdit = (project: Project) => {
    setEditProject(project);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditProject(null);
  };

  const handleAddProject = () => {
    setIsDialogOpen(true);
    setEditProject(null);
  };

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProject(projectToDelete.id);
      toast.success('Project deleted successfully');
      triggerRefresh();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete project');
    } finally {
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={handleAddProject}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <DataTable
        columns={columns({ onEdit: handleEdit, onDelete: handleDeleteProject })}
        data={projects}
        searchKey="title"
        itemsPerPage={10}
        searchable
      />

      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleAdd}
        onCancel={handleCancel}
        project={editProject}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Project"
        description={`Are you sure you want to delete "${projectToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
