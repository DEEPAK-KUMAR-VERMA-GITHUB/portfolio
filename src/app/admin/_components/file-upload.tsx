'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X, FileIcon, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<any>;
  onCancel?: () => void;
  onRemove?: () => Promise<void>;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  onFileUpload,
  onCancel,
  onRemove,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  className,
  disabled = false,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setCurrentFile(file);
      setError(null);
      setIsUploading(true);
      setProgress(0);

      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      try {
        const result = await onFileUpload(file);
        if (result) {
          // Only update if upload wasn't cancelled
          setUploadedFile(result);
          setProgress(100);
          setTimeout(() => setProgress(0), 1000);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to upload file');
        }
      } finally {
        clearInterval(interval);
        setIsUploading(false);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: 1,
    disabled: isUploading || disabled,
  });

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    setCurrentFile(null);
    setProgress(0);
    setIsUploading(false);
    setUploadedFile(null);
    setError(null);
  }, [onCancel]);

  const handleRemove = useCallback(async () => {
    try {
      if (onRemove) {
        await onRemove();
      }
      handleCancel();
    } catch (err: any) {
      console.error('Error removing file:', err);
      setError(err.message || 'Failed to remove file');
    }
  }, [handleCancel, onRemove]);

  return (
    <div className={cn('w-full', className)}>
      {!uploadedFile && !currentFile ? (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            isDragActive ? 'border-primary bg-primary/10' : 'border-border',
            (disabled || isUploading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              {isDragActive ? <p>Drop the file here</p> : <p>Drag & drop a file here, or click to select a file</p>}
            </div>
            <p className="text-xs text-muted-foreground">Accepted formats: {Object.values(accept).flat().join(', ')}</p>
            <p className="text-xs text-muted-foreground">Max size: {maxSize / 1024 / 1024}MB</p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <FileIcon className="w-8 h-8 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{uploadedFile?.originalname || currentFile?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {uploadedFile
                    ? `${(uploadedFile.size / 1024).toFixed(1)} KB`
                    : currentFile
                      ? `${(currentFile.size / 1024).toFixed(1)} KB`
                      : ''}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={isUploading ? handleCancel : handleRemove}
              disabled={!isUploading && disabled}
              className="h-8 w-8 flex-shrink-0"
            >
              {isUploading ? <XCircle className="h-4 w-4 text-destructive" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          {isUploading && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="mt-2 flex justify-end">
                <Button type="button" variant="outline" size="sm" onClick={handleCancel} className="h-8 text-xs">
                  Cancel Upload
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
