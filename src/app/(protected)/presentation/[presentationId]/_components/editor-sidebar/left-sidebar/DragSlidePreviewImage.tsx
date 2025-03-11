import { Slide } from '@/lib/types';
import { useSlideStore } from '@/store/useSlideStore';
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';
import ScaledPreview from './ScaledPreview';

// DragSlidePreviewImage Component Props
interface DragSlidePreviewImageProps {
    slide: Slide;
    index: number;
    moveSlide: (dragIndex: number, hoverIndex: number) => void;
}

// DragSlidePreviewImage Component
const DragSlidePreviewImage = ({slide, index, moveSlide}: DragSlidePreviewImageProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { currentSlide, setCurrentSlide} = useSlideStore();

    // Drag and Drop
    const [{isDragging}, drag] = useDrag({
        type: "SLIDE",
        item: {index},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // Drop
    const [, drop] = useDrop({
        accept: 'SLIDE',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        hover(item: { index: number }, monitor) {
          // If the ref is not found, return
          if (!ref.current) {
            return
          }

          // Get the drag index and hover index
          const dragIndex = item.index
          const hoverIndex = index

          // If the drag index is equal to the hover index, return
          if (dragIndex === hoverIndex) {
            return
          }

          // Move the slide
          moveSlide(dragIndex, hoverIndex)
          item.index = hoverIndex
        },
      })

      // Drag and Drop
      drag(drop(ref));

  return (
    // Drag and Drop ref passed to the div
    <div
    ref={ref}
    className={cn(
      'cursor-pointer group',
      'relative',
      index === currentSlide ? 'before:bg-blue-500' : 'before:bg-transparent',
      isDragging ? 'opacity-50' : 'opacity-100'
    )}
    onClick={() => setCurrentSlide(index)}
  >
    {/* Drag and Drop */}
    <div className="pl-2 mb-4 relative">
      {/* Drag and Drop Scaled Preview */}
      <ScaledPreview 
        index={index}
        isActive={index === currentSlide}
        slide={slide}
      />
    </div>
  </div>
  )
}

export default DragSlidePreviewImage
