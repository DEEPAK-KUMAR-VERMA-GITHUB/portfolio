'use client';

import { Button } from '@/components/ui/button';
import { Achievement } from '@/types/types';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { DataTable } from '@/app/admin/projects/data-table';
import { columns } from './columns';
import AchievementDialog from './achievement-dialog';
import { DeleteConfirmationDialog } from '../_components/delete-confirmation-dialog';

// Mock data - replace with actual API calls
const initialAchievements: Achievement[] = [
  {
    title: 'Best Project Award',
    issuer: 'Tech Conference 2024',
    date: '2024-05-15',
    icon: '🏆',
    description: 'Awarded for the most innovative project at the annual tech conference.'
  },
  {
    title: 'React Certification',
    issuer: 'React Academy',
    date: '2024-03-10',
    icon: '🎓',
    description: 'Completed advanced React.js certification with honors.'
  },
  {
    title: 'Hackathon Winner',
    issuer: 'CodeFest 2024',
    date: '2024-02-20',
    icon: '🚀',
    description: 'First place in the 48-hour coding competition.'
  },
];

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [achievementToDelete, setAchievementToDelete] = useState<Achievement | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Load achievements on component mount
  useEffect(() => {
    // In a real app, you would fetch this from an API
    setAchievements(initialAchievements);
  }, []);

  const handleAddAchievement = () => {
    setCurrentAchievement(null);
    setIsDialogOpen(true);
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setCurrentAchievement(achievement);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (achievement: Achievement) => {
    setAchievementToDelete(achievement);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!achievementToDelete) return;

    setIsDeleting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAchievements(prev => 
        prev.filter(a => 
          a.title !== achievementToDelete.title || 
          a.issuer !== achievementToDelete.issuer
        )
      );
      
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

  const handleSaveAchievement = async (achievement: Omit<Achievement, 'id'>) => {
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (currentAchievement) {
        // Update existing achievement
        setAchievements(prev => 
          prev.map(a => 
            a.title === currentAchievement.title && a.issuer === currentAchievement.issuer
              ? { ...achievement }
              : a
          )
        );
        toast.success('Achievement updated successfully');
      } else {
        // Add new achievement
        setAchievements(prev => [...prev, achievement]);
        toast.success('Achievement added successfully');
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving achievement:', error);
      toast.error('Failed to save achievement');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Achievements</h1>
          <p className="text-sm text-muted-foreground">
            Manage your professional achievements and certifications
          </p>
        </div>
        <Button onClick={handleAddAchievement} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      <DataTable
        columns={columns({
          onEdit: handleEditAchievement,
          onDelete: handleDeleteClick,
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
