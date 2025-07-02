'use client';

import { ActionButton } from '@/app/admin/_components/action-button';
import { TagSelector } from '@/app/admin/_components/tag-selector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Project } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { FileUpload } from '../_components/file-upload';

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
  onOpenChange,
  open,
}: {
  project: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
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
  const { uploadFile, isUploading, reset, cancelUpload } = useFileUpload();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadFile(file);
      form.setValue('image', result.url);
      toast.success('File uploaded successfully');
      return result;
    } catch (err: any) {
      console.error('File upload failed:', err.message);
      toast.error('File upload failed');
    }
  };

  const onSubmit = (data: ProjectFormValues) => {
    setLoading(true);
    console.log(data);
    onSave(data as Project);
    setLoading(false);
  };

  // reset when project changes
  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        description: project.description,
        status: project.status,
        featured: project.featured,
        techStack: project.techStack,
        image: project.image,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        category: project.category,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        status: 'draft',
        featured: false,
        techStack: [],
        image: '',
        liveUrl: '',
        githubUrl: '',
        category: 'Web Application',
      });
    }
  }, [project, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {project ? 'Edit the details of your project' : 'Add a new project to your portfolio'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
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
                      <Textarea
                        placeholder="Project description"
                        className="min-h-[100px] max-h-[200px] resize-none overflow-y-auto"
                        {...field}
                      />
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
              <div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Image</FormLabel>
                      <FormControl>
                        <FileUpload
                          onFileUpload={handleFileUpload}
                          disabled={isUploading}
                          onCancel={cancelUpload}
                          accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
