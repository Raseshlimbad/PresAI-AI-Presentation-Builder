import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutSlides, Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { MasterRecursiveComponent } from "./MasterRecursiveComponent";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash } from "lucide-react";
import { updateSlides } from "@/actions/project";

// Props for the DropZone component
interface DropZoneProps {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void;
  isEditable: boolean;
}

// DropZone component
export const DropZone: React.FC<DropZoneProps> = ({
  index,
  onDrop,
  isEditable,
}) => {
  // UseDrop hook to handle the drop zone
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ["SLIDE", "LAYOUT"],
    drop: (item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    }) => {
      onDrop(item, index);
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // If the drop zone is not editable, return null => do not render anything
  if (!isEditable) return null;

  // Render the drop zone
  return (
    <div
    ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "h-4 my-2 rounded-md transition-all duration-200",
        // If the drop zone is over and can drop, render a green border
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        // If the drop zone can drop, render a blue border
        canDrop ? "border-blue-300" : ""
      )}
    >
      {/*  If drop zone and canDrop is true, render a green text */}
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center text-green-600">
          Drop here
        </div>
      )}
    </div>
  );
};

// Props for the DraggableSlide component
interface DraggableSlideProps {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string) => void;
  isEditable: boolean;
}

// DraggableSlide component
const DraggableSlide: React.FC<DraggableSlideProps> = ({
  slide,
  index,
  moveSlide,
  handleDelete,
  isEditable,
}) => {
  const ref = useRef(null);
  const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } =
    useSlideStore();

  // UseDrag hook to handle the draggable slide
  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: {
      index,
      type: "SLIDE",
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: () => isEditable,
  });


  // UseDrop hook to handle the drop zone
  const [,drop] = useDrop({
    accept: ["SLIDE", "LAYOUT"],
    hover(item: {index: number, type: string}) {
      if(!ref.current || !isEditable) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if(item.type === 'SLIDE'){
        if(dragIndex === hoverIndex) return;

        moveSlide(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    }
  })

  // Use the drop hook to handle the drop zone
  drag(drop(ref))

  // Handle the content change
  const handleContentChange = (contentId: string, newContent: string | string[] | string[][]) => {
    console.log("Content changed:", slide, contentId, newContent);
    // If the editor is editable, update the content item
    if (isEditable) {
      updateContentItem(slide.id, contentId, newContent);
    }
  }


  return (
    <div
      // Ref for the draggable slide
      ref={ref}
      className={cn(
        "w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px]",
        "shadow-xl transition-shadow duration-300",
        "flex flex-col",
        index === currentSlide ? "ring-2 ring-blue-500 ring-offset-2" : "",
        slide.className,
        isDragging ? "opacity-50" : "opacity-100"
      )}
      style={{
        backgroundImage: currentTheme.gradientBackground,
      }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="h-full w-full flex-grow overflow-hidden">

        {/* MasterRecursiveComponent */}
        <MasterRecursiveComponent
          content={slide.content}
          onContentChange={handleContentChange}
          slideId={slide.id}
          isEditable={isEditable}
          isPreview={false}
          index={index}
        />
      </div>

      {/* If the editor is editable, render the popover */}
      {isEditable && (
        <Popover>
          <PopoverTrigger 
            asChild
            className="absolute top-2 left-2"
          >
            {/* Button - Slide options */}
            <Button
            size={"sm"}
            variant={"outline"}>
              {/* EllipsisVertical icon */}
              <EllipsisVertical className="w-5 h-5" />
              {/* Screen reader only */}
              <span className="sr-only">Slide options</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <div className="flex space-x-2">
              {/* Button - Delete slide */}
              <Button 
              variant={"ghost"}
              onClick={() => handleDelete(slide.id)}
              >
                {/* Trash icon */}
                <Trash className="w-5 h-5 text-red-500"/>
                {/* Screen reader only */}
                <span className="sr-only">Delete slide</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

// Props for the Editor component
type Props = {
  isEditable: boolean;
};

// Editor component------------------------------------------------------------------------------------------------
const Editor = ({ isEditable }: Props) => {
  // UseSlideStore hook to get the slides and project
  const {
    getOrderedSlides,
    currentSlide,
    removeSlide,
    addSlideAtIndex,
    reorderSlides,
    slides,
    project,
  } = useSlideStore();

  const [loading, setLoading] = useState(true);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const orderedSlides = getOrderedSlides();

  // Move the slide
  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    // If the editor is editable, move the slide
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex);
    }
  };

  // Handle the drop event
  const handleDrop = (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => {
    if (!isEditable) return;

    // If the item is a layout, add the layout to the project
    if (item.type === "LAYOUT") {
      console.log("Dropping layout:", item);
      addSlideAtIndex(
        {
          ...item.component,
          id: uuidv4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    }
    // If the item is a slide, move the slide
    else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };

  // Handle the delete event
  const handleDelete = (id: string) => {
    // If the editor is editable, delete the slide
    if (isEditable) {
      console.log('Deleting', id);
      removeSlide(id);
    }
  };

  // Scroll to the current slide
  useEffect(() => {
    // If the current slide is in the slideRefs, scroll to it
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  // Set the loading state
  useEffect(() => {
    // If the window is defined, set the loading state to false
    if(typeof window !== 'undefined') {
      setLoading(false);
    }
  }, []);

  // Save the slides
  const saveSlides = useCallback(() => {
    // If the editor is editable and the project is defined, save the slides
    if(isEditable && project){
      // Save the slides
      (async () => {
        await updateSlides(project.id, JSON.parse(JSON.stringify(slides)));
      })()
    }
  },[isEditable, slides, project])

  // Autosave the presentation
  useEffect(() => {
    // TODO: (Optional) auto-save resizeHandle state 

    // if() already ahve a time? cancel the timer and then create a new one
    if(autosaveTimerRef.current){
      clearTimeout(autosaveTimerRef.current);
    }

    // inside the timer make the save request
    if(isEditable){
      autosaveTimerRef.current = setTimeout(() => {
        saveSlides();
      }, 2000);
    }

    return () => {
      // If the timer is defined, clear the timer
      if(autosaveTimerRef.current){
        clearTimeout(autosaveTimerRef.current)
      }
    }
  },[slides, isEditable, project, saveSlides])

  return (
    <div className="flex flex-1 flex-col h-full max-w-3xl mx-auto px-4 mb-20">
      {loading ? (
        // Loading state
        <div className="w-full px-4 flex flex-col space-y-6">
          <Skeleton className="h-52 w-full"></Skeleton>
          <Skeleton className="h-52 w-full"></Skeleton>
          <Skeleton className="h-52 w-full"></Skeleton>
        </div>
      ) : (
        // Editor
        <ScrollArea className="flex-1 mt-8" suppressHydrationWarning>
          <div className="p-4 pb-32 space-y-6">
            {isEditable && (
              <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />
            )}
          {/* </div> */}

          {/* Draggable Slides */}
          {/* <div className="space-y-6"> */}
          {orderedSlides.map((slide, index) => (
            <React.Fragment key={slide.id || index}>
              <DraggableSlide 
                slide={slide}
                index={index}
                moveSlide={moveSlide}
                handleDelete={handleDelete}
                isEditable={isEditable}
              />
               {isEditable && (
              <DropZone index={index + 1} onDrop={handleDrop} isEditable={isEditable} />
            )}
            </React.Fragment>
          ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
