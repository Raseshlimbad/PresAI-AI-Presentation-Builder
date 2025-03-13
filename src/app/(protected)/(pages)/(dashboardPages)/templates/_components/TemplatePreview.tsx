// // components/TemplatePreview.jsx
// import React from "react";
// import { Button } from "@/components/ui/button";

// import { Template } from "@/lib/types";
// import SlideRenderer from "@/components/SlideRenderer";

// type TemplatePreviewProps = {
//   template: Template;
//   currentSlideIndex: number;
//   onNextSlide: () => void;
//   onPrevSlide: () => void;
// };

// const TemplatePreview = ({
//   template,
//   currentSlideIndex,
//   onNextSlide,
//   onPrevSlide,
// }: TemplatePreviewProps) => {
//   if (!template) return null;

//   return (
//     <div className="mb-8">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-medium">Preview: {template.name}</h2>
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="outline"
//             onClick={onPrevSlide}
//             disabled={currentSlideIndex === 0}
//           >
//             Previous
//           </Button>
//           <span className="text-sm">
//             Slide {currentSlideIndex + 1} of {template.slides.length}
//           </span>
//           <Button
//             variant="outline"
//             onClick={onNextSlide}
//             disabled={currentSlideIndex === template.slides.length - 1}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {/* <div className="aspect-[16/9] bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="w-full h-full flex items-center justify-center p-16 border-red-600 border-2">
//           {template.slides[currentSlideIndex] && (
//             <div className={`w-full ${template.slides[currentSlideIndex].className}`}>
//               <SlideRenderer content={template.slides[currentSlideIndex].content} />
//             </div>
//           )}
//         </div>
//       </div> */}

//       {/* Slide Preview with Scrollbar */}
//       <div className="relative bg-white shadow-lg rounded-lg overflow-hidden h-[500px] border">
//         <div className="w-full h-full flex justify-center p-4 overflow-y-auto">
//           {template.slides[currentSlideIndex] && (
//             <div className="w-full">
//               <SlideRenderer content={template.slides[currentSlideIndex].content} />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-end mt-4">
//         <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//           Use This Template
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default TemplatePreview;
import React from "react";
import { Button } from "@/components/ui/button";
import { Template } from "@/lib/types";
import SlideRenderer from "@/components/SlideRenderer";

type TemplatePreviewProps = {
  template: Template;
  currentSlideIndex: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
};

const TemplatePreview = ({
  template,
  currentSlideIndex,
  onNextSlide,
  onPrevSlide,
}: TemplatePreviewProps) => {
  if (!template) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Preview: {template.name}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onPrevSlide} disabled={currentSlideIndex === 0}>
            Previous
          </Button>
          <span className="text-sm">
            Slide {currentSlideIndex + 1} of {template.slides.length}
          </span>
          <Button variant="outline" onClick={onNextSlide} disabled={currentSlideIndex === template.slides.length - 1}>
            Next
          </Button>
        </div>
      </div>

      {/* Scrollable Slide Preview */}
      <div className="relative bg-white dark:bg-[] shadow-lg rounded-lg w-full max-w-4xl h-[80vh] border">
        <div className="w-full h-full flex justify-center overflow-y-auto p-4">
          {template.slides[currentSlideIndex] && (
            <div className="w-full h-auto ">
              <SlideRenderer content={template.slides[currentSlideIndex].content} />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Use This Template
        </Button>
      </div>
    </div>
  );
};

export default TemplatePreview;
