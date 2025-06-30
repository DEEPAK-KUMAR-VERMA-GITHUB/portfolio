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

const formSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum([
    'frontend',
    'backend',
    'tools',
    'language',
    'framework',
    'database',
    'library',
    'version_control',
    'cloud',
    'testing',
    'security',
    'devops',
    'operating_system',
    'other',
  ]),
  level: z.number().min(0).max(100),
});

type SkillFormValues = z.infer<typeof formSchema>;

const skillCategories = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'tools', label: 'Tools' },
  { value: 'language', label: 'Language' },
  { value: 'framework', label: 'Framework' },
  { value: 'database', label: 'Database' },
  { value: 'library', label: 'Library' },
  { value: 'version_control', label: 'Version Control' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'testing', label: 'Testing' },
  { value: 'security', label: 'Security' },
  { value: 'devops', label: 'DevOps' },
  { value: 'operating_system', label: 'Operating System' },
  { value: 'other', label: 'Other' },
];

export default function SkillDialog({
  skill,
  onSave,
  onCancel,
  onOpenChange,
  open,
}: {
  skill: Skill | null;
  onSave: (skill: Skill) => void;
  onCancel: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}) {
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: skill?.name || '',
      category: skill?.category || 'frontend',
      level: skill?.level || 50,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: SkillFormValues) => {
    setLoading(true);

    const newSkill: Skill = {
      name: data.name,
      category: data.category,
      level: data.level,
    };

    console.log(newSkill);

    setTimeout(() => {
      onSave(newSkill);
      setLoading(false);
    }, 500);
  };

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
  }, [skill, form]);

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
                    <Input placeholder="e.g., React, Node.js" {...field} />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillCategories.map(category => (
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  'Saving...'
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> {skill ? 'Update' : 'Save'} Skill
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
