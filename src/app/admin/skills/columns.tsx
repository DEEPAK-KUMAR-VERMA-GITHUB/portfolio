import { ColumnDef } from '@tanstack/react-table';
import { Skill } from '@/types/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
}): ColumnDef<Skill, React.ReactNode>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Skill Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.original.category;
      const categoryMap = {
        frontend: { label: 'Frontend', color: 'bg-blue-100 text-blue-800' },
        backend: { label: 'Backend', color: 'bg-purple-100 text-purple-800' },
        tools: { label: 'Tools', color: 'bg-green-100 text-green-800' },
        database: { label: 'Database', color: 'bg-orange-100 text-orange-800' },
        language: {label:"Language", color:'bg-yellow-100 text-yellow-800'},
        others: { label: 'Others', color: 'bg-gray-100 text-gray-800' },
      };

      const { label, color } = categoryMap[category as keyof typeof categoryMap] || {
        label: category,
        color: 'bg-gray-100 text-gray-800',
      };

      return <Badge className={`${color} hover:${color} capitalize`}>{label}</Badge>;
    },
  },
  {
    accessorKey: 'level',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="px-0 hover:bg-transparent"
          >
            Proficiency
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-3">
          <div
            className={`h-2.5 rounded-full ${
              row.original.level >= 80 ? 'bg-green-500' : row.original.level >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${row.original.level}%` }}
          />
        </div>
        <span className="w-10 text-sm text-muted-foreground">{row.original.level}%</span>
      </div>
    ),
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
