'use client';

import { useState } from 'react';
import { Pencil, Trash2, ChevronDown, ChevronRight, Folder, Tag as TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Category, Technology, Label } from '@/types/types';
import { cn } from '@/lib/utils';

interface CategoryItemProps {
  item: Category | Technology | Label;
  type: 'category' | 'technology' | 'label';
  onEdit: (item: Category | Technology | Label) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  children?: React.ReactNode;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  showActions?: boolean;
}

export function CategoryItem({
  item,
  type,
  onEdit,
  onDelete,
  isDeleting = false,
  children,
  isExpanded = false,
  onToggleExpand,
  showActions = true,
}: CategoryItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = !!children && (type === 'category' || type === 'technology');
  
  const getIcon = () => {
    if (type === 'category') {
      return <Folder className="h-4 w-4 text-yellow-500" />;
    } else if (type === 'label') {
      return <TagIcon className="h-4 w-4 text-blue-500" />;
    } else {
      return (
        <div 
          className="h-4 w-4 flex items-center justify-center"
          dangerouslySetInnerHTML={{ 
            __html: 'icon' in item && item.icon 
              ? `<i class="${item.icon} text-${'color' in item ? item.color : 'primary'}"></i>` 
              : '<div class="h-3 w-3 rounded-full bg-gray-300"></div>' 
          }} 
        />
      );
    }
  };

  const getBadge = () => {
    if (type === 'category') {
      return (
        <Badge variant="outline" className="ml-2 text-xs">
          {'technologies' in item && Array.isArray((item as any).technologies)
            ? `${(item as any).technologies.length} tech`
            : '0 tech'}
        </Badge>
      );
    } else if (type === 'label') {
      const labelColor = 'color' in item ? item.color : '#3b82f6';
      return (
        <div 
          className="ml-2 h-3 w-3 rounded-full border" 
          style={{ 
            backgroundColor: labelColor,
            borderColor: labelColor,
          }}
        />
      );
    } else if (type === 'technology') {
      const isFeatured = 'featured' in item && item.featured;
      return (
        <Badge 
          variant={isFeatured ? 'default' : 'outline'}
          className="ml-2 text-xs"
        >
          {isFeatured ? 'Featured' : 'Standard'}
        </Badge>
      );
    }
    return null;
  };

  const description = 'description' in item ? item.description : '';

  return (
    <div className="w-full">
      <div 
        className={cn(
          'flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors',
          isHovered && 'bg-muted/30'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center flex-1 min-w-0">
          {hasChildren && onToggleExpand && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 mr-1"
              onClick={onToggleExpand}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex-shrink-0 mr-3">
              {getIcon()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center">
                <h3 className="font-medium truncate">
                  {item.name}
                </h3>
                {getBadge()}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {item.slug}
                {description && (
                  <span className="ml-2 text-muted-foreground/70">
                    • {description.length > 50 ? description.substring(0, 50) + '...' : description}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center space-x-1 ml-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(item)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(item.id!)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="pl-8 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}
