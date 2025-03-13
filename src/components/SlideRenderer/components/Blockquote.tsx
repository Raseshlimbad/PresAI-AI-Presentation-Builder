import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'

// Blockquote Props
interface BlockquoteProps {
  children: React.ReactNode;
  className?: string;
}

// Readonly Blockquote Component
const Blockquote: React.FC<BlockquoteProps> = ({ children, className }) => {
  const { currentTheme } = useSlideStore();

  return (
    <blockquote
      className={cn(
        'pl-4 border-l-4 italic',
        'my-4 py-2',
        'text-gray-700 dark:text-gray-300',
        className
      )}
      style={{
        borderLeftColor: currentTheme.accentColor, // Uses theme's accent color for styling
      }}
    >
      {children} {/* Displays the text content inside */}
    </blockquote>
  );
};

export default Blockquote;
