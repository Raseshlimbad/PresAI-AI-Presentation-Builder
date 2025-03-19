import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Template } from "@/lib/types";
import SlideRenderer from "@/components/SlideRenderer";
import { createTemplateProject } from "@/actions/project";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  const router = useRouter();
  if (!template) return null;

  // Handle 'Use This Template' button click
  // const handleUseTemplate = async () => {
  //   if (!template) return;

  //   // Call the createTemplateProject function to create the new project
  //   const { status, data, error } = await createTemplateProject(
  //     template.name, // Title
  //     template.slides, // Slides
  //     template.outlines || [], // Outlines
  //     template.thumbnail // Thumbnail (if any)
  //   );

  //   if (status === 200 && data) {
  //     // If project creation is successful, redirect to the new presentation page
  //     const presentationId = data.id; // Get the newly created presentation ID
  //     toast.success("Success", {
  //       description: "Template project created successfully",
  //     });
  //     router.push(`/presentation/${presentationId}`);

  //   } else {
  //     // Handle error (you can show a toast or modal for errors if needed)
  //     console.error("Error creating template project:", error);
  //     toast.error("Error", {
  //       description: "Error creating template project",
  //     });
  //   }
  // };

  // Handle 'Use This Template' button click
  // const handleUseTemplate = async () => {
  //   if (!template) return;

  //   // Clone the slides to prevent shared references
  //   const clonedSlides = JSON.parse(JSON.stringify(template.slides));

  //   // Call the createTemplateProject function to create the new project
  //   const { status, data, error } = await createTemplateProject(
  //     template.name, // Title
  //     clonedSlides, // Cloned slides to avoid modifying original data
  //     template.outlines || [], // Outlines
  //     template.thumbnail // Thumbnail (if any)

  //   );

  //   if (status === 200 && data) {
  //     // If project creation is successful, redirect to the new presentation page
  //     const presentationId = data.id; // Get the newly created presentation ID
  //     toast.success("Success", {
  //       description: "Template project created successfully",
  //     });
  //     router.push(`/presentation/${presentationId}`);
  //   } else {
  //     // Handle error (you can show a toast or modal for errors if needed)
  //     console.error("Error creating template project:", error);
  //     toast.error("Error", {
  //       description: "Error creating template project",
  //     });
  //   }
  // };

  // const handleUseTemplate = async () => {
  //   if (!template) return;
  
  //   // Clone the slides to prevent shared references
  //   const clonedSlides = JSON.parse(JSON.stringify(template.slides));
  
  //   // Prepare the template data
  //   const { name, outlines, thumbnail } = template;
    
  //   // Call the createTemplateProject function to create the new project
  //   const { status, data, error } = await createTemplateProject(
  //     name, // Title
  //     clonedSlides, // Cloned slides to avoid modifying original data
  //     outlines || [], // Outlines (default to empty array if not available)
  //     thumbnail || "" // Thumbnail (optional)
  //   );
  
  //   if (status === 200 && data) {
  //     // If project creation is successful, redirect to the new presentation page
  //     const presentationId = data.id; // Get the newly created presentation ID
  //     toast.success("Success", {
  //       description: "Template project created successfully",
  //     });
  //     router.push(`/presentation/${presentationId}`);
  //   } else {
  //     // Handle error (you can show a toast or modal for errors if needed)
  //     console.error("Error creating template project:", error);
  //     toast.error("Error", {
  //       description: "Error creating template project",
  //     });
  //   }
  // };

  // handleUseTemplate function
  const handleUseTemplate = async () => {
    if (!template) return;
  
    // Clone the template slides to avoid shared references
    const clonedSlides = JSON.parse(JSON.stringify(template.slides));  // Deep copy
  
    // Clone the outlines as well to avoid shared references
    const clonedOutlines = [...(template.outlines || [])];
  
    // Call the createTemplateProject function to create the new project
    const { status, data, error } = await createTemplateProject(
      template.name,  // Title
      clonedSlides,   // Cloned slides to avoid modifying original data
      clonedOutlines, // Cloned outlines
      template.thumbnail // Optional thumbnail
    );
  
    if (status === 200 && data) {
      // If project creation is successful, redirect to the new presentation page
      const presentationId = data.id;  // Get the newly created presentation ID
      toast.success("Success", {
        description: "Template project created successfully",
      });
      router.push(`/presentation/${presentationId}`);
    } else {
      // Handle error (you can show a toast or modal for errors if needed)
      console.error("Error creating template project:", error);
      toast.error("Error", {
        description: "Error creating template project",
      });
    }
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Preview: {template.name}</DialogTitle>
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
          <div className="aspect-[16/9] bg-white dark:bg-[#262626] shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-center p-8">
              {template.slides[currentSlideIndex] && (
                <div
                  className={`w-full h-full text-black dark:text-white ${template.slides[currentSlideIndex].className}`}
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
          <Button
            className="bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-[#262626]"
            //  onClick={handleUseTemplate}
          >
            Use This Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
