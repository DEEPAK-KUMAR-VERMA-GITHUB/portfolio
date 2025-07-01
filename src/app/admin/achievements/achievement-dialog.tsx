'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Achievement } from '@/types/types';
import { useState, useEffect } from 'react';

interface AchievementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (achievement: Omit<Achievement, 'id'>) => void;
  achievement?: Achievement | null;
  isSaving: boolean;
}

export default function AchievementDialog({
  open,
  onOpenChange,
  onSave,
  achievement,
  isSaving,
}: AchievementDialogProps) {
  const [title, setTitle] = useState(achievement?.title || '');
  const [issuer, setIssuer] = useState(achievement?.issuer || '');
  const [date, setDate] = useState<Date>(achievement?.date || new Date());
  const [icon, setIcon] = useState(achievement?.icon || '');
  const [description, setDescription] = useState(achievement?.description || '');

  // Reset form when achievement prop changes
  useEffect(() => {
    if (achievement) {
      setTitle(achievement.title);
      setIssuer(achievement.issuer);
      setDate(achievement.date);
      setIcon(achievement.icon || '');
      setDescription(achievement.description || '');
    } else {
      // Reset form when adding a new achievement
      setTitle('');
      setIssuer('');
      setDate(new Date());
      setIcon('🏆');
      setDescription('');
    }
  }, [achievement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      issuer,
      date,
      icon,
      description,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {achievement ? 'Edit Achievement' : 'Add New Achievement'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              Icon
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-20 text-center text-2xl h-14"
                maxLength={2}
              />
              <div className="text-sm text-muted-foreground">
                Enter an emoji or text (max 2 characters)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="issuer" className="text-right">
              Issuer *
            </Label>
            <Input
              id="issuer"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date *
            </Label>
            <Input
              type="date"
              id="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              rows={3}
              placeholder="Brief description of the achievement"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
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
