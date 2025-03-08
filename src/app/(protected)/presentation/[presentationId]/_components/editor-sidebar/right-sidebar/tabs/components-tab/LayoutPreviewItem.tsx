import { LayoutSlides } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'

// Layout Preview Item Props
type LayoutPreviewItemProps = {
    name:string
    Icon:React.FC
    onClick?: () => void
    isSelected?: boolean
    type: string
    component?: LayoutSlides
}

// Layout Preview Item
const LayoutPreviewItem = ({
    name,
    Icon,
    onClick,
    isSelected,
    type,
    component,
}: LayoutPreviewItemProps) => {
    
  return (
    // Button - Layout Preview Item
    <button
    onClick={onClick}
    className={cn(
      'flex flex-col items-center cursor-grab active:cursor-grabbing gap-2 p-2 rounded-lg hover:bg-primary-10 transition-all duration-200',
      'text-center w-full',
      'hover:scale-105 transform',
      isSelected && 'ring-2 ring-blue-500'
    )}
  >

    {/* Layout Preview Item Container */}
    <div className='w-full aspect-[16/9] rounded-md border bg-gray-100 dark:bg-gray-700  p-2 shadow-sm hover:shadow-md transition-shadow duration-200'>
        {/* Layout Preview Item Icon */}
        <Icon />
    </div>

    {/* Layout Preview Item Name */}
    <span className='text-xs text-gray-500 font-medium dark:text-gray-200'>{name}</span>
  </button>
  )
}

export default LayoutPreviewItem