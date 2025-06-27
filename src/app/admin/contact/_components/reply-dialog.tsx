'use client';

import { useState } from 'react';
import { Send, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ContactMessage } from '@/types/types';

interface ReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: ContactMessage;
  onSend: (messageId: string, reply: { subject: string; content: string }) => Promise<void>;
}

export function ReplyDialog({ 
  open, 
  onOpenChange, 
  message, 
  onSend 
}: ReplyDialogProps) {
  const [subject, setSubject] = useState(`Re: ${message.subject}`);
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Message content is required');
      return;
    }

    try {
      setIsSending(true);
      setError('');
      await onSend(message.id, { subject, content });
      setContent('');
    } catch (err) {
      setError('Failed to send reply. Please try again.');
      console.error('Error sending reply:', err);
    } finally {
      setIsSending(false);
    }
  };

  if(!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Reply to {message.name}</DialogTitle>
          <DialogDescription>
            Replying to: <span className="font-medium">{message.email}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="message">Your reply</Label>
              <span className="text-xs text-muted-foreground">
                Markdown is supported
              </span>
            </div>
            <Textarea
              id="message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
              className="font-mono text-sm"
            />
          </div>
          
          <div className="rounded-md border bg-muted/50 p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Original message</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {message.message}
                </p>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSending || !content.trim()}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send reply
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
