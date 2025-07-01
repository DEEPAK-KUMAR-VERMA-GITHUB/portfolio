'use client';

import { useEffect, useState } from 'react';
import { Skill } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { addNewSkill } from './actions';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(['frontend', 'backend', 'tools', 'language', 'database', 'others']),
  level: z.number().min(0).max(100),
});

type SkillFormValues = z.infer<typeof formSchema>;

const skillCategoryOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'tools', label: 'Tools' },
  { value: 'language', label: 'Language' },
  { value: 'database', label: 'Database' },
  { value: 'others', label: 'Others' },
];

export default function SkillDialog({
  skill,
  onSave,
  onCancel,
  onOpenChange,
  open,
}: {
  skill: Skill | null;
  onSave: (skill: Skill) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: 'frontend',
      level: 50,
    },
  });

  useEffect(() => {
    if (skill) {
      form.reset({
        name: skill.name,
        category: skill.category,
        level: skill.level,
      });
    } else {
      form.reset({
        name: '',
        category: 'frontend',
        level: 50,
      });
    }
  }, [skill, form, open]);

  const onSubmit = async (data: SkillFormValues) => {
    try {
      setIsSubmitting(true);
      const newSkill = {
        name: data.name.trim(),
        category: data.category,
        level: data.level,
      };

      await onSave(newSkill);

      toast.success(skill ? 'Skill updated successfully!' : 'Skill added successfully!');
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save skill');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{skill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
          <DialogDescription>
            {skill ? 'Update the skill details below.' : 'Fill in the details to add a new skill.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Node.js" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillCategoryOptions.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level: {field.value}%</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={[field.value]}
                      onValueChange={value => field.onChange(value[0])}
                      className="py-4"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {skill ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {skill ? 'Update' : 'Save'} Skill
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
