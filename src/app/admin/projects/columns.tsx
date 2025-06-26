import { ColumnDef } from '@tanstack/react-table';
import { Project } from '@/types/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}): ColumnDef<Project, React.ReactNode>[] => [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.original.title,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ row }) => (row.original.featured ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onEdit(row.original)}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(row.original.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
