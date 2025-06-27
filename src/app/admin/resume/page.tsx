'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster, toast } from 'react-hot-toast';
import { Plus, Upload as UploadIcon, FileText, Download, Settings } from 'lucide-react';
import { DeleteConfirmationDialog } from '../_components/delete-confirmation-dialog';
import ResumeUpload from './resume-upload';
import ResumeItem from './resume-item';
import { Resume } from '@/types/types';

// Mock data - replace with API calls
const mockResumes: Resume[] = [
  {
    id: '1',
    title: 'Software Engineer Resume',
    fileUrl: '/resumes/resume-2024.pdf',
    fileSize: '1.2 MB',
    fileType: 'application/pdf',
    isDefault: true,
    lastUpdated: '2024-06-20T10:30:00Z',
    version: '2.0',
    description: 'Latest version with updated experience and skills',
  },
  {
    id: '2',
    title: 'Software Engineer Resume',
    fileUrl: '/resumes/resume-2023.pdf',
    fileSize: '1.1 MB',
    fileType: 'application/pdf',
    isDefault: false,
    lastUpdated: '2023-06-15T14:20:00Z',
    version: '1.5',
  },
];

export default function ResumePage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load resumes on component mount
  useEffect(() => {
    // Simulate API call
    const fetchResumes = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch this from an API
        await new Promise(resolve => setTimeout(resolve, 500));
        setResumes(mockResumes);
      } catch (error) {
        console.error('Error fetching resumes:', error);
        toast.error('Failed to load resumes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // In a real app, you would upload the file to your server
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Create a new resume object
      const newResume: Resume = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
        fileUrl: URL.createObjectURL(file),
        fileSize: formatFileSize(file.size),
        fileType: file.type,
        isDefault: false,
        lastUpdated: new Date().toISOString(),
        version: '1.0', // In a real app, you might want to increment this
      };

      // Add the new resume and set it as default if it's the first one
      setResumes(prevResumes => {
        const updatedResumes = prevResumes.map(r => ({
          ...r,
          isDefault: false,
        }));
        return [newResume, ...updatedResumes];
      });

      toast.success('Resume uploaded successfully');
      setActiveTab('manage');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload resume. Please try again.');
      toast.error('Failed to upload resume');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setResumes(prevResumes =>
        prevResumes.map(resume => ({
          ...resume,
          isDefault: resume.id === id,
        }))
      );
      
      toast.success('Default resume updated');
    } catch (error) {
      console.error('Error setting default resume:', error);
      toast.error('Failed to update default resume');
    }
  };

  const handleDeleteClick = (id: string) => {
    setResumeToDelete(id);
  };

  const handleDeleteConfirm = async () => {
    if (!resumeToDelete) return;
    
    setIsDeleting(true);
    
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setResumes(prevResumes => {
        const updatedResumes = prevResumes.filter(r => r.id !== resumeToDelete);
        
        // If we deleted the default resume and there are other resumes,
        // set the first one as default
        if (updatedResumes.length > 0 && !updatedResumes.some(r => r.isDefault)) {
          updatedResumes[0].isDefault = true;
        }
        
        return updatedResumes;
      });
      
      toast.success('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
    } finally {
      setResumeToDelete(null);
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const defaultResume = resumes.find(r => r.isDefault);
  const otherResumes = resumes.filter(r => !r.isDefault);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Resume Management</h1>
        <p className="text-muted-foreground">
          Upload and manage different versions of your resume
        </p>
      </div>

      <Tabs 
        defaultValue="upload" 
        className="space-y-6"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList>
          <TabsTrigger value="upload">
            <UploadIcon className="h-4 w-4 mr-2" />
            Upload New
          </TabsTrigger>
          <TabsTrigger value="manage">
            <FileText className="h-4 w-4 mr-2" />
            Manage Resumes
          </TabsTrigger>
          <TabsTrigger value="settings" disabled>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Resume</CardTitle>
              <CardDescription>
                Upload a new version of your resume. Accepted formats: PDF, DOC, DOCX (max 5MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResumeUpload
                onFileSelected={handleFileUpload}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                error={error}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : resumes.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No resumes found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your first resume to get started
                </p>
                <Button onClick={() => setActiveTab('upload')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {defaultResume && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Default Resume</h3>
                  <ResumeItem
                    resume={defaultResume}
                    onSetDefault={handleSetDefault}
                    onDelete={handleDeleteClick}
                  />
                </div>
              )}

              {otherResumes.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Other Versions</h3>
                  <div className="space-y-3">
                    {otherResumes.map(resume => (
                      <ResumeItem
                        key={resume.id}
                        resume={resume}
                        onSetDefault={handleSetDefault}
                        onDelete={handleDeleteClick}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <DeleteConfirmationDialog
        open={!!resumeToDelete}
        onOpenChange={(open) => !open && setResumeToDelete(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Delete Resume"
        description="Are you sure you want to delete this resume? This action cannot be undone."
      />

      <Toaster position="top-center" />
    </div>
  );
}