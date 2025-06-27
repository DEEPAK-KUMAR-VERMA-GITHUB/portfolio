'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/components/ui/color-picker';
import { Icons } from '@/components/icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Category, Technology, Label } from '@/types/types';

type EntityType = 'category' | 'technology' | 'label';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  textColor: z.string().optional(),
  website: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  categoryId: z.string().optional(),
  featured: z.boolean().optional(),
});

interface CategoryFormProps {
  type: EntityType;
  initialData?: Category | Technology | Label | null;
  categories?: Category[];
  onSuccess: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CategoryForm({
  type,
  initialData,
  categories = [],
  onSuccess,
  onCancel,
  isSubmitting,
}: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [selectedTextColor, setSelectedTextColor] = useState('#ffffff');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      icon: '',
      color: '#3b82f6',
      textColor: '#ffffff',
      website: '',
      categoryId: '',
      featured: false,
    },
  });

  // Set initial values when editing
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        slug: initialData.slug,
        description: initialData.description || '',
        icon: 'icon' in initialData ? initialData.icon : '',
        color: 'color' in initialData ? initialData.color : '#3b82f6',
        textColor: 'textColor' in initialData ? initialData.textColor : '#ffffff',
        website: 'website' in initialData ? initialData.website : '',
        categoryId: 'categoryId' in initialData ? initialData.categoryId : '',
        featured: 'featured' in initialData ? initialData.featured : false,
      });
      
      if ('color' in initialData && initialData.color) {
        setSelectedColor(initialData.color);
      }
      if ('textColor' in initialData && initialData.textColor) {
        setSelectedTextColor(initialData.textColor);
      }
    }
  }, [initialData, form]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue('name', name);
    form.setValue('slug', generateSlug(name), { shouldValidate: true });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(
        initialData 
          ? `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`
          : `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`
      );
      onSuccess();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(`Failed to save ${type}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Enter ${type} name`}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleNameChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="unique-identifier"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground text-xs">
                      {field.value ? `${field.value.length} chars` : 'auto-generated'}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === 'technology' && categories.length > 0 && (
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(type === 'category' || type === 'label') && (
            <>
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <ColorPicker
                          color={selectedColor}
                          onChange={(color) => {
                            setSelectedColor(color);
                            field.onChange(color);
                          }}
                        />
                        <Input
                          className="w-24"
                          value={selectedColor}
                          onChange={(e) => {
                            const color = e.target.value;
                            setSelectedColor(color);
                            field.onChange(color);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {type === 'label' && (
                <FormField
                  control={form.control}
                  name="textColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text Color</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <ColorPicker
                            color={selectedTextColor}
                            onChange={(color) => {
                              setSelectedTextColor(color);
                              field.onChange(color);
                            }}
                          />
                          <Input
                            className="w-24"
                            value={selectedTextColor}
                            onChange={(e) => {
                              const color = e.target.value;
                              setSelectedTextColor(color);
                              field.onChange(color);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}

          {type === 'technology' && (
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      type="url"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., react, nextjs, typescript"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === 'technology' && (
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured Technology</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Show this technology in the featured section
                    </p>
                  </div>
                </FormItem>
              )}
            />
          )}

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Enter a description for this ${type}`}
                      className="min-h-[100px]"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading || isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
          >
            {(isLoading || isSubmitting) && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {initialData ? 'Save Changes' : `Create ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </Button>
        </div>
      </form>
    </Form>
  );
}
