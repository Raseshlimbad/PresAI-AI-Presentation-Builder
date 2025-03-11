import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useSlideStore } from '@/store/useSlideStore'
import React, { useEffect, useState } from 'react'
import DragSlidePreviewImage from './DragSlidePreviewImage';

const LayoutPreview = () => {
    const [loading, setLoading] = useState(true);
    const {getOrderedSlides, reorderSlides} = useSlideStore();
    const slides = getOrderedSlides();

    // Move the slide
    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        reorderSlides(dragIndex, hoverIndex);
    }

    // If the window is not undefined, set the loading to false
    useEffect(() => {
        if(typeof window !== 'undefined') {
            setLoading(false);
        }
    }, []);

    // Render the LayoutPreview
  return (
    <div className='w-64 h-full fixed left-0 top-20 border-r overflow-y-auto'>
      <ScrollArea
      className='w-full h-full'
      suppressHydrationWarning
      >
        {/* Loading state */}
        {loading? ( 
            <div className='w-72 px-4 flex flex-col space-y-6'>
                <Skeleton className="h-20 w-full"></Skeleton>
                <Skeleton className="h-20 w-full"></Skeleton>
                <Skeleton className="h-20 w-full"></Skeleton>
            </div>
         ) : ( 

            // Layout preview
            <div className='p-4 pb-32 space-y-6'>
                <div className='flex items-center justify-between mb-6'>
                    {/* Header */}
                    <h2 className='text-sm font-medium dark:text-gray-100 text-gray-500'>
                        SLIDES
                    </h2>

                    {/* Display Number of slides */}
                    <span
                    className='text-xs dark:text-gray-200 text-gray-400'
                    suppressHydrationWarning>
                        {slides.length} slides
                    </span>
                </div>

                {/* Dragable slide preview */}
                 {slides.map((slide, index) => (
                    <DragSlidePreviewImage
                    key={slide.id || index}
                    slide={slide}
                    index={index}
                    moveSlide={moveSlide}
                    />
                  
                 ))}
            </div>
         )}
      </ScrollArea>
    </div>
  )
}

export default LayoutPreview
