import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Certification } from './page';
import Image from 'next/image';

export const columns = (
  onEdit: (cert: Certification) => void,
  onDelete: (id: string) => void
): ColumnDef<Certification>[] => [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const cert = row.original;
    return <Image src={cert.image} alt={cert.title} className="w-16 h-16 object-cover" width={64} height={64} />;
    },
  },

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
    cell: ({ row }) => {
      const cert = row.original;
      return (
        <div className="font-medium">
          <div className="flex items-center gap-2">
            {cert.icon && <span className="text-lg">{cert.icon}</span>}
            <span>{cert.title}</span>
            {cert.verified && (
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'issuer',
    header: 'Issuer',
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue('issuer')}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return <div className="text-sm text-muted-foreground">{format(date, 'MMM d, yyyy')}</div>;
    },
  },
  {
    accessorKey: 'verifyUrl',
    header: 'Verification',
    cell: ({ row }) => {
      const url = row.getValue('verifyUrl') as string;
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm"
          onClick={e => e.stopPropagation()}
        >
          Verify
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      ) : (
        <span className="text-muted-foreground text-sm">N/A</span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const cert = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={e => {
              e.stopPropagation();
              onEdit(cert);
            }}
            className="h-8 w-8 p-0 hover:bg-muted"
            title="Edit certification"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={e => {
              e.stopPropagation();
              onDelete(cert.id);
            }}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            title="Delete certification"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
