'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Loader2 } from 'lucide-react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { CertificationForm } from './certification-form';
import { Toaster, toast } from 'react-hot-toast';
import { addCertification, deleteCertification, getCertifications, updateCertification } from './actions';
import { useAuth } from '@/contexts/auth-context';

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon?: string;
  image: string;
  verified: boolean;
  verifyUrl: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [certificationToDelete, setCertificationToDelete] = useState<Certification | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const { user } = useAuth();

  const fetchCertifications = useCallback(async () => {
    if (!user) return;
    try {
      const response = await getCertifications(user?.id);
      if (response.success) {
        setCertifications(response.data as never[]);
      } else {
        toast.error(response.error as any);
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      toast.error('Failed to load certifications. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    fetchCertifications();
  }, [refreshTrigger]);

  const handleEdit = (cert: Certification) => {
    setEditingCert(cert);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteCertification(id);
      toast.success('Certification deleted successfully');
      triggerRefresh();
    } catch (error) {
      console.error('Error deleting certification:', error);
      toast.error('Failed to delete certification. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddNew = () => {
    setEditingCert(null);
    setIsFormOpen(true);
  };

  const handleSave = async (cert: Certification) => {
    try {
      if (editingCert) {
        await updateCertification(editingCert.id, cert);
        triggerRefresh();
        toast.success('Certification updated successfully');
      } else {
        await addCertification(cert, user?.id!);
        triggerRefresh();
        toast.success('Certification added successfully');
      }
      setIsFormOpen(false);
      setEditingCert(null);
    } catch (error) {
      console.error('Error saving certification:', error);
      toast.error('Failed to save certification. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Toaster position="top-right" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your professional certifications and credentials</p>
        </div>
        <Button onClick={handleAddNew} disabled={isLoading || isDeleting} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Certification
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading certifications...</span>
            </div>
          ) : (
            <DataTable
              columns={columns(handleEdit, handleDelete)}
              data={certifications}
              isLoading={isLoading}
              searchKey="title"
              emptyState={
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No certifications found</h3>
                  <p className="text-sm text-muted-foreground mt-1">Get started by adding a new certification</p>
                  <Button onClick={handleAddNew} className="mt-4" disabled={isLoading || isDeleting}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                  </Button>
                </div>
              }
            />
          )}
        </CardContent>
      </Card>

      <CertificationForm
        open={isFormOpen}
        onOpenChangeAction={setIsFormOpen}
        certification={editingCert}
        onSaveAction={handleSave}
      />
    </div>
  );
}
