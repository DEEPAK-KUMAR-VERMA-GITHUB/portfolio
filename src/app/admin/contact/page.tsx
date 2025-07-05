// src/app/admin/contact/page.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ContactMessageCard } from '@/app/admin/contact/_components/contact-message';
import { ContactMessage } from '@/types/types';
import { toast } from 'react-hot-toast';
import { Search, RefreshCw, MessageSquare, AlertCircle, CheckCircle, Inbox } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';
import { ContactStatus } from '@/types/types';

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'spam', label: 'Spam' },
];

export default function ContactPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<ContactStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useAuth();

  const fetchMessages = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error('Failed to fetch messages');
      const { data } = await res.json();
      setMessages(data);
      // setFilteredMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch messages
  useEffect(() => {
    fetchMessages();
  }, []);

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

  const handleStatusChange = async (messageId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      const updatedMessage = await response.json();
      setMessages(prev => prev.map(msg => (msg.id === updatedMessage.id ? updatedMessage : msg)));
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete message');

      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
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

  const handleReply = (message: ContactMessage) => {
    router.push(`/admin/contact/${message.id}#reply`);
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/contact', { next: { revalidate: 0 } });
      if (!res.ok) throw new Error('Failed to refresh messages');
      const data = await res.json();
      setMessages(data);
      toast.success('Messages refreshed');
    } catch (error) {
      console.error('Error refreshing messages:', error);
      toast.error('Failed to refresh messages');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">
            {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
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
      </Tabs>

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
        </div>
        <div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted/50 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filteredMessages.length > 0 ? (
        <div className="space-y-4">
          {filteredMessages.map(message => (
            <ContactMessageCard
              key={message.id}
              message={message}
              onStatusChangeAction={handleStatusChange}
              onDeleteAction={handleDelete}
              onReplyAction={handleReply}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No messages found</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'No contact messages have been received yet.'}
          </p>
          {searchQuery || statusFilter !== 'all' ? (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
            >
              Clear filters
            </Button>
          ) : (
            <Button variant="outline" className="mt-4" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
