'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Input } from './input';

const COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#14b8a6', // teal-500
  '#6366f1', // indigo-500
  '#f97316', // orange-500
  '#06b6d4', // cyan-500
  '#a855f7', // purple-500
  '#000000', // black
];

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color);

  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="sm" className={cn('h-9 w-9 p-0', className)}>
          <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: selectedColor }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-2">
        <div className="grid grid-cols-6 gap-2">
          {COLORS.map(c => (
            <button
              key={c}
              type="button"
              className={cn('h-6 w-6 rounded-full border-2 transition-transform hover:scale-110', {
                'ring-2 ring-offset-2 ring-primary': selectedColor === c,
              })}
              style={{ backgroundColor: c }}
              onClick={() => {
                setSelectedColor(c);
                onChange(c);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <Input
            type="color"
            value={selectedColor}
            onChange={e => {
              const newColor = e.target.value;
              setSelectedColor(newColor);
              onChange(newColor);
            }}
            className="h-9 w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
