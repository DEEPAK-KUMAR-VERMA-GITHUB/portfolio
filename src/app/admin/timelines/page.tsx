'use client';

import { DataTable } from '@/app/admin/projects/data-table';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { TimelineItem } from '@/types/types';
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { DeleteConfirmationDialog } from '../_components/delete-confirmation-dialog';
import { addNewTimeline, deleteTimeline, getTimelines, updateTimeline } from './actions';
import { columns } from './columns';
import TimelineDialog from './timeline-dialog';

export default function TimelinesPage() {
  const [timelines, setTimelines] = useState<TimelineItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [currentTimeline, setCurrentTimeline] = useState<TimelineItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [timelineToDelete, setTimelineToDelete] = useState<TimelineItem | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const fetchTimelines = useCallback(async () => {
    if (!user) return;
    try {
      const result = await getTimelines(user?.id as string);
      if (result.success) {
        setTimelines(result.data);
      }
    } catch (error) {
      console.error('Error fetching timelines:', error);
    }
  }, [user]);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    fetchTimelines();
  }, [fetchTimelines, refreshTrigger]);

  const handleAddTimeline = () => {
    setCurrentTimeline(null);
    setIsDialogOpen(true);
  };

  const handleEditTimeline = (timeline: TimelineItem) => {
    setCurrentTimeline(timeline);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (timeline: TimelineItem) => {
    setTimelineToDelete(timeline);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!timelineToDelete) return;

    setIsDeleting(true);

    try {
      await deleteTimeline(timelineToDelete.id!);
      triggerRefresh();

      toast.success('Timeline item deleted successfully');
    } catch (error) {
      console.error('Error deleting timeline item:', error);
      toast.error('Failed to delete timeline item');
    } finally {
      setIsDeleteDialogOpen(false);
      setTimelineToDelete(null);
      setIsDeleting(false);
    }
  };

  const handleSaveTimeline = async (timelineData: Omit<TimelineItem, 'id'>) => {
    setIsSaving(true);

    try {
      if (currentTimeline && 'id' in currentTimeline) {
        // Update existing timeline
        await updateTimeline({
          ...timelineData,
          id: currentTimeline.id,
          userId: user?.id as string,
          updatedAt: new Date(),
        } as TimelineItem);
        triggerRefresh();
        toast.success('Timeline item updated successfully');
      } else {
        await addNewTimeline(timelineData as TimelineItem, user?.id as string);
        triggerRefresh();
        toast.success('Timeline item added successfully');
      }

      setIsDialogOpen(false);
      setCurrentTimeline(null);
    } catch (error) {
      console.error('Error saving timeline item:', error);
      toast.error('Failed to save timeline item');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Timelines</h1>
          <p className="text-sm text-muted-foreground">Manage your education, experience, and project timelines</p>
        </div>
        <Button onClick={handleAddTimeline} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add New Timeline
        </Button>
      </div>

      <DataTable
        columns={columns({
          onEdit: handleEditTimeline,
          onDelete: handleDeleteClick,
        })}
        data={timelines}
        searchKey="title"
        itemsPerPage={10}
        className="bg-card"
      />

      <TimelineDialog
        open={isDialogOpen}
        onOpenChangeAction={setIsDialogOpen}
        onSaveAction={handleSaveTimeline}
        timeline={currentTimeline}
        isSaving={isSaving}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Delete Timeline"
        description={`Are you sure you want to delete "${timelineToDelete?.title}"? This action cannot be undone.`}
      />

      <Toaster position="top-right" />
    </div>
  );
}
