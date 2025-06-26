import { ColumnDef } from '@tanstack/react-table';
import { TimelineItem } from '@/types/types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (timeline: TimelineItem) => void;
  onDelete: (timeline: TimelineItem) => void;
}): ColumnDef<TimelineItem>[] => [
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
      <div className="font-medium">{row.original.title}</div>
    ),
  },
  {
    accessorKey: 'organization',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Organization
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.organization,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.original.type;
      const typeMap = {
        education: { label: 'Education', variant: 'default' as const, color: 'bg-blue-100 text-blue-800' },
        experience: { label: 'Experience', variant: 'secondary' as const, color: 'bg-purple-100 text-purple-800' },
        project: { label: 'Project', variant: 'outline' as const, color: 'bg-green-100 text-green-800' },
      };
      
      const { label, color } = typeMap[type] || { label: type, color: 'bg-gray-100 text-gray-800' };
      
      return (
        <Badge className={color}>
          {label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'period',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Period
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.period,
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
