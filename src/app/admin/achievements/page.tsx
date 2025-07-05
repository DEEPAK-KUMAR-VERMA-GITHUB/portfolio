'use client';

import { Button } from '@/components/ui/button';
import { Achievement } from '@/types/types';
import { Plus } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { DataTable } from '@/app/admin/projects/data-table';
import { columns } from '@/app/admin/achievements/columns';
import AchievementDialog from '@/app/admin/achievements/achievement-dialog';
import { DeleteConfirmationDialog } from '@/app/admin/_components/delete-confirmation-dialog';
import {
  addNewAchievement,
  deleteAchievement,
  getAllAchievements,
  updateAchievement,
} from '@/app/admin/achievements/actions';
import { useAuth } from '@/contexts/auth-context';

type AchievementResponse = {
  success: boolean;
  data: AchievementItem[];
};

type AchievementItem = {
  id: string;
  title: string;
  issuer: string;
  date: Date;
  icon: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [currentAchievement, setCurrentAchievement] = useState<AchievementItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [achievementToDelete, setAchievementToDelete] = useState<AchievementItem | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { user } = useAuth();

  const fetchAchievements = useCallback(async () => {
    if (!user) return;
    try {
      const result = await getAllAchievements(user.id);
      if (result.success) {
        setAchievements(result.data as AchievementItem[]);
      } else {
        toast.error(result.error || 'Failed to load achievements');
        setAchievements([]);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast.error('Failed to load achievements');
      setAchievements([]);
    }
  }, [user]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const handleAddAchievement = () => {
    setCurrentAchievement(null);
    setIsDialogOpen(true);
  };

  const handleEditAchievement = (achievement: AchievementItem) => {
    setCurrentAchievement(achievement);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (achievement: AchievementItem) => {
    setAchievementToDelete(achievement);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!achievementToDelete) return;

    setIsDeleting(true);

    try {
      await deleteAchievement(achievementToDelete.id);
      await fetchAchievements();

      setIsDeleteDialogOpen(false);
      setAchievementToDelete(null);
      toast.success('Achievement deleted successfully');
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast.error('Failed to delete achievement');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveAchievement = async (achievement: any) => {
    setIsSaving(true);

    try {
      if (currentAchievement) {
        // Update existing achievement
        await updateAchievement({ ...achievement, id: currentAchievement.id }, user?.id as string);

        toast.success('Achievement updated successfully');
        setCurrentAchievement(null);
        setIsDialogOpen(false);
      } else {
        await addNewAchievement(achievement, user?.id as string);
        toast.success('Achievement added successfully');
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving achievement:', error);
      toast.error('Failed to save achievement');
    } finally {
      setIsSaving(false);
      await fetchAchievements();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Achievements</h1>
          <p className="text-sm text-muted-foreground">Manage your professional achievements and certifications</p>
        </div>
        <Button onClick={handleAddAchievement} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      <DataTable
        columns={columns({
          onEdit: handleEditAchievement as never,
          onDelete: handleDeleteClick as never,
        })}
        data={achievements}
        searchKey="title"
        itemsPerPage={10}
        className="bg-card"
      />

      <AchievementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveAchievement}
        achievement={currentAchievement}
        isSaving={isSaving}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Delete Achievement"
        description={`Are you sure you want to delete "${achievementToDelete?.title}"? This action cannot be undone.`}
      />

      <Toaster position="top-center" />
    </div>
  );
}
