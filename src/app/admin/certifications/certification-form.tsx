'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useFileUpload } from '@/hooks/useFileUpload';
import { cn } from '@/lib/utils';
import { Certification } from '@/types/types';
import { toast } from 'react-hot-toast';
import { FileUpload } from '../_components/file-upload';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  issuer: z.string().min(2, 'Issuer name must be at least 2 characters'),
  date: z.date({
    required_error: 'Issue date is required',
    invalid_type_error: 'Please select a valid date',
  }),
  icon: z.string().optional(),
  image: z.string().url('Please enter a valid image URL').or(z.literal('')),
  verified: z.boolean().default(false),
  verifyUrl: z.string().url('Please enter a valid verification URL').or(z.literal('')),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters'),
});

type CertificationFormValues = z.infer<typeof formSchema>;

interface CertificationFormProps {
  open: boolean;
  certification?: any;
  onOpenChangeAction: (open: boolean) => void;

  onSaveAction: (cert: Certification) => void;
}

export function CertificationForm({ open, onOpenChangeAction, certification, onSaveAction }: CertificationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [certificationImageUrl, setCertificationImageUrl] = useState<string>('');

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: '',
      issuer: '',
      date: new Date(),
      icon: '🎓',
      image: '',
      verified: false,
      verifyUrl: '',
      description: '',
    },
  });

  const { uploadFile, isUploading, cancelUpload, removeUplaodedFile } = useFileUpload();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadFile(file);
      setCertificationImageUrl(result.url);
      toast.success('File uploaded successfully');
    } catch (err: any) {
      console.error('File upload failed:', err.message);
      toast.error('File upload failed');
    }
  };

  const handleCancel = async () => {
    onOpenChangeAction(false);
    if (certificationImageUrl) {
      await removeUplaodedFile(certificationImageUrl.split('/').pop() as string);
    }
  };

  useEffect(() => {
    if (certification) {
      form.reset({
        ...certification,
        date: new Date(certification.date),
      });
    } else {
      form.reset({
        title: '',
        issuer: '',
        date: new Date(),
        icon: '🎓',
        image: '',
        verified: false,
        verifyUrl: '',
        description: '',
      });
    }
  }, [certification, form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{certification ? 'Edit Certification' : 'Add New Certification'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data => {
              onSaveAction({
                ...data,
                image: certificationImageUrl,
              });
            })}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AWS Certified Solutions Architect" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issuer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuer</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Amazon Web Services" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Issue Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                              isLoading && 'opacity-50 cursor-not-allowed'
                            )}
                            disabled={isLoading}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date => date > new Date() || date < new Date('2000-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon (Emoji)</FormLabel>
                    <FormControl>
                      <Input placeholder="🎓" maxLength={2} {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Optional emoji to represent this certification</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="verifyUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/verify/123" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Link to verify this certification (optional)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="verified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Verified</FormLabel>
                      <FormDescription>Check if this certification has been verified</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification Image</FormLabel>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description of what this certification represents and any relevant details..."
                      className="min-h-[100px] resize-none"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-right">{field.value?.length || 0}/1000 characters</FormDescription>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="min-w-[100px]">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {certification ? 'Updating...' : 'Creating...'}
                  </>
                ) : certification ? (
                  'Update Certification'
                ) : (
                  'Create Certification'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
