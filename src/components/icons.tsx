import { LucideProps } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load icons to reduce bundle size
export const Icons = {
  spinner: dynamic(() => import('lucide-react').then(mod => mod.Loader2), { ssr: false }),
  plus: dynamic(() => import('lucide-react').then(mod => mod.Plus), { ssr: false }),
  edit: dynamic(() => import('lucide-react').then(mod => mod.Pencil), { ssr: false }),
  trash: dynamic(() => import('lucide-react').then(mod => mod.Trash2), { ssr: false }),
  close: dynamic(() => import('lucide-react').then(mod => mod.X), { ssr: false }),
  check: dynamic(() => import('lucide-react').then(mod => mod.Check), { ssr: false }),
  chevronDown: dynamic(() => import('lucide-react').then(mod => mod.ChevronDown), { ssr: false }),
  chevronRight: dynamic(() => import('lucide-react').then(mod => mod.ChevronRight), { ssr: false }),
  folder: dynamic(() => import('lucide-react').then(mod => mod.Folder), { ssr: false }),
  tag: dynamic(() => import('lucide-react').then(mod => mod.Tag), { ssr: false }),
  star: dynamic(() => import('lucide-react').then(mod => mod.Star), { ssr: false }),
  search: dynamic(() => import('lucide-react').then(mod => mod.Search), { ssr: false }),
  settings: dynamic(() => import('lucide-react').then(mod => mod.Settings), { ssr: false }),
  moreVertical: dynamic(() => import('lucide-react').then(mod => mod.MoreVertical), { ssr: false }),
  arrowUpDown: dynamic(() => import('lucide-react').then(mod => mod.ArrowUpDown), { ssr: false }),
  filter: dynamic(() => import('lucide-react').then(mod => mod.Filter), { ssr: false }),
  download: dynamic(() => import('lucide-react').then(mod => mod.Download), { ssr: false }),
  upload: dynamic(() => import('lucide-react').then(mod => mod.Upload), { ssr: false }),
  externalLink: dynamic(() => import('lucide-react').then(mod => mod.ExternalLink), { ssr: false }),
  copy: dynamic(() => import('lucide-react').then(mod => mod.Copy), { ssr: false }),
  checkCircle: dynamic(() => import('lucide-react').then(mod => mod.CheckCircle), { ssr: false }),
  xCircle: dynamic(() => import('lucide-react').then(mod => mod.XCircle), { ssr: false }),
  info: dynamic(() => import('lucide-react').then(mod => mod.Info), { ssr: false }),
  alertTriangle: dynamic(() => import('lucide-react').then(mod => mod.AlertTriangle), { ssr: false }),
  helpCircle: dynamic(() => import('lucide-react').then(mod => mod.HelpCircle), { ssr: false }),
  menu: dynamic(() => import('lucide-react').then(mod => mod.Menu), { ssr: false }),
  user: dynamic(() => import('lucide-react').then(mod => mod.User), { ssr: false }),
  users: dynamic(() => import('lucide-react').then(mod => mod.Users), { ssr: false }),
  home: dynamic(() => import('lucide-react').then(mod => mod.Home), { ssr: false }),
  grid: dynamic(() => import('lucide-react').then(mod => mod.LayoutGrid), { ssr: false }),
  list: dynamic(() => import('lucide-react').then(mod => mod.List), { ssr: false }),
  file: dynamic(() => import('lucide-react').then(mod => mod.File), { ssr: false }),
  fileText: dynamic(() => import('lucide-react').then(mod => mod.FileText), { ssr: false }),
  filePlus: dynamic(() => import('lucide-react').then(mod => mod.FilePlus), { ssr: false }),
  folderPlus: dynamic(() => import('lucide-react').then(mod => mod.FolderPlus), { ssr: false }),
  image: dynamic(() => import('lucide-react').then(mod => mod.Image), { ssr: false }),
  link: dynamic(() => import('lucide-react').then(mod => mod.Link), { ssr: false }),
  link2: dynamic(() => import('lucide-react').then(mod => mod.Link2), { ssr: false }),
  paperclip: dynamic(() => import('lucide-react').then(mod => mod.Paperclip), { ssr: false }),
  save: dynamic(() => import('lucide-react').then(mod => mod.Save), { ssr: false }),
  share2: dynamic(() => import('lucide-react').then(mod => mod.Share2), { ssr: false }),
  trash2: dynamic(() => import('lucide-react').then(mod => mod.Trash2), { ssr: false }),
  uploadCloud: dynamic(() => import('lucide-react').then(mod => mod.UploadCloud), { ssr: false }),
  x: dynamic(() => import('lucide-react').then(mod => mod.X), { ssr: false }),
  zap: dynamic(() => import('lucide-react').then(mod => mod.Zap), { ssr: false }),
  zapOff: dynamic(() => import('lucide-react').then(mod => mod.ZapOff), { ssr: false }),
  clock: dynamic(() => import('lucide-react').then(mod => mod.Clock), { ssr: false }),
  calendar: dynamic(() => import('lucide-react').then(mod => mod.Calendar), { ssr: false }),
  calendarDays: dynamic(() => import('lucide-react').then(mod => mod.CalendarDays), { ssr: false }),
  calendarCheck: dynamic(() => import('lucide-react').then(mod => mod.CalendarCheck), { ssr: false }),
  calendarX: dynamic(() => import('lucide-react').then(mod => mod.CalendarX), { ssr: false }),
  calendarPlus: dynamic(() => import('lucide-react').then(mod => mod.CalendarPlus), { ssr: false }),
  calendarMinus: dynamic(() => import('lucide-react').then(mod => mod.CalendarMinus), { ssr: false }),
  calendarRange: dynamic(() => import('lucide-react').then(mod => mod.CalendarRange), { ssr: false }),
  calendarClock: dynamic(() => import('lucide-react').then(mod => mod.CalendarClock), { ssr: false }),
  calendarSearch: dynamic(() => import('lucide-react').then(mod => mod.CalendarSearch), { ssr: false }),
  calendarHeart: dynamic(() => import('lucide-react').then(mod => mod.CalendarHeart), { ssr: false }),
};

export type IconName = keyof typeof Icons;

export interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = Icons[name];
  return <IconComponent {...props} />;
}
