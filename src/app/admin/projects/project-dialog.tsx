'use client';

import { useState } from 'react';
import { Project, Tag } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { ActionButton } from '@/app/admin/_components/action-button';
import { TagSelector } from '@/app/admin/_components/tag-selector';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['draft', 'published']).default('draft'),
  featured: z.boolean().default(false),
  techStack: z.array(z.string()).min(1, 'Select at least one technology'),
  image: z.string().url('Please enter a valid URL').or(z.literal('')),
  liveUrl: z.string().url('Please enter a valid URL').or(z.literal('')),
  githubUrl: z.string().url('Please enter a valid URL').or(z.literal('')),
  category: z.string().min(1, 'Category is required'),
});

type ProjectFormValues = Omit<z.infer<typeof formSchema>, 'techStack'> & {
  techStack: string[];
};

const availableTechnologies = [
  { id: 'nextjs', label: 'Next.js' },
  { id: 'react', label: 'React' },
  { id: 'tailwind', label: 'Tailwind CSS' },
  { id: 'node', label: 'Node.js' },
];

const projectCategories = ['Web Application', 'Mobile App', 'Desktop App', 'API', 'Library', 'Other'];

export default function ProjectDialog({
  project,
  onSave,
  onCancel,
}: {
  project: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
}) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      status: project?.status || 'draft',
      featured: project?.featured || false,
      techStack: project?.techStack || [],
      image: project?.image || '',
      liveUrl: project?.liveUrl || '',
      githubUrl: project?.githubUrl || '',
      category: project?.category || 'Web Application',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: ProjectFormValues) => {
    setLoading(true);

    const newProject: Project = {
      id: project?.id || crypto.randomUUID(),
      createdAt: project?.createdAt || new Date().toISOString().split('T')[0],
      title: data.title,
      description: data.description,
      status: data.status,
      featured: data.featured,
      techStack: data.techStack,
      image: data.image,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      category: data.category,
    };

    setTimeout(() => {
      onSave(newProject);
      setLoading(false);
    }, 700);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? 'Edit Project' : 'Add New Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Project description" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <TagSelector
                      availableTags={availableTechnologies}
                      selectedTags={field.value.map(tag => ({
                        id: tag,
                        label: availableTechnologies.find(t => t.id === tag)?.label || tag,
                      }))}
                      onChange={tags => field.onChange(tags.map(tag => tag.id))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username/repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
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
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Project</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <ActionButton type="submit" isPending={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save Project
              </ActionButton>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
