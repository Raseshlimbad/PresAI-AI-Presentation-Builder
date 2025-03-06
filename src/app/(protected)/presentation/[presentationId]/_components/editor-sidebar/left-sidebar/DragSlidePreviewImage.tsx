import { Slide } from '@/lib/types';

import { useSlideStore } from '@/store/useSlideStore';
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';

import { cn } from '@/lib/utils';
import ScaledPreview from './ScaledPreview';

interface DragSlidePreviewImageProps {
    slide: Slide;
    index: number;
    moveSlide: (dragIndex: number, hoverIndex: number) => void;
}

const DragSlidePreviewImage = ({slide, index, moveSlide}: DragSlidePreviewImageProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { currentSlide, setCurrentSlide} = useSlideStore();

    const [{isDragging}, drag] = useDrag({
        type: "SLIDE",
        item: {index},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'SLIDE',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        hover(item: { index: number }, monitor) {
          if (!ref.current) {
            return
          }
      
          const dragIndex = item.index
          const hoverIndex = index
          if (dragIndex === hoverIndex) {
            return
          }
      
          moveSlide(dragIndex, hoverIndex)
          item.index = hoverIndex
        },
      })

      drag(drop(ref));

  return (
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
    <div className="pl-2 mb-4 relative">
      <ScaledPreview />
    </div>
  </div>
  )
}

export default DragSlidePreviewImage
