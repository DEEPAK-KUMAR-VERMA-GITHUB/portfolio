import { useRef, useState } from 'react';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    filename: string;
    originalname: string;
    size: number;
    mimetype: string;
  } | null>(null);

  const removeUplaodedFile = async (filename: string) => {
    console.log(filename);
    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove file');
      }
    } catch (err: any) {
      console.error('Error removing file:', err);
    }
  };

  // ref to store the abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError(null);

    // abort any ongoing upload
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (uploadedFile) {
      await removeUplaodedFile(uploadedFile.url.split('/').pop() as string);
      setUploadedFile(null);
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload file');
      }

      const data = await response.json();

      if (!data.file) {
        throw new Error('Invalid response');
      }

      setUploadedFile(data.file);
      return data.file;
    } catch (err: any) {
      await removeUplaodedFile(uploadedFile?.url.split('/').pop() as string);
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to upload file');
        throw new Error(err.message || 'Failed to upload file');
      }
      return null;
    } finally {
      setIsUploading(false);
      abortControllerRef.current = null;
    }
  };

  const reset = async () => {
    if (uploadedFile) {
      await removeUplaodedFile(uploadedFile.url.split('/').pop() as string);
    }
    setUploadedFile(null);
    setError(null);
  };

  const cancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      if (uploadedFile) {
        removeUplaodedFile(uploadedFile.url.split('/').pop() as string);
      }
    }
    setError(null);
  };

  return {
    uploadFile,
    isUploading,
    error,
    uploadedFile,
    reset,
    cancelUpload,
    removeUplaodedFile,
  };
};
