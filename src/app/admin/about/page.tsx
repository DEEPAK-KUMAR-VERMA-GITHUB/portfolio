'use client';

import { ActionButton } from '@/app/admin/_components/action-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/auth-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Tag as ReactTag, WithContext as ReactTags } from 'react-tag-input';
import z from 'zod';
import { FileUpload } from '@/app/admin/_components/file-upload';
import { updateAboutInfoAction } from '@/app/admin/about/actions';
import { useFileUpload } from '@/hooks/useFileUpload';

interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  profileImage: string;
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  image: z.string().optional(),
  professionalTitles: z.array(z.string()).min(1, 'Professional title is required'),
  githubUrl: z.string().url('Github Url is required').startsWith('https://github.com'),
  linkedInUrl: z.string().url('Linkedin Url is required').startsWith('https://www.linkedin.com'),
  mailLink: z.string().url('Mail Url is required').startsWith('mailto:'),
  about: z.string().min(10, 'About must be at least 10 characters'),
  journey: z.string().min(10, 'Journey must be at least 10 characters'),
  tags: z.array(z.string()).min(1, 'Select at least one tag'),
});

export default function AboutPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<any | null>(null);
  const { user } = useAuth();
  const { uploadFile, removeUplaodedFile } = useFileUpload();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      title: '',
      bio: '',
      location: '',
      email: '',
      phone: '',
      image: undefined,
      professionalTitles: [],
      githubUrl: '',
      linkedInUrl: '',
      mailLink: '',
      about: '',
      journey: '',
      tags: [],
    },
  });

  useEffect(() => {
    if (user) {
      console.log(user);
      setValue('name', user.name || '');
      setValue('title', user.title || '');
      setValue('bio', user.bio || '');
      setValue('location', user.location || '');
      setValue('email', user.email || '');
      setValue('phone', user.phone || '');
      setValue('image', user.image || '');
      setValue('professionalTitles', user.professionalTitles || []);
      setValue('githubUrl', user.githubUrl || '');
      setValue('linkedInUrl', user.linkedInUrl || '');
      setValue('mailLink', user.mailLink || '');
      setValue('about', user.about || '');
      setValue('journey', user.journey || '');
      setValue('tags', user.tags || []);

      setPreviewUrl(user.image || '');
    }
  }, [user]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (previewUrl) data.image = previewUrl;
      console.log('Form submitted:', data);
      await updateAboutInfoAction(user?.id as string, data);
      toast.success('About information updated successfully');
    } catch (error) {
      console.error('Error updating about information:', error);
      toast.error('Failed to update about information');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadFile(file);
      setCurrentImage(result);
      setPreviewUrl(result.url);
      console.log(result);
    } catch (error: any) {
      console.error('File upload failed:', error.message);
      toast.error('Failed to upload file');
    }
  };

  const handleRemoveFile = async () => {
    try {
      await removeUplaodedFile(currentImage?.url.split('/').pop() as string);
      setPreviewUrl('');
      setCurrentImage(null);
    } catch (error: any) {
      console.error('File removal failed:', error.message);
      toast.error('Failed to remove file');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">About Information</h2>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Deepak Kumar Verma" {...register('name')} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Software Engineer" {...register('title')} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                placeholder="Tell us about yourself..."
                className="min-h-[100px] resize-none"
                {...register('bio')}
              />
              {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input placeholder="+91 1234567890" {...register('phone')} />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="your@email.com" {...register('email')} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="City, Country" {...register('location')} />
                {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mail URL</label>
                <Input placeholder="mailto:your@email.com" {...register('mailLink')} />
                {errors.mailLink && <p className="text-sm text-red-500">{errors.mailLink.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Professional Title</label>
              <Controller
                name="professionalTitles"
                control={control}
                render={({ field }: { field: any }) => (
                  <ReactTags
                    tags={
                      (field.value || []).map((tag: string) => ({
                        id: tag,
                        text: tag,
                      })) || []
                    }
                    handleDelete={i => {
                      const newTags = field.value.filter((_: any, index: number) => index !== i);
                      field.onChange(newTags);
                    }}
                    handleAddition={(tag: ReactTag) => {
                      const newTags = [...(field.value || []), tag.text || tag.id];
                      field.onChange(newTags);
                    }}
                    inputFieldPosition="top"
                    placeholder="Add a professional title and press enter"
                    classNames={{
                      tags: 'flex flex-wrap gap-2',
                      tagInput: 'w-full',
                      tagInputField: 'w-full p-2 border rounded',
                      selected: 'flex flex-wrap gap-2',
                      tag: 'bg-gray-200 px-2 py-1 rounded flex items-center',
                      remove: 'ml-1 cursor-pointer',
                    }}
                  />
                )}
              />

              {errors.professionalTitles && <p className="text-sm text-red-500">{errors.professionalTitles.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Linkedin URL</label>
                <Input placeholder="https://linkedin.com/in/username" {...register('linkedInUrl')} />
                {errors.linkedInUrl && <p className="text-sm text-red-500">{errors.linkedInUrl.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Github URL</label>
                <Input placeholder="https://github.com/username" {...register('githubUrl')} />
                {errors.githubUrl && <p className="text-sm text-red-500">{errors.githubUrl.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">About</label>
              <Textarea
                placeholder="Tell us about yourself..."
                className="min-h-[100px] resize-none"
                {...register('about')}
              />
              {errors.about && <p className="text-sm text-red-500">{errors.about.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Journey</label>
              <Textarea
                placeholder="Tell us about yourself..."
                className="min-h-[100px] resize-none"
                {...register('journey')}
              />
              {errors.journey && <p className="text-sm text-red-500">{errors.journey.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <Controller
                name="tags"
                control={control}
                render={({ field }: { field: any }) => (
                  <ReactTags
                    tags={
                      (field.value || []).map((tag: string) => ({
                        id: tag,
                        text: tag,
                      })) || []
                    }
                    handleDelete={i => {
                      const newTags = field.value.filter((_: any, index: number) => index !== i);
                      field.onChange(newTags);
                    }}
                    handleAddition={(tag: ReactTag) => {
                      const newTags = [...(field.value || []), tag.text || tag.id];
                      field.onChange(newTags);
                    }}
                    inputFieldPosition="top"
                    placeholder="Add a tag and press enter"
                    classNames={{
                      tags: 'flex flex-wrap gap-2',
                      tagInput: 'w-full',
                      tagInputField: 'w-full p-2 border rounded',
                      selected: 'flex flex-wrap gap-2',
                      tag: 'bg-gray-200 px-2 py-1 rounded flex items-center',
                      remove: 'ml-1 cursor-pointer',
                    }}
                  />
                )}
              />
              {errors.tags && <p className="text-sm text-red-500">{errors.tags.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Profile Image</label>
              {previewUrl && (
                <div className="mb-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                    <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <FileUpload
                    accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'] }}
                    onFileUpload={handleFileUpload}
                    onRemove={handleRemoveFile}
                    onCancel={handleRemoveFile}
                    disabled={loading}
                  />
                )}
              />
              {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
            </div>

            <ActionButton type="submit" isPending={loading}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </ActionButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
