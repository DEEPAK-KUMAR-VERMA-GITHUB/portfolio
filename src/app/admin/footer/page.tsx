'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save, Undo2 } from 'lucide-react';

type FooterData = {
  copyright: string;
  privacyPolicyLink: string;
  termsOfServiceLink: string;
  showDecoration: boolean;
};

export default function FooterAdmin() {
  const [footerData, setFooterData] = useState<FooterData>({
    copyright: `© ${new Date().getFullYear()} Deepak Kumar Verma. All rights reserved.`,
    privacyPolicyLink: '#',
    termsOfServiceLink: '#',
    showDecoration: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved footer data
  useEffect(() => {
    // In a real app, you would fetch this from your API
    const loadFooterData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        // TODO: Replace with actual API call
        // const response = await fetch('/api/footer');
        // const data = await response.json();
        // setFooterData(data);
      } catch (error) {
        console.error('Error loading footer data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFooterData();
  }, []);

  const handleInputChange = (field: keyof FooterData, value: string | boolean) => {
    setFooterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // In a real app, you would save this to your API
      console.log('Saving footer data:', footerData);
      // TODO: Replace with actual API call
      // await fetch('/api/footer', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(footerData),
      // });
      
      // Show success message
      // toast.success('Footer updated successfully');
    } catch (error) {
      console.error('Error saving footer data:', error);
      // toast.error('Failed to update footer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFooterData({
      copyright: `© ${new Date().getFullYear()} Deepak Kumar Verma. All rights reserved.`,
      privacyPolicyLink: '#',
      termsOfServiceLink: '#',
      showDecoration: true,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Footer Settings</h1>
          <p className="text-muted-foreground">
            Customize the footer content and appearance
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Footer Content</CardTitle>
              <CardDescription>
                Update the text and links that appear in the footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="copyright">Copyright Text</Label>
                <Input
                  id="copyright"
                  value={footerData.copyright}
                  onChange={(e) => handleInputChange('copyright', e.target.value)}
                  placeholder="Enter copyright text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="privacyPolicyLink">Privacy Policy Link</Label>
                <Input
                  id="privacyPolicyLink"
                  value={footerData.privacyPolicyLink}
                  onChange={(e) => handleInputChange('privacyPolicyLink', e.target.value)}
                  placeholder="Enter privacy policy URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="termsOfServiceLink">Terms of Service Link</Label>
                <Input
                  id="termsOfServiceLink"
                  value={footerData.termsOfServiceLink}
                  onChange={(e) => handleInputChange('termsOfServiceLink', e.target.value)}
                  placeholder="Enter terms of service URL"
                />
              </div>
            </CardContent>
          </Card>


          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSaving}
            >
              <Undo2 className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
