'use client';
import React, { useState } from 'react';
import TemplateGrid from './TemplateGrid';
import TemplatePreviewModal from './TemplatePreviewModal';
import { templates, categories } from '@/lib/constants';
import { Template } from '@/lib/types';
import NavCategoryBar from './NavCategoryBar';

const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to filter templates based on category & search query
  const getFilteredTemplates = () => {
    let filteredTemplates = templates;

    // Filter by category
    if (selectedCategory !== "all") {
      filteredTemplates = filteredTemplates.filter(template => template.category?.id === selectedCategory);
    }

    // Filter by search query (case insensitive)
    if (searchQuery.trim() !== "") {
      filteredTemplates = filteredTemplates.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (template.category?.name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      );
    }

    return filteredTemplates;
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
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Top Navigation with Search */}
      <NavCategoryBar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
        onSearch={setSearchQuery} // Pass search function
      />

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-black">
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
