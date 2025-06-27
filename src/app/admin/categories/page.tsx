'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CategoryItem } from './_components/category-item';
import { CategoryForm } from './_components/category-form';
import { DeleteConfirmationDialog } from '../_components/delete-confirmation-dialog';
import { Category, Technology, Label } from '@/types/types';

// Mock data - replace with API calls
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Frontend',
    slug: 'frontend',
    description: 'Frontend technologies',
    icon: 'laptop',
    color: '#3b82f6',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Backend',
    slug: 'backend',
    description: 'Backend technologies',
    icon: 'server',
    color: '#10b981',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockTechnologies: Technology[] = [
  {
    id: 't1',
    name: 'React',
    slug: 'react',
    categoryId: '1',
    icon: 'react',
    website: 'https://reactjs.org',
    description: 'A JavaScript library for building user interfaces',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 't2',
    name: 'Next.js',
    slug: 'nextjs',
    categoryId: '1',
    icon: 'nextdotjs',
    website: 'https://nextjs.org',
    description: 'The React Framework for Production',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockLabels: Label[] = [
  {
    id: 'l1',
    name: 'Featured',
    slug: 'featured',
    description: 'Featured items',
    color: '#3b82f6',
    textColor: '#ffffff',
    icon: 'star',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'l2',
    name: 'New',
    slug: 'new',
    description: 'Newly added items',
    color: '#10b981',
    textColor: '#ffffff',
    icon: 'new-release',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState('categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Category | Technology | Label | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  // State for categories, technologies, and labels
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [technologies, setTechnologies] = useState<Technology[]>(mockTechnologies);
  const [labels, setLabels] = useState<Label[]>(mockLabels);

  // Filter items based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredTechnologies = technologies.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tech.description && tech.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredLabels = labels.filter(label =>
    label.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    label.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (label.description && label.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Toggle category expansion
  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newItem = {
        ...values,
        id: editingItem ? editingItem.id : `new-${Date.now()}`,
        createdAt: editingItem ? (editingItem as any).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (activeTab === 'categories') {
        if (editingItem) {
          setCategories(categories.map(cat => 
            cat.id === editingItem.id ? { ...cat, ...newItem } : cat
          ));
        } else {
          setCategories([newItem as Category, ...categories]);
        }
      } else if (activeTab === 'technologies') {
        if (editingItem) {
          setTechnologies(technologies.map(tech => 
            tech.id === editingItem.id ? { ...tech, ...newItem } : tech
          ));
        } else {
          setTechnologies([newItem as Technology, ...technologies]);
        }
      } else if (activeTab === 'labels') {
        if (editingItem) {
          setLabels(labels.map(label => 
            label.id === editingItem.id ? { ...label, ...newItem } : label
          ));
        } else {
          setLabels([newItem as Label, ...labels]);
        }
      }

      setIsFormOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (activeTab === 'categories') {
        setCategories(categories.filter(cat => cat.id !== itemToDelete));
        // Also remove any technologies in this category
        setTechnologies(techs => techs.filter(tech => tech.categoryId !== itemToDelete));
      } else if (activeTab === 'technologies') {
        setTechnologies(technologies.filter(tech => tech.id !== itemToDelete));
      } else if (activeTab === 'labels') {
        setLabels(labels.filter(label => label.id !== itemToDelete));
      }
      
      setItemToDelete(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Open form for editing
  const handleEdit = (item: Category | Technology | Label) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  // Open delete confirmation
  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
  };

  // Get category name by ID
  const getCategoryName = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : 'Unknown Category';
  };

  // Get technologies by category ID
  const getTechnologiesByCategory = (categoryId: string) => {
    return technologies.filter(tech => tech.categoryId === categoryId);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Categories & Tags</h1>
        <p className="text-muted-foreground">
          Manage your categories, technologies, and labels
        </p>
      </div>

      <Tabs 
        defaultValue="categories" 
        className="space-y-6"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="technologies">Technologies</TabsTrigger>
            <TabsTrigger value="labels">Labels</TabsTrigger>
          </TabsList>
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <Input
              placeholder={`Search ${activeTab}...`}
              className="w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              onClick={() => {
                setEditingItem(null);
                setIsFormOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {activeTab === 'categories' ? 'Category' : activeTab === 'technologies' ? 'Technology' : 'Label'}
            </Button>
          </div>
        </div>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {filteredCategories.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchTerm ? 'No categories match your search.' : 'No categories found.'}
                  </p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => {
                      setSearchTerm('');
                      setEditingItem(null);
                      setIsFormOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add your first category
                  </Button>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredCategories.map((category) => {
                    const categoryTechnologies = getTechnologiesByCategory(category.id);
                    const isExpanded = expandedCategories[category.id] ?? false;
                    
                    return (
                      <div key={category.id}>
                        <CategoryItem
                          item={category}
                          type="category"
                          onEdit={handleEdit}
                          onDelete={handleDeleteClick}
                          isExpanded={isExpanded}
                          onToggleExpand={() => toggleCategoryExpand(category.id)}
                        >
                          {isExpanded && categoryTechnologies.length > 0 && (
                            <div className="space-y-1">
                              {categoryTechnologies.map(tech => (
                                <CategoryItem
                                  key={tech.id}
                                  item={tech}
                                  type="technology"
                                  onEdit={handleEdit}
                                  onDelete={handleDeleteClick}
                                  showActions={false}
                                />
                              ))}
                            </div>
                          )}
                        </CategoryItem>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technologies" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {filteredTechnologies.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchTerm ? 'No technologies match your search.' : 'No technologies found.'}
                  </p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => {
                      setSearchTerm('');
                      setEditingItem(null);
                      setIsFormOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add your first technology
                  </Button>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredTechnologies.map((tech) => (
                    <CategoryItem
                      key={tech.id}
                      item={tech}
                      type="technology"
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labels" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {filteredLabels.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchTerm ? 'No labels match your search.' : 'No labels found.'}
                  </p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => {
                      setSearchTerm('');
                      setEditingItem(null);
                      setIsFormOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add your first label
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {filteredLabels.map((label) => (
                    <CategoryItem
                      key={label.id}
                      item={label}
                      type="label"
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Form Dialog */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {editingItem ? 'Edit' : 'Add New'} 
                {activeTab === 'categories' ? 'Category' : 
                 activeTab === 'technologies' ? 'Technology' : 'Label'}
              </h2>
              
              <CategoryForm
                type={activeTab as 'category' | 'technology' | 'label'}
                initialData={editingItem}
                categories={categories}
                onSuccess={() => {
                  setIsFormOpen(false);
                  setEditingItem(null);
                }}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingItem(null);
                }}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title={`Delete ${activeTab.slice(0, -1)}`}
        description={`Are you sure you want to delete this ${activeTab.slice(0, -1)}? This action cannot be undone.`}
      />
    </div>
  );
}