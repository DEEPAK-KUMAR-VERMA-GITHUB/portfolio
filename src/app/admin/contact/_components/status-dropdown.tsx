// src/app/admin/contact/_components/status-dropdown.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';

const statuses = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'spam', label: 'Spam' },
];

export function StatusDropdown({ messageId, currentStatus }: { messageId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const currentStatusLabel = statuses.find(s => s.value === status)?.label || status;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : currentStatusLabel}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {statuses.map(statusItem => (
          <DropdownMenuItem
            key={statusItem.value}
            onClick={() => handleStatusChange(statusItem.value)}
            className="flex items-center justify-between"
          >
            {statusItem.label}
            {status === statusItem.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
