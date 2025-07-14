import { Tag } from '@/types/types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useState } from 'react';

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
  allowCustomTags?: boolean;
}

export function TagSelector({ availableTags, selectedTags, onChange, allowCustomTags = false }: TagSelectorProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (tag: Tag) => {
    if (!selectedTags.some(t => t.id === tag.id)) {
      onChange([...selectedTags, tag]);
    }
  };

  const handleRemove = (tagId: string) => {
    onChange(selectedTags.filter(tag => tag.id !== tagId));
  };

  const filtered = availableTags.filter(
    tag => tag.label.toLowerCase().includes(inputValue.toLowerCase()) && !selectedTags.some(t => t.id === tag.id)
  );

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder={allowCustomTags ? 'Add new tag...' : 'Search tags...'}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
            e.preventDefault();
            const rawTags = inputValue.split(',').map(t => t.trim()).filter(Boolean);
            const newTags: Tag[] = [];
            rawTags.forEach(val => {
              // Try to find in availableTags
              const found = availableTags.find(tag => tag.label.toLowerCase() === val.toLowerCase());
              if (found && !selectedTags.some(t => t.id === found.id) && !newTags.some(t => t.id === found.id)) {
                newTags.push(found);
              } else if (
                allowCustomTags &&
                !selectedTags.some(t => t.label.toLowerCase() === val.toLowerCase()) &&
                !newTags.some(t => t.label.toLowerCase() === val.toLowerCase())
              ) {
                // Add as custom tag
                newTags.push({ id: val, label: val });
              }
            });
            if (newTags.length > 0) {
              onChange([...selectedTags, ...newTags]);
            }
            setInputValue('');
          }
        }}
      />

      {filtered.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filtered.map(tag => (
            <Badge
              key={tag.id}
              onClick={() => handleSelect(tag)}
              className="cursor-pointer hover:bg-primary hover:text-white"
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      )}

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTags.map(tag => (
            <Badge key={tag.id} className="flex items-center gap-1 bg-muted text-muted-foreground">
              {tag.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemove(tag.id)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
