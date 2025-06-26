'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TimelineItem } from '@/types/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';

interface TimelineDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  onSaveAction: (timeline: Omit<TimelineItem, 'id'>) => void;
  timeline?: TimelineItem | null;
  isSaving: boolean;
}

export default function TimelineDialog({
  open,
  onOpenChangeAction,
  onSaveAction,
  timeline,
  isSaving,
}: TimelineDialogProps) {
  const [title, setTitle] = useState(timeline?.title || '');
  const [organization, setOrganization] = useState(timeline?.organization || '');
  const [period, setPeriod] = useState(timeline?.period || '');
  const [description, setDescription] = useState(timeline?.description || '');
  const [type, setType] = useState<TimelineItem['type']>(timeline?.type || 'experience');

  // Update form fields when timeline prop changes
  useEffect(() => {
    if (timeline) {
      setTitle(timeline.title || '');
      setOrganization(timeline.organization || '');
      setPeriod(timeline.period || '');
      setDescription(timeline.description || '');
      setType(timeline.type || 'experience');
    } else {
      // Reset form when adding a new item
      setTitle('');
      setOrganization('');
      setPeriod('');
      setDescription('');
      setType('experience');
    }
  }, [timeline]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAction({
      title,
      organization,
      period,
      description,
      type,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{timeline ? 'Edit Timeline Item' : 'Add New Timeline Item'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={type}
                onValueChange={(value: TimelineItem['type']) => setType(value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization *</Label>
              <Input
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period *</Label>
              <Input
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g., 2020 - Present"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChangeAction(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
