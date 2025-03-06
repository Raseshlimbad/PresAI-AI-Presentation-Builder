import { cn } from '@/lib/utils'
import { Icon } from '@radix-ui/react-select'
import { AlertCircle, AlertTriangle, CheckCircle, HelpCircle, Info } from 'lucide-react'
import React from 'react'

// Types for the callout box
interface CalloutBoxProps {
    type: 'success' | 'warning' | 'info' | 'question' | 'caution'
    children: React.ReactNode
    className?: string
}

// Icons for the callout box
const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    info: Info,
    question: HelpCircle,
    caution: AlertCircle
}

// Callout box component
const CalloutBox = ({ type, children, className }: CalloutBoxProps) => {
    const icon = icons[type];

    // Colors for the callout box
    const colors = {
        success: {
          bg: 'bg-green-100',
          border: 'border-green-500',
          text: 'text-green-700',
        },
        warning: {
          bg: 'bg-yellow-100',
          border: 'border-yellow-500',
          text: 'text-yellow-700',
        },
        info: {
          bg: 'bg-blue-100',
          border: 'border-blue-500',
          text: 'text-blue-700',
        },
        question: {
          bg: 'bg-purple-100',
          border: 'border-purple-500',
          text: 'text-purple-700',
        },
        caution: {
          bg: 'bg-red-100',
          border: 'border-red-500',
          text: 'text-red-700',
        },
      };

  return (
    <div
    className={cn(
        'rounded-lg border-l-4 flex items-start p-4',
        colors[type].bg,
        colors[type].border,
        colors[type].text,
        className
    )}
    >
        {/* Icon */}
        <Icon className='w-5 h-5 mr-3 mt-0.5' />
        {/* Content */}
        <div>
        {children}
        </div>
    </div>
  )
}

export default CalloutBox
