import React from "react";
import { Layout, LayoutGrid, Search, PenTool, BookOpen, Frame } from "lucide-react";
import { Category } from "@/lib/types";

type NavCategoryBarProps = {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
};

const NavCategoryBar = ({ categories, selectedCategory, onSelectCategory }: NavCategoryBarProps) => {
  return (
    <div className="bg-white border-b border-gray-200 flex flex-col">
      {/* Search Bar */}
      <div className="p-4 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full p-2 pl-10 text-sm border rounded-md"
          />
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="flex space-x-4 px-6 py-2 overflow-x-auto text-sm text-gray-600">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              selectedCategory === category.id
                ? "bg-black text-white font-medium"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.id === "all" && <Layout className="h-4 w-4" />}
            {category.id === "business" && <LayoutGrid className="h-4 w-4" />}
            {category.id === "creative" && <PenTool className="h-4 w-4" />}
            {category.id === "data" && <Layout className="h-4 w-4" />}
            {category.id === "minimalist" && <Frame className="h-4 w-4" />}
            {category.id === "study" && <BookOpen className="h-4 w-4" />}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavCategoryBar;
