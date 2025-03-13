// // TemplatesPage.jsx

// 'use client'
// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import TemplatePreview from './TemplatePreview';
// import TemplateGrid from './TemplateGrid';
// import { templates, categories } from '@/lib/constants';
// import { Template } from '@/lib/types';
// import NavCategoryBar from './NavCategoryBar';

// const TemplatesPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");
//   const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
//     templates.length > 0 ? (templates[0] as unknown as Template) : null
//   );
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
//   // Filter templates based on selected category
//   const getFilteredTemplates = () => {
//     if (selectedCategory === "all") return templates;
//     return templates.filter(template => template.category?.id === selectedCategory);
//   };
  
//   const filteredTemplates = getFilteredTemplates();
  
//   const handleSelectTemplate = (template: Template) => {
//     setSelectedTemplate(template);
//     setCurrentSlideIndex(0);
//   };
  
//   const handleNextSlide = () => {
//     if (selectedTemplate && currentSlideIndex < selectedTemplate.slides.length - 1) {
//       setCurrentSlideIndex(currentSlideIndex + 1);
//     }
//   };
  
//   const handlePrevSlide = () => {
//     if (currentSlideIndex > 0) {
//       setCurrentSlideIndex(currentSlideIndex - 1);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar 
//         categories={categories} 
//         selectedCategory={selectedCategory} 
//         onSelectCategory={setSelectedCategory} 
//       />
      
//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <div className="bg-white border-b border-gray-200 p-4">
//           <h1 className="text-xl font-medium">Choose a Template</h1>
//           <p className="text-sm text-gray-500">Select a template to get started with your presentation</p>
//         </div>
        
//         <div className="flex-1 overflow-y-auto p-6">
//           {/* Template preview */}
//           <TemplatePreview 
//             template={selectedTemplate as Template}
//             currentSlideIndex={currentSlideIndex}
//             onNextSlide={handleNextSlide}
//             onPrevSlide={handlePrevSlide}
//           />
          
//           {/* Templates grid */}
//           <TemplateGrid 
//             templates={filteredTemplates as unknown as Template[]}
//             selectedCategory={selectedCategory}
//             onSelectTemplate={handleSelectTemplate}
//             categories={categories}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplatesPage;


'use client'
import React, { useState } from 'react';
import TemplateGrid from './TemplateGrid';
import TemplatePreviewModal from './TemplatePreviewModal';
import { templates, categories } from '@/lib/constants';
import { Template } from '@/lib/types';
import NavCategoryBar from './NavCategoryBar';

const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFilteredTemplates = () => {
    if (selectedCategory === "all") return templates;
    return templates.filter(template => template.category?.id === selectedCategory);
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentSlideIndex(0);
    setIsModalOpen(true);
  };

  const handleNextSlide = () => {
    if (selectedTemplate && currentSlideIndex < selectedTemplate.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation */}
      <NavCategoryBar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <TemplateGrid 
          templates={getFilteredTemplates() as unknown as Template[]}
          selectedCategory={selectedCategory}
          onSelectTemplate={handleSelectTemplate}
          categories={categories}
        />
      </div>

      {/* Modal for Template Preview */}
      <TemplatePreviewModal
        template={selectedTemplate}
        currentSlideIndex={currentSlideIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNextSlide={handleNextSlide}
        onPrevSlide={handlePrevSlide}
      />
    </div>
  );
};

export default TemplatesPage;
