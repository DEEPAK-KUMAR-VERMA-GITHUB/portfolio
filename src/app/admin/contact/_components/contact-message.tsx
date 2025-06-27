'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Mail, Clock, MessageSquare, Check, X, Loader2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ContactMessage, ContactStatus } from '@/types/types';
import { cn } from '@/lib/utils';

const statusColors: Record<ContactStatus, string> = {
  'new': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'in-progress': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  'resolved': 'bg-green-100 text-green-800 hover:bg-green-200',
  'spam': 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

const statusIcons: Record<ContactStatus, React.ReactNode> = {
  'new': <span className="h-2 w-2 rounded-full bg-blue-500" />,
  'in-progress': <span className="h-2 w-2 rounded-full bg-yellow-500" />,
  'resolved': <Check className="h-3 w-3" />,
  'spam': <X className="h-3 w-3" />,
};

interface ContactMessageProps {
  message: ContactMessage;
  onStatusChangeAction: (id: string, status: ContactStatus) => Promise<void>;
  onDeleteAction: (id: string) => Promise<void>;
  onReplyAction: (message: ContactMessage) => void;
}

export function ContactMessageCard({ 
  message, 
  onStatusChangeAction, 
  onDeleteAction, 
  onReplyAction 
}: ContactMessageProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = async (newStatus: ContactStatus) => {
    if (newStatus === message.status) return;
    
    try {
      setIsUpdating(true);
      await onStatusChangeAction(message.id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await onDeleteAction(message.id);
    }
  };

  const initials = message.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative pb-2 pr-16">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-medium">{message.name}</CardTitle>
              <div className="flex items-center text-xs text-muted-foreground">
                <a href={`mailto:${message.email}`} className="hover:underline flex items-center">
                  <Mail className="h-3 w-3 mr-1" />
                  {message.email}
                </a>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="absolute right-4 top-4 flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onReplyAction(message)}>
                  Reply
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={handleDelete}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    'h-8 gap-1.5 text-xs',
                    statusColors[message.status],
                    'hover:bg-opacity-80',
                    isUpdating && 'opacity-70'
                  )}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <>{statusIcons[message.status]} </>
                  )}
                  {message.status.replace('-', ' ')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.entries(statusColors).map(([status, className]) => {
                  const statusKey = status as ContactStatus;
                  return (
                    <DropdownMenuItem
                      key={statusKey}
                      className={cn(
                        'flex items-center gap-2',
                        message.status === statusKey && 'font-medium',
                        'hover:cursor-pointer'
                      )}
                      onClick={() => handleStatusChange(statusKey)}
                    >
                      <span className={cn('h-2 w-2 rounded-full', 
                        statusKey === 'new' ? 'bg-blue-500' :
                        statusKey === 'in-progress' ? 'bg-yellow-500' :
                        statusKey === 'resolved' ? 'bg-green-500' : 'bg-gray-500'
                      )} />
                      <span className="capitalize">{statusKey.replace('-', ' ')}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="mb-3">
          <h3 className="font-medium">{message.subject}</h3>
          {message.labels && message.labels.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {message.labels.map((label: string) => (
                <Badge key={label} variant="outline" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative">
          <div 
            className={cn(
              'prose prose-sm max-w-none text-muted-foreground',
              !isExpanded && 'line-clamp-3'
            )}
            dangerouslySetInnerHTML={{ 
              __html: message.message.replace(/\n/g, '<br />')
            }} 
          />
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 text-sm font-medium text-primary hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>
        
        {message.metadata && (
          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
            <div className="grid grid-cols-2 gap-2">
              {message.metadata.ip && (
                <div>
                  <span className="font-medium">IP:</span> {message.metadata.ip}
                </div>
              )}
              {message.metadata.userAgent && (
                <div>
                  <span className="font-medium">Browser:</span> {message.metadata.userAgent}
                </div>
              )}
              {message.metadata.referrer && (
                <div className="col-span-2">
                  <span className="font-medium">Referrer:</span> {message.metadata.referrer}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t px-4 py-2 bg-muted/20">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            <span>Received {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>
              {message.updatedAt !== message.createdAt 
                ? `Updated ${formatDistanceToNow(new Date(message.updatedAt), { addSuffix: true })}`
                : 'Not updated'}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
