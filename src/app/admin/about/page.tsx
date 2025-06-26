'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ActionButton } from '@/app/admin/_components/action-button';
import { Save } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUpload } from '../_components/image-upload';

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
  website: z.string().url('Invalid URL'),
  profileImage: z.string().url('Invalid URL'),
});

export default function AboutPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      title: '',
      bio: '',
      location: '',
      email: '',
      phone: '',
      website: '',
      profileImage: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      console.log('Form submitted:', data);
      toast.success('About information updated successfully');
    } catch (error) {
      console.error('Error updating about information:', error);
      toast.error('Failed to update about information');
    } finally {
      setLoading(false);
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
                <Input 
                  placeholder="Deepak Kumar Verma" 
                  {...register('name')} 
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Title</label>
                <Input 
                  placeholder="Software Engineer" 
                  {...register('title')} 
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                placeholder="Tell us about yourself..."
                className="min-h-[100px]"
                {...register('bio')}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input 
                  placeholder="City, Country" 
                  {...register('location')} 
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  {...register('email')} 
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input 
                  placeholder="+91 1234567890" 
                  {...register('phone')} 
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Website</label>
                <Input 
                  placeholder="https://yourwebsite.com" 
                  {...register('website')} 
                />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Profile Image</label>
              <Controller
                name="profileImage"
                control={control}
                render={({ field }: { field: any }) => (
                  <ImageUpload
                    value={previewUrl || (typeof field.value === 'string' ? field.value : '')}
                    onChange={(file: File | null, url: string) => {
                      field.onChange(file || '');
                      setPreviewUrl(url || '');
                    }}
                  />
                )}
              />
              {errors.profileImage && (
                <p className="text-sm text-red-500">{errors.profileImage.message}</p>
              )}
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
