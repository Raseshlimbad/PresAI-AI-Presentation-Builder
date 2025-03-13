// components/Sidebar.jsx
import React from 'react';
import { Layout, LayoutGrid, Search, PenTool } from 'lucide-react';
import { Category } from '@/lib/types';

type SidebarProps = {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
}

const Sidebar = ({ categories, selectedCategory, onSelectCategory }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Templates</h2>
        <div className="mt-2 relative">
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full p-2 pl-8 text-sm border rounded-md"
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`w-full text-left p-2 rounded-md mb-1 flex items-center ${
                selectedCategory === category.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.id === "all" && <Layout className="mr-2 h-4 w-4" />}
              {category.id === "business" && <LayoutGrid className="mr-2 h-4 w-4" />}
              {category.id === "creative" && <PenTool className="mr-2 h-4 w-4" />}
              {category.id === "data" && <Layout className="mr-2 h-4 w-4" />}
              {category.id === "minimalist" && <Layout className="mr-2 h-4 w-4" />}
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;