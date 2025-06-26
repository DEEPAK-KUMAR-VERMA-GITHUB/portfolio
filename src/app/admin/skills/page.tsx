'use client';

import { Button } from '@/components/ui/button';
import { Skill } from '@/types/types';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { DataTable } from '@/app/admin/projects/data-table';
import { skills as initialSkills } from '@/constants/constants';
import { columns } from './columns';
import SkillDialog from './skill-dialog';
import { DeleteConfirmationDialog } from '../_components/delete-confirmation-dialog';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editSkill, setEditSkill] = useState<Skill | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleAddSkill = () => {
    setEditSkill(null);
    setIsDialogOpen(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setEditSkill(skill);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (skill: Skill) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!skillToDelete) return;
    
    setIsDeleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSkills(prevSkills => prevSkills.filter(skill => skill.name !== skillToDelete.name));
    setIsDeleteDialogOpen(false);
    setSkillToDelete(null);
    setIsDeleting(false);
    
    toast.success('Skill deleted successfully');
  };

  const handleSaveSkill = async (skill: Skill) => {
    // Check if we're editing an existing skill or adding a new one
    const isEditing = skills.some(s => s.name === skill.name);
    
    if (isEditing) {
      // Update existing skill
      setSkills(prevSkills => 
        prevSkills.map(s => s.name === skill.name ? skill : s)
      );
      toast.success('Skill updated successfully');
    } else {
      // Add new skill
      setSkills(prevSkills => [...prevSkills, skill]);
      toast.success('Skill added successfully');
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button onClick={handleAddSkill}>
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      <div className="rounded-md border p-4">
        <DataTable 
          columns={columns({ 
            onEdit: handleEditSkill, 
            onDelete: handleDeleteClick 
          })} 
          data={skills} 
          searchKey="name" 
          itemsPerPage={10} 
          searchable 
        />
      </div>

      <SkillDialog
        skill={editSkill}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveSkill}
        onCancel={() => setIsDialogOpen(false)}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Delete Skill"
        description={`Are you sure you want to delete the skill "${skillToDelete?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
