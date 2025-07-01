'use client';

import { Button } from '@/components/ui/button';
import { Skill } from '@/types/types';
import { Plus } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { DataTable } from '@/app/admin/projects/data-table';
import { columns } from './columns';
import SkillDialog from './skill-dialog';
import { DeleteConfirmationDialog } from '../_components/delete-confirmation-dialog';
import { useAuth } from '@/contexts/auth-context';
import { addNewSkill, deleteSkill, getAllSkills, updateSkill } from './actions';

type SkillWithId = Skill & {
  id: string;
  name: string;
  category: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

type SkillResponse = {
  success: boolean;
  data: SkillWithId[];
  error?: string | null;
};

type SkillInput = Omit<SkillWithId, 'id' | 'createdAt' | 'updatedAt'>;
type SkillUpdateInput = Omit<SkillWithId, 'createdAt' | 'updatedAt' | 'userId'>;

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillWithId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editSkill, setEditSkill] = useState<SkillWithId | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [skillToDelete, setSkillToDelete] = useState<SkillWithId | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { user } = useAuth();

  const fetchSkills = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const result = await getAllSkills(user.id);
      if (result.success) {
        setSkills(result.data || []);
      } else {
        toast.error(result.error || 'Failed to load skills');
        setSkills([]);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
      setSkills([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleAddSkill = () => {
    setEditSkill(null);
    setIsDialogOpen(true);
  };

  const handleEditSkill = (skill: SkillWithId) => {
    setEditSkill(skill);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (skill: SkillWithId) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!skillToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteSkill(skillToDelete.id);
      if (result.success) {
        await fetchSkills();
        toast.success('Skill deleted successfully');
      } else {
        throw new Error(result.error || 'Failed to delete skill');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete skill');
    } finally {
      setIsDeleteDialogOpen(false);
      setSkillToDelete(null);
      setIsDeleting(false);
    }
  };

  const handleSaveSkill = async (skillData: Omit<SkillWithId, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;

    try {
      let result;
      if (editSkill) {
        // Update existing skill
        const updateData: SkillUpdateInput = {
          id: editSkill.id,
          name: skillData.name,
          category: skillData.category as Skill['category'],
          level: skillData.level,
          userId: user.id
        };
        result = await updateSkill(updateData);
      } else {
        // Add new skill
        const newSkill: SkillInput = {
          name: skillData.name,
          category: skillData.category as Skill['category'],
          level: skillData.level,
          userId: user.id
        };
        result = await addNewSkill(newSkill, user.id);
      }

      if (result?.success) {
        await fetchSkills();
        setIsDialogOpen(false);
        toast.success(`Skill ${editSkill ? 'updated' : 'added'} successfully`);
      } else {
        throw new Error(result?.error || 'Failed to save skill');
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save skill');
      throw error;
    }
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
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
          </div>
        ) : (
          <DataTable
            columns={columns({
              onEdit: handleEditSkill,
              onDelete: handleDeleteClick,
            })}
            data={skills}
            searchKey="name"
            itemsPerPage={10}
            searchable
          />
        )}
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
