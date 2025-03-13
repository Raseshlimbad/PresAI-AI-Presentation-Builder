// TemplatesPage.jsx

'use client'
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TemplatePreview from './TemplatePreview';
import TemplateGrid from './TemplateGrid';
import { templates, categories } from '../data/templateData';
import { Template } from '@/lib/types';

const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    templates.length > 0 ? (templates[0] as unknown as Template) : null
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Filter templates based on selected category
  const getFilteredTemplates = () => {
    if (selectedCategory === "all") return templates;
    return templates.filter(template => template.category === selectedCategory);
  };
  
  const filteredTemplates = getFilteredTemplates();
  
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentSlideIndex(0);
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-medium">Choose a Template</h1>
          <p className="text-sm text-gray-500">Select a template to get started with your presentation</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Template preview */}
          <TemplatePreview 
            template={selectedTemplate as Template}
            currentSlideIndex={currentSlideIndex}
            onNextSlide={handleNextSlide}
            onPrevSlide={handlePrevSlide}
          />
          
          {/* Templates grid */}
          <TemplateGrid 
            templates={filteredTemplates as unknown as Template[]}
            selectedCategory={selectedCategory}
            onSelectTemplate={handleSelectTemplate}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;