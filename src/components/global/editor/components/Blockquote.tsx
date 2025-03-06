import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'


// Blockquote component
// This component is used to display a blockquote
// It is a wrapper around the blockquote element
// It also applies the current theme's accent color to the border left color

interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement>{
    children: React.ReactNode
    className?: string
}

// Blockquote component
const Blockquote = ({children, className, ...props}: BlockquoteProps) => {
    const {currentTheme} = useSlideStore()
  return (
    <div>
        {/* Blockquote HTML tag*/}
      <blockquote
      className={cn('pl-4 border-l-4 italic',
        'my-4 py-2',
        'text-gray-700 dark:text-gray-300',
        className
      )}
      style={{
        borderLeftColor: currentTheme.accentColor
      }}
      // Pass through props
      {...props}
      >
        {/* Children */}
        {children}
        </blockquote>
    </div>
  )
}

export default Blockquote
