import { ColumnDef } from '@tanstack/react-table';
import { Skill } from '@/types/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (project: Skill) => void;
  onDelete: (project: Skill) => void;
}): ColumnDef<Skill, React.ReactNode>[] => [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>,
  },
  {
    accessorKey: 'level',
    header: 'Level',
    cell: ({ row }) => row.original.level,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onEdit(row.original)}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(row.original)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
