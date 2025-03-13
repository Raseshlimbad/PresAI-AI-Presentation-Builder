// components/TemplateGrid.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Template, Category } from "@/lib/types";
import SlideRenderer from "@/components/SlideRenderer";

type TemplateGridProps = {
  templates: Template[];
  selectedCategory: string;
  onSelectTemplate: (template: Template) => void;
  categories: Category[];
};

const TemplateGrid = ({
  templates,
  selectedCategory,
  onSelectTemplate,
  categories,
}: TemplateGridProps) => {
  const categoryName =
    selectedCategory === "all"
      ? "All Templates"
      : `${categories.find((c) => c.id === selectedCategory)?.name} Templates`;

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">{categoryName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectTemplate(template)}
          >
            {/* <div className="aspect-video bg-gray-50 p-4 flex items-center justify-center">
              {template.slides[0] && (
                <div className={`w-full scale-[0.6] text-black dark:text-white ${template.slides[0].className}`}>
                  <SlideRenderer content={template.slides[0].content} />
                </div>
              )}
            </div> */}

            <div className="h-[200px] bg-gray-50 dark:bg-[#262626] p-4 flex items-center justify-center overflow-hidden">
              {template.slides[0] && (
                <div className="w-full scale-[0.4] text-black dark:text-white">
                  <SlideRenderer content={template.slides[0].content} />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-gray-500">
                {template.slides.length} slides
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
