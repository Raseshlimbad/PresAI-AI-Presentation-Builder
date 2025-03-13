import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle, HelpCircle, Info, StickyNote } from 'lucide-react';
import React from 'react';

// Types for CalloutBox
interface CalloutBoxProps {
  type: 'success' | 'warning' | 'info' | 'question' | 'caution' | 'note';
  children: React.ReactNode;
  className?: string;
}

// Icons Mapping
const icons = {
  note: StickyNote,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  question: HelpCircle,
  caution: AlertCircle,
};

// Colors for CalloutBox
const colors = {
  note: { bg: 'bg-teal-100', border: 'border-teal-500', text: 'text-teal-700' },
  success: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700' },
  warning: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-700' },
  info: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700' },
  question: { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-700' },
  caution: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700' },
};

// Readonly CalloutBox Component
const CalloutBox: React.FC<CalloutBoxProps> = ({ type, children, className }) => {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        'rounded-lg border-l-4 p-4 flex items-start gap-3 dark:text-white',
        colors[type].bg,
        colors[type].border,
        colors[type].text,
        className
      )}
    >
      <Icon className="w-5 h-5 mt-0.5" />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default CalloutBox;
