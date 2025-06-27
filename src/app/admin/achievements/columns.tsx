'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Achievement } from '@/types/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (achievement: Achievement) => void;
  onDelete: (achievement: Achievement) => void;
}): ColumnDef<Achievement, React.ReactNode>[] => [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium flex items-center gap-3">
        {row.original.icon && (
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
            <span className="text-lg">{row.original.icon}</span>
          </div>
        )}
        <span>{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: 'issuer',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Issuer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.issuer}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      try {
        const date = new Date(row.original.date);
        return format(date, 'MMM d, yyyy');
      } catch (e) {
        return row.original.date;
      }
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-end space-x-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onEdit(row.original)}
          className="h-8 w-8 text-muted-foreground hover:text-primary"
          title="Edit"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDelete(row.original)}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
