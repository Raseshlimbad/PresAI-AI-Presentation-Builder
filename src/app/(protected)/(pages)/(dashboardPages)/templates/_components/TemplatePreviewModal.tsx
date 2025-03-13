import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Template } from "@/lib/types";
import SlideRenderer from "@/components/SlideRenderer";

type TemplatePreviewModalProps = {
  template: Template | null;
  currentSlideIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
};

const TemplatePreviewModal = ({
  template,
  currentSlideIndex,
  isOpen,
  onClose,
  onNextSlide,
  onPrevSlide,
}: TemplatePreviewModalProps) => {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Preview: {template.name}</DialogTitle>
          {/* <DialogClose asChild>
            <Button variant="ghost" className="absolute top-2 right-2">✕</Button>
          </DialogClose> */}
        </DialogHeader>

        {/* Slide Preview */}
        {/* <div className="aspect-[16/9] bg-white shadow-lg rounded-lg overflow-hidden border">
          <div className="w-full h-full flex items-center justify-center p-8">
            {template.slides[currentSlideIndex] && (
              <div className={`w-full ${template.slides[currentSlideIndex].className}`}>
                <SlideRenderer content={template.slides[currentSlideIndex].content} />
              </div>
            )}
          </div>
        </div> */}

        {/* Slide Preview */}
        <div className="w-full overflow-auto">
          <div className="aspect-[16/9] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-center p-8">
              {template.slides[currentSlideIndex] && (
                <div
                  className={`w-full h-full ${template.slides[currentSlideIndex].className}`}
                >
                  <SlideRenderer
                    content={template.slides[currentSlideIndex].content}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            onClick={onPrevSlide}
            disabled={currentSlideIndex === 0}
          >
            Previous
          </Button>
          <span className="text-sm">
            Slide {currentSlideIndex + 1} of {template.slides.length}
          </span>
          <Button
            variant="outline"
            onClick={onNextSlide}
            disabled={currentSlideIndex === template.slides.length - 1}
          >
            Next
          </Button>
        </div>

        {/* Use Template Button */}
        <div className="flex justify-end mt-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Use This Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
