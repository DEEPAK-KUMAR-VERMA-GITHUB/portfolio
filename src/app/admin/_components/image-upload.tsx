'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null, preview: string) => void;
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  disabled = false,
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const fileUrl = URL.createObjectURL(file);
      setFile(file);
      setPreview(fileUrl);
      onChange(file, fileUrl);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    maxFiles: 1,
    onDrop,
    disabled,
  });

  const handleRemove = () => {
    setPreview(null);
    setFile(null);
    onChange(null, '');
  };

  return (
    <div className={cn('space-y-4', className)}>
      {preview ? (
        <div className="relative group">
          <div className="relative aspect-video rounded-md overflow-hidden border">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 rounded-full w-6 h-6"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors',
            isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className={cn('h-10 w-10 text-muted-foreground', isDragActive && 'text-primary')} />
            <div className="text-sm text-muted-foreground">
              {isDragActive ? (
                <p>Drop the image here</p>
              ) : (
                <p>
                  <span className="font-medium text-primary">Click to upload</span> or drag and drop
                </p>
              )}
              <p className="text-xs text-muted-foreground/70 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
