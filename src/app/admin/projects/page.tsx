'use client';

import { useState } from 'react';
import { columns } from '@/app/admin/projects/columns';
import { Project } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/app/admin/projects/data-table';
import ProjectDialog from '@/app/admin/projects/project-dialog';
import { Toaster, toast } from 'react-hot-toast';

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
  const [open, setOpen] = useState<boolean>(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState(initialProjects);

  const handleAdd = (newProject: Project) => {
    if (editProject) {
      setProjects(prev => prev.map(p => (p.id === editProject.id ? newProject : p)));
      toast.success('Project updated successfully');
    } else {
      setProjects(prev => [...prev, newProject]);
      toast.success('Project added successfully');
    }
    setEditProject(null);
    setOpen(false);
  };

  const handleEdit = (project: Project) => {
    setEditProject(project);
    setOpen(true);
  };

  const handleDelete = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    toast.success('Project deleted');
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <DataTable columns={columns({ onEdit: handleEdit, onDelete: handleDelete })} data={projects} searchKey="title" />

      {open && <ProjectDialog onSave={handleAdd} onCancel={() => setOpen(false)} project={editProject} />}
    </div>
  );
}
