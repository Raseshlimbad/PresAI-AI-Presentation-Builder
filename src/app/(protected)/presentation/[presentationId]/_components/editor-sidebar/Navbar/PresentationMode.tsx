import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useEffect, useState } from "react";
import { MasterRecursiveComponent } from "../../editor/MasterRecursiveComponent";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";


type PresentationModeProps = {
  onClose: () => void;
};

const PresentationMode = ({ onClose }: PresentationModeProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { currentTheme, getOrderedSlides } = useSlideStore();
  const slides = getOrderedSlides();

  //   go to previous slide
  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  //   go to next slide
  const isLastSlide = currentSlideIndex === slides.length - 1;

  const goToNextSlide = () => {
    //   if last slide, close presentation
    if (currentSlideIndex === slides.length - 1) {
      onClose();
      //   if not last slide, go to next slide
    } else {
        
      setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
    }
  };

  //   handle keyboard shortcuts
  useEffect(() => {
    //   handle keyboard shortcuts
    const handleKeyDown = (event: KeyboardEvent) => {
      //   go to previous slide
      if (event.key === "ArrowLeft") {
        goToPreviousSlide();
        //   go to next slide
      } else if (event.key === "ArrowRight" || event.key === "Enter") {
        goToNextSlide();
        //   close presentation
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    //   add event listener
    window.addEventListener("keydown", handleKeyDown);
    //   remove event listener
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length, currentSlideIndex]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {/* Presentation Container */}
      <div
        className="relative w-full h-full flex justify-center items-center"
        style={{
          maxHeight: "100vh",
          maxWidth: "100vw",
          padding: "40px",
        }}
      >
        {/* Presentation Content */}
        <div
          className={cn(
            "pointer-events-none rounded-lg transition-all",
            slides[currentSlideIndex].className
          )}
          style={{
            backgroundColor: currentTheme.slideBackgroundColor,
            backgroundImage: currentTheme.gradientBackground,
            color: currentTheme.accentColor,
            fontFamily: currentTheme.fontFamily,
            transform: "scale(1.2)",
            padding: "60px",
            borderRadius: "12px",
            width: "90%",
            height: "90%",
            maxWidth: "1400px",
            maxHeight: "800px",
          }}
        >
          {/* Master Recursive Component scaled up by parent div*/}
          <MasterRecursiveComponent
            content={slides[currentSlideIndex].content}
            onContentChange={() => {}}
            slideId={slides[currentSlideIndex].id}
            isPreview={false}
            isEditable={false}
          />
        </div>

        {/* Close Button */}
        <Button
          variant={"ghost"}
          className="absolute top-4 right-4 dark:text-white"
          size={"icon"}
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={goToPreviousSlide}
            disabled={currentSlideIndex === 0}
          >
            {/* Previous Slide Button */}
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant={"outline"}
            size={"icon"}
            onClick={goToNextSlide}
            disabled={isLastSlide}
          >
            {/* Next Slide Button */}
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PresentationMode;
