'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderOpen,
  User,
  Code,
  GraduationCap,
  BriefcaseBusiness,
  MessageSquare,
  Link as LinkIcon,
  LogOut,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'About', href: '/admin/about', icon: User },
  { label: 'Skills', href: '/admin/skills', icon: Code },
  { label: 'Education', href: '/admin/education', icon: GraduationCap },
  { label: 'Experience', href: '/admin/experience', icon: BriefcaseBusiness },
  { label: 'Contact', href: '/admin/contact', icon: MessageSquare },
  { label: 'Footer', href: '/admin/footer', icon: LinkIcon },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 h-screen overflow-hidden w-64 bg-card border-r transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static'
      )}
    >
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>

      <nav className="p-4 space-y-2 flex flex-col h-full">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              pathname === href ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}

        {/* logout */}
        <Link
          href="/auth/logout"
          className=" flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-red-500 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
      </nav>
    </aside>
  );
}
