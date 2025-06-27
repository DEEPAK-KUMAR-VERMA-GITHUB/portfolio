'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Upload, X, CheckCircle2 } from 'lucide-react';

interface ResumeUploadProps {
  onFileSelected: (file: File) => Promise<void>;
  isUploading: boolean;
  uploadProgress: number;
  error?: string | null;
}

export default function ResumeUpload({
  onFileSelected,
  isUploading,
  uploadProgress,
  error,
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsDragging(false);
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false)
  });

  const removeFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (file) {
      await onFileSelected(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            {isDragActive ? (
              <p>Drop your resume here...</p>
            ) : (
              <p>
                <span className="font-medium text-primary">Click to upload</span> or drag and drop
                <br />
                <span className="text-xs">PDF, DOC, or DOCX (max 5MB)</span>
              </p>
            )}
          </div>
        </div>
      </div>


      {file && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-md bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)} • {file.type.split('/').pop()?.toUpperCase()}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={removeFile}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>


          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {error && (
            <div className="text-sm text-destructive flex items-center space-x-2">
              <X className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {!isUploading && (
            <Button
              type="button"
              onClick={handleUpload}
              className="w-full"
              disabled={!file || isUploading}
            >
              Upload Resume
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
