'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ContactMessage } from '@/types/types';
import { format } from 'date-fns';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';


export default function ContactMessagePage() {
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch message data
  useEffect(() => {
    async function fetchMessage() {
      try {
        const res = await fetch(`/api/contact/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch message');
        const { data } = await res.json();
        setMessage(data as ContactMessage);
      } catch (error) {
        console.error('Error fetching message:', error);
        toast.error('Failed to load message');
      } finally {
        setIsLoading(false);
      }
    }
    fetchMessage();
  }, [params.id]);

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    spam: 'bg-gray-100 text-gray-800',
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/contact/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reply: {
            content: replyContent,
            subject: `Re: ${message?.subject}`,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to send reply');

      // Refresh the message to show the new reply
      const updatedMessage = await response.json();
      setMessage(updatedMessage.data as ContactMessage);
      setReplyContent('');
      toast.success('Reply sent successfully');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      const updatedMessage = await response.json();
      setMessage(updatedMessage.data as ContactMessage);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!message) {
    return <div>Message not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/contact"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Messages
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{message.subject}</CardTitle>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium">{message.name}</span>
                    <span className="mx-2">•</span>
                    <span>{message.email}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn('h-8 gap-1.5 text-xs', statusColors[message.status as keyof typeof statusColors])}
                      >
                        {message.status}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {Object.entries(statusColors).map(([statusKey, colorClass]) => (
                        <DropdownMenuItem
                          key={statusKey}
                          className={cn('flex items-center gap-2', message.status === statusKey && 'font-semibold')}
                          onClick={() => handleStatusChange(statusKey)}
                        >
                          <span
                            className={cn(
                              'h-2 w-2 rounded-full',
                              statusKey === 'new'
                                ? 'bg-blue-500'
                                : statusKey === 'in-progress'
                                  ? 'bg-yellow-500'
                                  : statusKey === 'resolved'
                                    ? 'bg-green-500'
                                    : 'bg-gray-500'
                            )}
                          />
                          <span className="capitalize">{statusKey}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {format(new Date(message.createdAt), 'MMMM d, yyyy h:mm a')}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{message.message}</p>
            </div>

            {message.metadata && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium mb-3">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(message.metadata).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-medium text-muted-foreground w-32 flex-shrink-0">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                      </span>
                      <span className="break-words flex-1">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reply to Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReply} className="space-y-4">
              <Textarea
                placeholder="Type your reply here..."
                rows={5}
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Reply
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {message?.replies?.length && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Replies</h2>
            {message?.replies?.map(reply => (
              <Card key={reply.id} className="ml-8">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Your Reply</div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(reply.createdAt), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-sm">{reply.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
