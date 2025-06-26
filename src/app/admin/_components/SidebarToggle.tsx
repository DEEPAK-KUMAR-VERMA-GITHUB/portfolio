import { Menu, X } from 'lucide-react';

export default function SidebarToggle({ onToggle, isOpen }: { onToggle: () => void; isOpen: boolean }) {
  return (
    <button
      className=" lg:hidden p-2 rounded-md text-primary hover:bg-muted absolute top-4 right-4 z-50"
      onClick={onToggle}
      aria-label="Toggle Sidebar"
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  );
}
