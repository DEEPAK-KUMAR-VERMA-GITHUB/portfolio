'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContactMessage, ContactStatus } from '@/types/types';
import { AlertCircle, CheckCircle, Filter, Inbox, Mail, RefreshCw, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContactMessageCard } from './_components/contact-message';
import { ReplyDialog } from './_components/reply-dialog';
import { getAllMessages } from './actions';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/auth-context';
import { sendEmail } from '@/lib/email';

// Mock data - replace with real API calls
// const mockMessages: ContactMessage[] = [
//   {
//     id: '1',
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     subject: 'Collaboration Opportunity',
//     message:
//       "Hello,\n\nI came across your portfolio and was impressed by your work. I'd like to discuss a potential collaboration on an upcoming project.\n\nBest regards,\nJohn",
//     status: 'new',
//     labels: ['collaboration', 'opportunity'],
//     metadata: {
//       ip: '192.168.1.1',
//       userAgent:
//         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
//       referrer: 'https://www.google.com/',
//     },
//     createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
//     updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
//   },
//   {
//     id: '2',
//     name: 'Acme Inc.',
//     email: 'hr@acme.com',
//     subject: 'Job Opportunity - Senior Frontend Developer',
//     message:
//       'Dear Candidate,\n\nWe were impressed by your portfolio and would like to invite you to interview for our Senior Frontend Developer position.\n\nBest regards,\nHR Team',
//     status: 'in-progress',
//     labels: ['job', 'opportunity'],
//     createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
//     updatedAt: new Date(Date.now() - 86400000).toISOString(),
//   },
//   {
//     id: '3',
//     name: 'Spam Bot',
//     email: 'spam@example.com',
//     subject: 'Make $1000 a day working from home!',
//     message: "You've won a prize! Click here to claim your $1000!",
//     status: 'spam',
//     createdAt: new Date(Date.now() - 172800000).toISOString(),
//     updatedAt: new Date(Date.now() - 172800000).toISOString(),
//   },
// ];

export default function ContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'all'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ContactStatus | 'all'>('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { isAuthenticated } = useAuth();

  // Simulate loading messages
  const loadMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getAllMessages();
      if (result.success) {
        setMessages(result.data);
      } else {
        toast.error(result.error as never);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    loadMessages();
  }, [isAuthenticated]);

  // Filter messages based on search query and status
  const filteredMessages = useMemo(() => {
    return messages.filter(message => {
      const matchesSearch =
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
      const matchesTab = activeTab === 'all' || message.status === activeTab;

      return matchesSearch && matchesStatus && matchesTab;
    });
  }, [messages, searchQuery, statusFilter, activeTab]);

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: ContactStatus) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, status: newStatus, updatedAt: new Date().toISOString() } : msg))
    );
  };

  // Handle delete message
  const handleDeleteMessage = async (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  // Handle reply to message
  const handleReply = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsReplyDialogOpen(true);
  };

  // Handle send reply
  const handleSendReply = async (messageId: string, reply: { subject: string; content: string }) => {
    // In a real app, you would send this to your API
    console.log('Sending reply to message:', messageId, reply);

    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reply: {
            subject: reply.subject,
            content: reply.content,
          },
          status: 'in_progress',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send reply');
      }
      const updatedMessage = await response.json();
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId
            ? {
                ...msg,
                status: 'in_progress',
                replies: [
                  ...(msg.replies || []),
                  ...(updatedMessage.replies || []).filter(
                    (newReply: any) => !msg.replies?.some(r => r.id === newReply.id)
                  ),
                ],
              }
            : msg
        )
      );

      // Close the reply dialog
      setIsReplyDialogOpen(false);

      // Show success message
      toast.success('Reply sent successfully');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply. Please try again.');
    }
  };

  // Get counts for each status
  const statusCounts = useMemo(() => {
    return messages.reduce(
      (acc, msg) => {
        acc[msg.status] = (acc[msg.status] || 0) + 1;
        acc.all++;
        return acc;
      },
      { all: 0, new: 0, in_progress: 0, resolved: 0, spam: 0 } as Record<ContactStatus | 'all', number>
    );
  }, [messages]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Messages</h1>
          <p className="text-muted-foreground">Manage and respond to messages from your contact form</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={loadMessages} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={value => setActiveTab(value as ContactStatus | 'all')}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Inbox className="h-4 w-4" />
              <span>All</span>
              {statusCounts.all > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {statusCounts.all}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span>New</span>
              {statusCounts.new > 0 && (
                <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                  {statusCounts.new}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>In Progress</span>
              {statusCounts['in_progress'] > 0 && (
                <span className="ml-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                  {statusCounts['in_progress']}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Resolved</span>
              {statusCounts.resolved > 0 && (
                <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                  {statusCounts.resolved}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="spam" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-gray-500" />
              <span>Spam</span>
              {statusCounts.spam > 0 && (
                <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                  {statusCounts.spam}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-[200px]">
              <Select value={statusFilter} onValueChange={value => setStatusFilter(value as ContactStatus | 'all')}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-5/6 mt-2" />
                    <Skeleton className="h-4 w-4/6 mt-2" />
                  </CardContent>
                </Card>
              ))
            ) : filteredMessages.length > 0 ? (
              // Messages list
              filteredMessages.map(message => (
                <ContactMessageCard
                  key={message.id}
                  message={message}
                  onStatusChangeAction={handleStatusChange}
                  onDeleteAction={handleDeleteMessage}
                  onReplyAction={handleReply}
                />
              ))
            ) : (
              // Empty state
              <Card>
                <CardContent className="py-12 text-center">
                  <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No messages found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchQuery || statusFilter !== 'all'
                      ? 'Try adjusting your search or filter criteria'
                      : 'No messages have been received yet'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Tabs>

      {/* Reply Dialog */}
      {selectedMessage && (
        <ReplyDialog
          open={isReplyDialogOpen}
          onOpenChange={setIsReplyDialogOpen}
          message={selectedMessage}
          onSend={handleSendReply}
        />
      )}
    </div>
  );
}
