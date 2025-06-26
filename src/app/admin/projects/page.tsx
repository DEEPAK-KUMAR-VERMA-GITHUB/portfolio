'use client';

import { useState } from 'react';
import { columns } from '@/app/admin/projects/columns';
import { Project } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/app/admin/projects/data-table';
import ProjectDialog from '@/app/admin/projects/project-dialog';
import { Toaster, toast } from 'react-hot-toast';
import { DeleteConfirmationDialog } from '../_components/delete-confirmation-dialog';

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'My personal portfolio built with Next.js and Tailwind.',
    techStack: ['nextjs', 'tailwind'],
    status: 'published',
    category: 'personal',
    featured: true,
    image: '/images/portfolio.png',
    liveUrl: 'https://myportfolio.com',
    githubUrl: 'https://github.com/me/portfolio',
    createdAt: new Date().toISOString(),
  },
];

export default function ProjectsPage() {
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleAdd = (newProject: Project) => {
    if (editProject) {
      setProjects(prev => prev.map(p => (p.id === editProject.id ? newProject : p)));
      toast.success('Project updated successfully');
    } else {
      setProjects(prev => [...prev, newProject]);
      toast.success('Project added successfully');
    }
    setEditProject(null);
    setIsDialogOpen(false);
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

  const handleConfirmDelete = () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
      setIsDeleting(false);
      toast.success('Project deleted successfully');
    }, 500);
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
