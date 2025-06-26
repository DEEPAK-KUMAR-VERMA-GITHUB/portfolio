'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPending?: boolean;
  children: React.ReactNode;
}

export function ActionButton({ isPending, children, className, ...props }: ActionButtonProps) {
  return (
    <Button disabled={isPending || props.disabled} className={cn('gap-2', className)} {...props}>
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}
