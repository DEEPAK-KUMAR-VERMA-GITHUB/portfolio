'use client';

import { Resume } from '@/types/types';
import { Button } from '@/components/ui/button';
import { FileText, Download, Trash2, Star, CheckCircle2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface ResumeItemProps {
  resume: Resume;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
  isProcessing?: boolean;
}

export default function ResumeItem({ resume, onSetDefault, onDelete, isProcessing = false }: ResumeItemProps) {
  const formattedDate = formatDistanceToNow(new Date(resume.lastUpdated), { addSuffix: true });

  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-md bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">{resume.title}</h3>
              {resume.version && (
                <Badge variant="outline" className="text-xs">
                  v{resume.version}
                </Badge>
              )}
              {resume.isDefault && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Default
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {resume.fileType.toUpperCase()} • {resume.fileSize}
            </p>
            <p className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Updated {formattedDate}
            </p>
            {resume.description && <p className="text-sm text-muted-foreground mt-1">{resume.description}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild className="h-8">
            <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer" download>
              <Download className="h-4 w-4 md:mr-2" />
              <span className="hidden md:block">Download</span>
            </a>
          </Button>

          {!resume.isDefault && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => onSetDefault(resume.id!)}
                disabled={isProcessing}
              >
                <Star className="h-4 w-4 md:mr-2" />
                <span className="hidden md:block">Set Default</span>
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(resume.id!)}
            disabled={isProcessing}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
